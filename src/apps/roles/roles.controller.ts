import { Controller, Query, HttpException, HttpStatus, Param, Body } from '@nestjs/common';
import { RolesService } from './roles.service';
import { ApiTags } from '@nestjs/swagger';
import { ApiRoleListOperation, ApiCreateRoleOperation, ApiUpdateRoleOperation } from './roles.decorators';
import {
  ISelectRoleBody,
  ISelectRoleData,
  ICreateRoleBody,
  ICreateRoleService,
  IUpdateRoleBody,
  IUpdateRoleService,
} from './roles.interface';
import { timestampToDate, getTimestamp } from '../../utils/datetime';
import { MenusService } from '../menus/menus.service';

@ApiTags('角色模块')
@Controller('roles')
export class RolesController {
  constructor(
    private readonly rolesService: RolesService,
    private readonly menusService: MenusService,
  ) {}

  @ApiRoleListOperation()
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
        roleMenus: item.roleMenus.split(',').map(Number),
        rolePermissions: item.rolePermissions,
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

  @ApiCreateRoleOperation()
  async createRole(@Body() createRoleBody: ICreateRoleBody): Promise<string> {
    const { roleName, roleMenus, status } = createRoleBody;

    if (!roleName || !roleMenus || status === undefined) {
      throw new HttpException('参数错误', HttpStatus.BAD_REQUEST);
    }

    // 校验角色名称是否已存在
    const roleInfo = await this.rolesService.getRoleByNameService(roleName);

    if (roleInfo) {
      throw new HttpException('角色名称已存在', HttpStatus.BAD_REQUEST);
    }

    const newRoleInfo: ICreateRoleService = {
      roleName,
      roleMenus: roleMenus.join(','),
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

  @ApiUpdateRoleOperation()
  async updateRole(@Body() updateRoleBody: IUpdateRoleBody) {
    const { id, roleName, roleMenus, status } = updateRoleBody;

    if (!id) {
      throw new HttpException('参数错误', HttpStatus.BAD_REQUEST);
    }

    const updateInfo: IUpdateRoleService = {
      id,
    };

    // 校验菜单是否存在
    if (roleMenus && roleMenus.length) {
      const menuInfos = await this.menusService.getMenuListByIdsService(roleMenus);

      if (menuInfos.length !== roleMenus.length) {
        throw new HttpException('菜单不存在', HttpStatus.BAD_REQUEST);
      }

      updateInfo.roleMenus = roleMenus.join(',');
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
}
