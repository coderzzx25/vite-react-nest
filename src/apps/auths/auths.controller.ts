import { Controller, Body, HttpException, HttpStatus, Post, HttpCode } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { AuthsService } from './auths.service';
import { UsersService } from '../users/users.service';
import { IAccountLoginBody, IAccountLoginResponseData } from './auths.interface';
import { comparePasswords, encryptData } from '../../utils/data-encryption';

@Controller('auths')
export class AuthsController {
  constructor(
    private readonly authsService: AuthsService,
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  @Post('account-login')
  @HttpCode(200)
  async accountLogin(@Body() body: IAccountLoginBody): Promise<IAccountLoginResponseData> {
    const { userAccount, userPassword } = body;

    if (!userAccount || !userPassword) {
      throw new HttpException('账户名或密码不能为空', HttpStatus.BAD_REQUEST);
    }

    const userInfo = await this.usersService.getUserInfoByUserAccount(userAccount);

    if (!userInfo) {
      throw new HttpException('账户名不存在', HttpStatus.BAD_REQUEST);
    }

    const isMatch = await comparePasswords(userPassword, userInfo.userPassword);
    if (!isMatch) {
      throw new HttpException('密码错误', HttpStatus.BAD_REQUEST);
    }

    // 生成 token
    const payload = {
      userAccount: userInfo.userAccount,
      userName: userInfo.userName,
      userAvatar: userInfo.userAvatar,
      roleId: userInfo.userRole,
    };
    const accessToken = await this.jwtService.signAsync(payload);
    const refreshToken = await this.jwtService.signAsync(payload, {
      expiresIn: '7d',
    });

    const key = this.configService.get('NEST_ENCRYPTION_KEY');
    const iv = this.configService.get('NEST_ENCRYPTION_IV');
    const data = {
      userInfo: {
        userAccount: userInfo.userAccount,
        userName: userInfo.userName,
        userAvatar: userInfo.userAvatar,
        roleId: encryptData(userInfo.userRole.toString(), key, iv),
      },
      accessToken: accessToken,
      refreshToken: refreshToken,
    };

    return data;
  }

  // 刷新 token
  @Post('refresh-token')
  @HttpCode(200)
  async refreshToken(@Body() body: { refreshToken: string }): Promise<{ accessToken: string; refreshToken: string }> {
    const { refreshToken } = body;

    if (!refreshToken) {
      throw new HttpException('refreshToken 不能为空', HttpStatus.BAD_REQUEST);
    }

    // 验证 refreshToken
    let payload;
    try {
      payload = await this.jwtService.verifyAsync(refreshToken);
    } catch (error) {
      throw new HttpException('refreshToken 无效', HttpStatus.BAD_REQUEST);
    }

    const { exp, iat, ...newPayload } = payload;
    // 生成新的 accessToken
    const newAccessToken = await this.jwtService.signAsync(newPayload);
    const newRefreshToken = await this.jwtService.signAsync(newPayload, {
      expiresIn: '7d',
    });

    const data = {
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
    };

    return data;
  }
}
