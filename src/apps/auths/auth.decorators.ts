import { applyDecorators } from '@nestjs/common';
import { Post, HttpCode } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';

export const ApiAccountLoginOperation = () => {
  return applyDecorators(
    ApiOperation({ summary: '账号登录' }),
    Post('account-login'),
    HttpCode(200),
    ApiBody({
      schema: {
        type: 'object',
        properties: {
          username: { type: 'string', description: '用户名', example: 'admin' },
          password: { type: 'string', description: '密码', example: '123456' },
        },
      },
    }),
    ApiResponse({
      status: 200,
      description: '成功',
      schema: {
        type: 'object',
        properties: {
          userInfo: {
            type: 'object',
            properties: {
              userName: { type: 'string', description: '用户名', example: 'admin' },
              userNickName: { type: 'string', description: '昵称', example: '管理员' },
              userHead: { type: 'string', description: '头像', example: 'https://www.example.com/avatar.jpg' },
              roleId: { type: 'number', description: '角色ID', example: 1 },
            },
          },
          accessToken: { type: 'string', description: '访问令牌', example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' },
          refreshToken: { type: 'string', description: '刷新令牌', example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' },
        },
      },
    }),
    ApiResponse({
      status: 400,
      description: '账户或密码不能为空/账户不存在/密码错误',
      schema: {
        type: 'object',
        properties: {
          statusCode: { type: 'number', description: '状态码', example: 400 },
          message: { type: 'string', description: '消息', example: '账户或密码不能为空/账户不存在/密码错误' },
        },
      },
    }),
  );
};
