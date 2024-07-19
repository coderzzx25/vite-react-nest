import { applyDecorators, Get, Post, UseGuards, HttpCode } from '@nestjs/common';
import { AuthGuard } from '../auths/auth.guard';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiQuery, ApiBody, ApiParam } from '@nestjs/swagger';

export const ApiRoleListOperation = () => {
  return applyDecorators(
    ApiBearerAuth(),
    UseGuards(AuthGuard),
    ApiOperation({ summary: '角色列表' }),
    Get('role-list'),
    ApiQuery({ name: 'page', type: Number, required: true }),
    ApiQuery({ name: 'size', type: Number, required: true }),
    ApiQuery({ name: 'roleName', type: String, required: false }),
    ApiQuery({ name: 'status', type: Number, required: false, enum: [0, 1], example: 1 }),
    ApiResponse({
      status: 200,
      description: '成功',
      schema: {
        type: 'object',
        properties: {
          total: { type: 'number' },
          data: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                id: { type: 'number' },
                roleName: { type: 'string' },
                roleMenus: { type: 'array', items: { type: 'number' } },
                status: { type: 'number' },
                createTime: { type: 'string' },
                updateTime: { type: 'string' },
              },
            },
          },
        },
      },
    }),
  );
};

export const ApiCreateRoleOperation = () => {
  return applyDecorators(ApiBearerAuth(), UseGuards(AuthGuard), HttpCode(200), Post('create-role'));
};

export const ApiUpdateRoleOperation = () => {
  return applyDecorators(ApiBearerAuth(), UseGuards(AuthGuard), HttpCode(200), Post('update-role'));
};

export const ApiAllRoleListOperation = () => {
  return applyDecorators(ApiBearerAuth(), UseGuards(AuthGuard), Get('all-role-list'));
};
