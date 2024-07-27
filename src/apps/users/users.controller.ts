import { Controller, Query, HttpException, HttpStatus, Body, UseGuards, Post, Get, HttpCode } from '@nestjs/common';
import { UsersService } from './users.service';
import { ISelectUserBody, ISelectUserData, IUserInfo, ICreateUserBody, IUpdateUserBody } from './users.interface';
import { timestampToDate, getTimestamp } from '../../utils/datetime';
import { RolesService } from '../roles/roles.service';
import { RoleInfo } from '../roles/roles.interface';
import { AuthGuard } from '../auths/auth.guard';
import { encryptPassword } from '../../utils/data-encryption';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly rolesService: RolesService,
  ) {}

  @UseGuards(AuthGuard)
  @Get('user-list')
  async getUserList(
    @Query('page') page: number,
    @Query('size') size: number,
    @Query('userAccount') userAccount?: string,
    @Query('userName') userName?: string,
    @Query('userRole') userRole?: number,
    @Query('status') status?: number,
  ): Promise<ISelectUserData> {
    if (!page || !size) {
      throw new HttpException('参数错误', HttpStatus.BAD_REQUEST);
    }

    const selectInfo: ISelectUserBody = {
      page,
      size,
    };

    if (userAccount) selectInfo.userAccount = userAccount;

    if (userName) selectInfo.userName = userName;

    if (userRole) selectInfo.userRole = userRole;

    if (status) selectInfo.status = status;

    const { data, total } = await this.usersService.getUserListService(selectInfo);

    // 获取角色
    const roleIds = data.map((item) => item.userRole);

    // 获取角色信息
    const roleInfo = await this.rolesService.getRoleByIdsService(roleIds);

    const newRoleInfo: RoleInfo[] = roleInfo.map((item) => {
      return {
        ...item,
        rolePermissions: item.rolePermissions.split(',').map(Number),
        createTime: timestampToDate(item.createTime),
        updateTime: timestampToDate(item.updateTime),
      };
    });

    const newData: IUserInfo[] = data.map((item) => {
      const role = newRoleInfo.find((role) => role.id === item.userRole);
      return {
        ...item,
        userRole: role as RoleInfo,
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
  @Post('create-user')
  async createUser(@Body() createUserBody: ICreateUserBody) {
    const { userAccount, userName, userAvatar, userRole, status } = createUserBody;

    if (!userName || !userAccount || !userAvatar || !userRole || status === undefined) {
      throw new HttpException('参数错误', HttpStatus.BAD_REQUEST);
    }

    const roleInfo = await this.rolesService.getRoleByIdService(userRole);

    if (!roleInfo) {
      throw new HttpException('角色不存在', HttpStatus.BAD_REQUEST);
    }

    const userInfo = await this.usersService.getUserByUserAccountService(userAccount);

    if (userInfo) {
      throw new HttpException('用户已存在', HttpStatus.BAD_REQUEST);
    }

    const defaultPassword = await encryptPassword('123456');
    createUserBody.userPassword = defaultPassword;
    createUserBody.createTime = getTimestamp();
    createUserBody.updateTime = getTimestamp();

    try {
      await this.usersService.createUserService(createUserBody);
      return '创建成功';
    } catch (error) {
      throw new HttpException('创建失败', HttpStatus.BAD_REQUEST);
    }
  }

  @UseGuards(AuthGuard)
  @HttpCode(200)
  @Post('update-user')
  async updateUser(@Body() updateUserBody: IUpdateUserBody) {
    const { id, userAccount, userName, userAvatar, userRole, status } = updateUserBody;

    if (!id) {
      throw new HttpException('参数错误', HttpStatus.BAD_REQUEST);
    }

    const updateInfo: IUpdateUserBody = {
      id,
    };

    if (userAccount) {
      const userInfo = await this.usersService.getUserByUserAccountService(userAccount);

      if (userInfo && userInfo.id !== id) {
        throw new HttpException('用户已存在', HttpStatus.BAD_REQUEST);
      }

      updateInfo.userAccount = userAccount;
    }

    if (userName) updateInfo.userName = userName;

    if (userAvatar) updateInfo.userAvatar = userAvatar;

    if (userRole) {
      const roleInfo = await this.rolesService.getRoleByIdService(userRole);

      if (!roleInfo) {
        throw new HttpException('角色不存在', HttpStatus.BAD_REQUEST);
      }

      updateInfo.userRole = userRole;
    }

    if (status !== undefined) updateInfo.status = status;

    updateInfo.updateTime = getTimestamp();

    try {
      await this.usersService.updateUserService(updateInfo);
      return '更新成功';
    } catch (error) {
      throw new HttpException('更新失败', HttpStatus.BAD_REQUEST);
    }
  }
}
