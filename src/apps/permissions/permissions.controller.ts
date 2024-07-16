import { Controller, Query, HttpException, HttpStatus, Body } from '@nestjs/common';
import { PermissionsService } from './permissions.service';
import { ApiTags } from '@nestjs/swagger';
import {
  ApiPermissionListOperation,
  ApiCreatePermissionOperation,
  ApiUpdatePermissionOperation,
} from './permissions.decorators';
import {
  ISelectPermissionInfo,
  ISelectPermissionData,
  ICreatePermissionInfo,
  IUpdatePermissionInfo,
} from './permissions.interface';
import { MenusService } from '../menus/menus.service';
import { timestampToDate, getTimestamp } from '../../utils/datetime';

@ApiTags('权限模块')
@Controller('permissions')
export class PermissionsController {
  constructor(
    private readonly permissionsService: PermissionsService,
    private readonly menusService: MenusService,
  ) {}

  @ApiPermissionListOperation()
  async getPermissionList(
    @Query('page') page: number,
    @Query('size') size: number,
    @Query('permissionName') permissionName?: string,
    @Query('menuId') menuId?: number,
    @Query('status') status?: number,
  ): Promise<{ total: number; data: ISelectPermissionData[] }> {
    if (!page || !size) {
      throw new HttpException('参数错误', HttpStatus.BAD_REQUEST);
    }

    const selectInfo: ISelectPermissionInfo = {
      page,
      size,
    };

    if (permissionName) selectInfo.permissionName = permissionName;

    if (menuId) selectInfo.menuId = menuId;

    if (status !== undefined) selectInfo.status = status;

    const { data, total } = await this.permissionsService.getPermissionListService(selectInfo);

    // 获取菜单id,去重
    const menuIds = Array.from(new Set(data.map((item) => item.menuId)));

    // 获取菜单信息
    const menuInfo = await this.menusService.getMenuListByIdsService(menuIds);

    // 组合数据
    const newData = data.map((item) => {
      const menu = menuInfo.find((menu) => menu.id === item.menuId);
      const result = {
        ...item,
        createTime: timestampToDate(item.createTime),
        updateTime: timestampToDate(item.updateTime),
      };
      return menu && menu.menuPid !== 0
        ? { ...result, menuArr: [menu.menuPid, result.menuId] }
        : { ...result, menuArr: [result.menuId] };
    });

    return { total, data: newData };
  }

  @ApiCreatePermissionOperation()
  async createPermission(@Body() createPermissionInfo: ICreatePermissionInfo): Promise<string> {
    const { permissionName, permissionValue, menuId, status } = createPermissionInfo;
    if (!permissionName || !permissionValue || !menuId || status === undefined) {
      throw new HttpException('参数错误', HttpStatus.BAD_REQUEST);
    }

    // 校验菜单是否存在
    const menuInfo = await this.menusService.getMenuByIdService(menuId);

    if (!menuInfo) {
      throw new HttpException('菜单不存在', HttpStatus.BAD_REQUEST);
    }

    // 校验权限名称是否重复
    const permissionInfo = await this.permissionsService.getPermissionByNameAndMenuIdService(permissionName, menuId);

    if (permissionInfo) {
      throw new HttpException('权限名称重复', HttpStatus.BAD_REQUEST);
    }

    createPermissionInfo.permissionValue = menuInfo.menuUrl.split('/')[1] + ':' + permissionValue;
    createPermissionInfo.createTime = getTimestamp();
    createPermissionInfo.updateTime = getTimestamp();

    // 创建权限
    try {
      await this.permissionsService.createPermissionService(createPermissionInfo);
      return '创建权限成功';
    } catch (e) {
      throw new HttpException('创建权限失败', HttpStatus.BAD_REQUEST);
    }
  }

  @ApiUpdatePermissionOperation()
  async updatePermission(@Body() updatePermissionInfo: IUpdatePermissionInfo) {
    const { id, permissionName, permissionValue, menuId, status } = updatePermissionInfo;

    if (!id) throw new HttpException('参数错误', HttpStatus.BAD_REQUEST);

    // 校验权限是否存在
    const permissionInfo = await this.permissionsService.getPermissionByIdService(id);

    if (!permissionInfo) {
      throw new HttpException('权限不存在', HttpStatus.BAD_REQUEST);
    }

    const updateInfo: IUpdatePermissionInfo = {
      id,
    };

    if (permissionName) updateInfo.permissionName = permissionName;

    if (menuId) {
      const menuInfo = await this.menusService.getMenuByIdService(menuId);

      if (!menuInfo) {
        throw new HttpException('菜单不存在', HttpStatus.BAD_REQUEST);
      }

      updateInfo.menuId = menuId;
    }

    if (permissionValue) {
      let menuInfo;
      if (updateInfo.menuId) {
        menuInfo = await this.menusService.getMenuByIdService(updateInfo.menuId);
      } else {
        menuInfo = await this.menusService.getMenuByIdService(permissionInfo.menuId);
      }
      updateInfo.permissionValue = menuInfo?.menuUrl.split('/')[1] + ':' + permissionValue;
    }
    if (status !== undefined) updateInfo.status = status;

    const updateKeys = Object.keys(updateInfo);

    if (updateKeys.length === 1) {
      throw new HttpException('没有需要更新的字段', HttpStatus.BAD_REQUEST);
    }

    updateInfo.updateTime = getTimestamp();

    try {
      await this.permissionsService.updatePermissionService(updateInfo);
      return '更新权限成功';
    } catch (e) {
      throw new HttpException('更新权限失败', HttpStatus.BAD_REQUEST);
    }
  }
}
