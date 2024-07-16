import { Controller, Body, HttpException, HttpStatus } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { JwtService } from '@nestjs/jwt';
import { AuthsService } from './auths.service';
import { UsersService } from '../users/users.service';
import { IAccountLoginInfo, IAccountLoginData } from './auths.interface';
import { ApiAccountLoginOperation } from './auth.decorators';

@ApiTags('认证模块')
@Controller('auths')
export class AuthsController {
  constructor(
    private readonly authsService: AuthsService,
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  @ApiAccountLoginOperation()
  async accountLogin(@Body() body: IAccountLoginInfo): Promise<IAccountLoginData> {
    const { userName, userPassword } = body;

    if (!userName || !userPassword) {
      throw new HttpException('账户名或密码不能为空', HttpStatus.BAD_REQUEST);
    }

    const userInfo = await this.usersService.getUserInfoByUserName(userName);

    if (!userInfo) {
      throw new HttpException('账户名不存在', HttpStatus.BAD_REQUEST);
    }

    if (userInfo.userPassword !== userPassword) {
      throw new HttpException('密码错误', HttpStatus.BAD_REQUEST);
    }

    // 生成 token
    const payload = {
      userName: userInfo.userName,
      userNickName: userInfo.userNick,
      userHead: userInfo.userHead,
      roleId: userInfo.userRole,
    };
    const accessToken = await this.jwtService.signAsync(payload);
    const refreshToken = await this.jwtService.signAsync(payload, {
      expiresIn: '7d',
    });

    const data = {
      userInfo: {
        userName: userInfo.userName,
        userNickName: userInfo.userNick,
        userHead: userInfo.userHead,
        roleId: userInfo.userRole,
      },
      accessToken: accessToken,
      refreshToken: refreshToken,
    };

    return data;
  }
}
