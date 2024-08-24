import {
  Controller,
  Query,
  Body,
  HttpException,
  HttpStatus,
  Param,
  UseGuards,
  Get,
  HttpCode,
  Post,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PermissionsService } from './permissions.service';
import { mapPermissionToRoutes } from '../../utils/map-permissions';
import { AuthGuard } from '../auths/auth.guard';
import {
  ISelectPermissionParams,
  ISelectPermissionResponseData,
  ICreatePermissionBody,
  IUpdatePermissionBody,
  IPermissionInfo,
} from './permissions.interface';
import { getTimestamp } from '../../utils/datetime';
import { RolesService } from '../roles/roles.service';
import { decryptData } from '../../utils/data-encryption';

@Controller('permissions')
export class PermissionController {
  constructor(
    private readonly permissionService: PermissionsService,
    private readonly rolesService: RolesService,
    private readonly configService: ConfigService,
  ) {}

  @UseGuards(AuthGuard)
  @Get('permission-list')
  async getPermissionList(
    @Query('page') page: number,
    @Query('size') size: number,
    @Query('permissionName') permissionName?: string,
    @Query('status') status?: number,
  ): Promise<ISelectPermissionResponseData> {
    if (!page || !size) {
      throw new HttpException('参数错误', HttpStatus.BAD_REQUEST);
    }

    const selectInfo: ISelectPermissionParams = {
      page,
      size,
    };

    if (permissionName) selectInfo.permissionName = permissionName;

    if (status) selectInfo.status = status;

    const { data: initialData, total } = await this.permissionService.getPermissionListService(selectInfo);

    const fetchAllPermissions = async (ids: number[]): Promise<any[]> => {
      if (ids.length === 0) return [];

      const permissions = await this.permissionService.getPermissionListByPidsService(ids);

      const childPermissionIds = permissions.map((item) => item.id);

      const childPermissions = await fetchAllPermissions(childPermissionIds);

      return [...permissions, ...childPermissions];
    };

    const allPermissions = await fetchAllPermissions(initialData.map((item) => item.id));

    const combinedPermissions = [...initialData, ...allPermissions];

    return {
      total,
      data: mapPermissionToRoutes(combinedPermissions),
    };
  }

  @UseGuards(AuthGuard)
  @HttpCode(200)
  @Post('create-permission')
  async createPermission(@Body() createPermissionInfo: ICreatePermissionBody): Promise<string> {
    const { permissionName, permissionUrl, permissionPid, permissionType, status } = createPermissionInfo;

    if (
      !permissionName ||
      !permissionUrl ||
      permissionPid === undefined ||
      status === undefined ||
      permissionType === undefined
    ) {
      throw new HttpException('参数错误', HttpStatus.BAD_REQUEST);
    }

    // 校验权限名称是否重复
    const permissionInfo = await this.permissionService.getPermissionByNameService(permissionName);

    if (permissionInfo) {
      throw new HttpException('权限名称重复', HttpStatus.BAD_REQUEST);
    }

    // 校验父级权限是否存在
    if (permissionPid !== 0) {
      const parentMenu = await this.permissionService.getPermissionByIdService(permissionPid);

      if (!parentMenu) {
        throw new HttpException('父级权限不存在', HttpStatus.BAD_REQUEST);
      }
    }

    createPermissionInfo.createTime = getTimestamp();
    createPermissionInfo.updateTime = getTimestamp();

    // 创建权限
    try {
      await this.permissionService.createPermissionService(createPermissionInfo);
      return '创建成功';
    } catch (error) {
      throw new HttpException('创建权限失败', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @UseGuards(AuthGuard)
  @HttpCode(200)
  @Post('update-permission')
  async updateMenu(@Body() updatePermissionInfo: IUpdatePermissionBody): Promise<string> {
    const { id, permissionName, permissionUrl, permissionIcon, permissionPid, status } = updatePermissionInfo;

    if (!id) throw new HttpException('参数错误', HttpStatus.BAD_REQUEST);

    // 校验权限是否存在
    const permissionInfo = await this.permissionService.getPermissionByIdService(id);

    if (!permissionInfo) {
      throw new HttpException('权限不存在', HttpStatus.BAD_REQUEST);
    }

    const updateInfo: IUpdatePermissionBody = {
      id,
    };

    if (permissionName) {
      const permissionInfo = await this.permissionService.getPermissionByNameService(permissionName);

      if (permissionInfo && permissionInfo.id !== id) throw new HttpException('权限名称重复', HttpStatus.BAD_REQUEST);

      updateInfo.permissionName = permissionName;
    }

    if (permissionIcon) updateInfo.permissionIcon = permissionIcon;

    if (permissionUrl) updateInfo.permissionUrl = permissionUrl;

    if (permissionPid && permissionPid !== 0) {
      const parentMenu = await this.permissionService.getPermissionByPidService(permissionPid);

      if (!parentMenu) {
        throw new HttpException('父级权限不存在', HttpStatus.BAD_REQUEST);
      }

      updateInfo.permissionPid = permissionPid;
    }

    if (status !== undefined) updateInfo.status = status;

    // 校验除ID外的其他字段是否有更新
    const updateKeys = Object.keys(updateInfo);

    if (updateKeys.length === 1) {
      throw new HttpException('没有需要更新的字段', HttpStatus.BAD_REQUEST);
    }

    updateInfo.updateTime = getTimestamp();

    // 更新权限
    try {
      await this.permissionService.updatePermissionService(updateInfo);
      return '更新成功';
    } catch (error) {
      throw new HttpException('更新失败', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @UseGuards(AuthGuard)
  @Get('user-permissions/:roleId')
  async getUserPermissionList(@Param('roleId') role_id: string): Promise<IPermissionInfo[]> {
    if (!role_id) throw new HttpException('参数错误', HttpStatus.BAD_REQUEST);

    const key = this.configService.get('NEST_ENCRYPTION_KEY');
    const iv = this.configService.get('NEST_ENCRYPTION_IV');
    // 校验角色是否存在
    const roleInfo = await this.rolesService.getRoleByIdService(Number(decryptData(role_id, key, iv)));

    if (!roleInfo) throw new HttpException('角色不存在', HttpStatus.BAD_REQUEST);

    const { rolePermissions } = roleInfo;

    const roleArray = rolePermissions.split(',').map(Number);

    const permissionList = await this.permissionService.getPermissionListByIdsService(roleArray, 1);

    return mapPermissionToRoutes(permissionList);
  }

  @UseGuards(AuthGuard)
  @Get('all-permission-list/:type')
  async getAllPermissionList(@Param('type') type: number): Promise<IPermissionInfo[]> {
    const permissionList = await this.permissionService.getAllPermissionListService(type);
    return mapPermissionToRoutes(permissionList);
  }
}
