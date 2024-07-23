import { Controller, Query, HttpException, HttpStatus, Body, UseGuards, Get, HttpCode, Post } from '@nestjs/common';
import { AuthGuard } from '../auths/auth.guard';
import { RolesService } from './roles.service';
import {
  ISelectRoleBody,
  ISelectRoleData,
  ICreateRoleBody,
  ICreateRoleService,
  IUpdateRoleBody,
  IUpdateRoleService,
  RoleInfo,
} from './roles.interface';
import { timestampToDate, getTimestamp } from '../../utils/datetime';
import { PermissionsService } from '../permissions/permissions.service';

@Controller('roles')
export class RolesController {
  constructor(
    private readonly rolesService: RolesService,
    private readonly permissionService: PermissionsService,
  ) {}

  @UseGuards(AuthGuard)
  @Get('role-list')
  async getRoleList(
    @Query('page') page: number,
    @Query('size') size: number,
    @Query('roleName') roleName?: string,
    @Query('status') status?: number,
  ): Promise<ISelectRoleData> {
    if (!page || !size) {
      throw new HttpException('参数错误', HttpStatus.BAD_REQUEST);
    }

    const selectInfo: ISelectRoleBody = {
      page,
      size,
    };

    if (roleName) selectInfo.roleName = roleName;

    if (status) selectInfo.status = status;

    const { data, total } = await this.rolesService.getRoleListService(selectInfo);

    const newData = data.map((item) => {
      return {
        id: item.id,
        roleName: item.roleName,
        rolePermissions: item.rolePermissions.split(',').map(Number),
        status: item.status,
        createTime: timestampToDate(item.createTime),
        updateTime: timestampToDate(item.updateTime),
      };
    });

    return {
      total,
      data: newData,
    };
  }

  @UseGuards(AuthGuard)
  @HttpCode(200)
  @Post('create-role')
  async createRole(@Body() createRoleBody: ICreateRoleBody): Promise<string> {
    const { roleName, rolePermissions, status } = createRoleBody;

    if (!roleName || !rolePermissions || status === undefined) {
      throw new HttpException('参数错误', HttpStatus.BAD_REQUEST);
    }

    // 校验角色名称是否已存在
    const roleInfo = await this.rolesService.getRoleByNameService(roleName);

    if (roleInfo) {
      throw new HttpException('角色名称已存在', HttpStatus.BAD_REQUEST);
    }

    const newRoleInfo: ICreateRoleService = {
      roleName,
      rolePermissions: rolePermissions.join(','),
      status,
      createTime: getTimestamp(),
      updateTime: getTimestamp(),
    };

    // 创建角色
    try {
      await this.rolesService.createRoleService(newRoleInfo);
      return '创建成功';
    } catch (error) {
      throw new HttpException('创建失败', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @UseGuards(AuthGuard)
  @HttpCode(200)
  @Post('update-role')
  async updateRole(@Body() updateRoleBody: IUpdateRoleBody) {
    const { id, roleName, rolePermissions, status } = updateRoleBody;

    if (!id) {
      throw new HttpException('参数错误', HttpStatus.BAD_REQUEST);
    }

    const updateInfo: IUpdateRoleService = {
      id,
    };

    // 校验菜单是否存在
    if (rolePermissions && rolePermissions.length) {
      const menuInfos = await this.permissionService.getPermissionListByIdsService(rolePermissions);

      if (menuInfos.length !== rolePermissions.length) {
        throw new HttpException('菜单不存在', HttpStatus.BAD_REQUEST);
      }

      updateInfo.rolePermissions = rolePermissions.join(',');
    }

    if (roleName) {
      const roleInfo = await this.rolesService.getRoleByNameService(roleName);

      if (roleInfo && roleInfo.id !== id) {
        throw new HttpException('角色名称已存在', HttpStatus.BAD_REQUEST);
      }

      updateInfo.roleName = roleName;
    }

    if (status !== undefined) updateInfo.status = status;

    updateInfo.updateTime = getTimestamp();

    try {
      await this.rolesService.updateRoleService(updateInfo);
      return '更新成功';
    } catch (error) {
      throw new HttpException('更新失败', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @UseGuards(AuthGuard)
  @Get('all-role-list')
  async getAllRoleList(): Promise<RoleInfo[]> {
    const roleList = await this.rolesService.getAllRoleListService();
    const newData = roleList.map((item) => {
      return {
        id: item.id,
        roleName: item.roleName,
        rolePermissions: item.rolePermissions.split(',').map(Number),
        status: item.status,
        createTime: timestampToDate(item.createTime),
        updateTime: timestampToDate(item.updateTime),
      };
    });

    return newData;
  }
}
