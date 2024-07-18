import { Controller, Query, Body, HttpException, HttpStatus, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { MenusService } from './menus.service';
import { mapMenusToRoutes } from '../../utils/map-menus';
import {
  ISelectMenuParams,
  ISelectMenuResponseData,
  ICreateMenuBody,
  IUpdateMenuBody,
  IUserMenuResponseData,
} from './menus.interface';
import {
  ApiMenuListOperation,
  ApiCreateMenuOperation,
  ApiUpdateMenuOperation,
  ApiUserMenuListOperation,
} from './menus.decorators';
import { getTimestamp, timestampToDate } from '../../utils/datetime';
import { RolesService } from '../roles/roles.service';
import { PermissionsService } from '../permissions/permissions.service';

@ApiTags('菜单模块')
@Controller('menus')
export class MenusController {
  constructor(
    private readonly menusService: MenusService,
    private readonly rolesService: RolesService,
    private readonly permissionsService: PermissionsService,
  ) {}

  @ApiMenuListOperation()
  async getMenuList(
    @Query('page') page: number,
    @Query('size') size: number,
    @Query('menuName') menuName?: string,
    @Query('status') status?: number,
  ): Promise<ISelectMenuResponseData> {
    if (!page || !size) {
      throw new HttpException('参数错误', HttpStatus.BAD_REQUEST);
    }

    const selectInfo: ISelectMenuParams = {
      page,
      size,
    };

    if (menuName) selectInfo.menuName = menuName;

    if (status) selectInfo.status = status;

    const { data, total } = await this.menusService.getMenuListService(selectInfo);

    return {
      total,
      data: mapMenusToRoutes(data),
    };
  }

  @ApiCreateMenuOperation()
  async createMenu(@Body() createMenuInfo: ICreateMenuBody): Promise<string> {
    const { menuName, menuIcon, menuUrl, menuPid, status } = createMenuInfo;

    if (!menuName || !menuIcon || !menuUrl || menuPid === undefined || status === undefined) {
      throw new HttpException('参数错误', HttpStatus.BAD_REQUEST);
    }

    // 校验菜单名称是否重复
    const menuInfo = await this.menusService.getMenuByNameService(menuName);

    if (menuInfo) {
      throw new HttpException('菜单名称重复', HttpStatus.BAD_REQUEST);
    }

    // 校验父级菜单是否存在
    if (menuPid !== 0) {
      const parentMenu = await this.menusService.getMenuByPidService(menuPid);

      if (!parentMenu) {
        throw new HttpException('父级菜单不存在', HttpStatus.BAD_REQUEST);
      }
    }

    createMenuInfo.createTime = getTimestamp();
    createMenuInfo.updateTime = getTimestamp();

    // 创建菜单
    try {
      await this.menusService.createMenuService(createMenuInfo);
      return '创建菜单成功';
    } catch (error) {
      throw new HttpException('创建菜单失败', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @ApiUpdateMenuOperation()
  async updateMenu(@Body() updateMenuInfo: IUpdateMenuBody): Promise<string> {
    const { id, menuName, menuIcon, menuUrl, menuPid, status } = updateMenuInfo;

    if (!id) throw new HttpException('参数错误', HttpStatus.BAD_REQUEST);

    // 校验菜单是否存在
    const menuInfo = await this.menusService.getMenuByIdService(id);

    if (!menuInfo) {
      throw new HttpException('菜单不存在', HttpStatus.BAD_REQUEST);
    }

    const updateInfo: IUpdateMenuBody = {
      id,
    };

    if (menuName) {
      const menuInfo = await this.menusService.getMenuByNameService(menuName);

      if (menuInfo && menuInfo.id !== id) throw new HttpException('菜单名称重复', HttpStatus.BAD_REQUEST);

      updateInfo.menuName = menuName;
    }

    if (menuIcon) updateInfo.menuIcon = menuIcon;

    if (menuUrl) updateInfo.menuUrl = menuUrl;

    if (menuPid && menuPid !== 0) {
      const parentMenu = await this.menusService.getMenuByPidService(menuPid);

      if (!parentMenu) {
        throw new HttpException('父级菜单不存在', HttpStatus.BAD_REQUEST);
      }

      updateInfo.menuPid = menuPid;
    }

    if (status !== undefined) updateInfo.status = status;

    // 校验除ID外的其他字段是否有更新
    const updateKeys = Object.keys(updateInfo);

    if (updateKeys.length === 1) {
      throw new HttpException('没有需要更新的字段', HttpStatus.BAD_REQUEST);
    }

    updateInfo.updateTime = getTimestamp();

    // 更新菜单
    try {
      await this.menusService.updateMenuService(updateInfo);
      return '更新菜单成功';
    } catch (error) {
      throw new HttpException('更新菜单失败', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @ApiUserMenuListOperation()
  async getUserMenuList(@Param('roleId') role_id: number): Promise<IUserMenuResponseData> {
    if (!role_id) throw new HttpException('参数错误', HttpStatus.BAD_REQUEST);

    // 校验角色是否存在
    const roleInfo = await this.rolesService.getRoleByIdService(role_id);

    if (!roleInfo) throw new HttpException('角色不存在', HttpStatus.BAD_REQUEST);

    const { roleMenus, rolePermissions } = roleInfo;

    const roleArray = roleMenus.split(',').map(Number);
    const rolePermissionsArray = rolePermissions.split(',').map(Number);

    const menuList = await this.menusService.getMenuListByIdsService(roleArray);
    const permissionList = await this.permissionsService.getPermissionListByIdsService(rolePermissionsArray);

    const data: IUserMenuResponseData = {
      menus: [],
      permissions: [],
    };

    data.menus = mapMenusToRoutes(menuList);
    const newPermissionList = permissionList.map((item) => {
      return {
        id: item.id,
        permissionName: item.permissionName,
        permissionValue: item.permissionValue,
        status: item.status,
        createTime: timestampToDate(item.createTime),
        updateTime: timestampToDate(item.updateTime),
        menuId: item.menuId,
      };
    });
    data.permissions = newPermissionList;

    return data;
  }
}
