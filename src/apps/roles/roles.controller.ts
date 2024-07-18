import { Controller, Query, HttpException, HttpStatus, Param } from '@nestjs/common';
import { RolesService } from './roles.service';
import { ApiTags } from '@nestjs/swagger';
import { ApiRoleListOperation } from './roles.decorators';
import { ISelectRoleBody, ISelectRoleData } from './roles.interface';
import { timestampToDate } from '../../utils/datetime';

@ApiTags('角色模块')
@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

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
        roleMenus: item.roleMenus,
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
}
