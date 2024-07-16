import { applyDecorators } from '@nestjs/common';
import { Get, UseGuards, Post, HttpCode } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiQuery, ApiBody } from '@nestjs/swagger';
import { AuthGuard } from '../auths/auth.guard';

export const ApiPermissionListOperation = () => {
  return applyDecorators(
    ApiBearerAuth(),
    ApiOperation({ summary: '权限列表' }),
    ApiQuery({ name: 'page', description: '页码', required: true, type: Number }),
    ApiQuery({ name: 'size', description: '每页数量', required: true, type: Number }),
    ApiQuery({ name: 'permissionName', description: '权限名称', required: false, type: String }),
    ApiQuery({ name: 'menuId', description: '菜单ID', required: false, type: Number }),
    ApiQuery({ name: 'status', description: '状态', required: false, type: Number, enum: [0, 1], example: 1 }),
    ApiResponse({
      status: 200,
      description: '成功',
      schema: {
        type: 'object',
        properties: {
          total: { type: 'number', description: '总数', example: 4 },
          data: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                id: { type: 'number', description: 'ID', example: 1 },
                permissionName: { type: 'string', description: '权限名称', example: '查看角色' },
                permissionValue: { type: 'string', description: '权限值', example: 'role:view' },
                menuId: { type: 'number', description: '菜单ID', example: 1 },
                status: { type: 'number', description: '状态', example: 1 },
                createTime: { type: 'string', description: '创建时间', example: '2021-01-01 00:00:00' },
                updateTime: { type: 'string', description: '更新时间', example: '2021-01-01 00:00:00' },
              },
            },
          },
        },
      },
    }),
    ApiResponse({
      status: 401,
      description: '未授权',
      schema: {
        type: 'object',
        properties: {
          statusCode: { type: 'number', description: '状态码', example: 401 },
          message: { type: 'string', description: '错误信息', example: 'Unauthorized' },
        },
      },
    }),
    ApiResponse({
      status: 400,
      description: '参数错误',
      schema: {
        type: 'object',
        properties: {
          statusCode: { type: 'number', description: '状态码', example: 400 },
          message: { type: 'string', description: '错误信息', example: '参数错误' },
        },
      },
    }),
    UseGuards(AuthGuard),
    Get('permission-list'),
  );
};

export const ApiCreatePermissionOperation = () => {
  return applyDecorators(
    ApiBearerAuth(),
    ApiOperation({ summary: '创建权限' }),
    ApiBody({
      schema: {
        type: 'object',
        properties: {
          permissionName: { type: 'string', description: '权限名称', example: '查看角色' },
          permissionValue: { type: 'string', description: '权限值', example: 'role:view' },
          menuId: { type: 'number', description: '菜单ID', example: 1 },
          status: { type: 'number', description: '状态', example: 1 },
        },
      },
    }),
    ApiResponse({
      status: 200,
      description: '成功',
      schema: {
        type: 'string',
        example: '创建权限成功',
      },
    }),
    ApiResponse({
      status: 401,
      description: '未授权',
      schema: {
        type: 'object',
        properties: {
          statusCode: { type: 'number', description: '状态码', example: 401 },
          message: { type: 'string', description: '错误信息', example: '未登录' },
          error: { type: 'string', description: '错误名称', example: 'Unauthorized' },
        },
      },
    }),
    ApiResponse({
      status: 400,
      description: '参数错误/权限名称重复/菜单不存在',
      schema: {
        type: 'object',
        properties: {
          statusCode: { type: 'number', description: '状态码', example: 400 },
          message: { type: 'string', description: '错误信息', example: '参数错误' },
        },
      },
    }),
    UseGuards(AuthGuard),
    HttpCode(200),
    Post('create-permission'),
  );
};

export const ApiUpdatePermissionOperation = () => {
  return applyDecorators(
    ApiBearerAuth(),
    ApiOperation({ summary: '编辑权限' }),
    ApiBody({
      schema: {
        type: 'object',
        properties: {
          id: { type: 'number', description: 'ID', example: 1 },
          permissionName: { type: 'string', description: '权限名称', example: '查看角色' },
          permissionValue: { type: 'string', description: '权限值', example: 'role:view' },
          menuId: { type: 'number', description: '菜单ID', example: 1 },
          status: { type: 'number', description: '状态', example: 1 },
        },
      },
    }),
    ApiResponse({
      status: 200,
      description: '成功',
      schema: {
        type: 'string',
        example: '编辑权限成功',
      },
    }),
    ApiResponse({
      status: 401,
      description: '未授权',
      schema: {
        type: 'object',
        properties: {
          statusCode: { type: 'number', description: '状态码', example: 401 },
          message: { type: 'string', description: '错误信息', example: '未登录' },
          error: { type: 'string', description: '错误名称', example: 'Unauthorized' },
        },
      },
    }),
    ApiResponse({
      status: 400,
      description: '参数错误/权限不存在/菜单不存在',
      schema: {
        type: 'object',
        properties: {
          statusCode: { type: 'number', description: '状态码', example: 400 },
          message: { type: 'string', description: '错误信息', example: '参数错误' },
        },
      },
    }),
    UseGuards(AuthGuard),
    HttpCode(200),
    Post('update-permission'),
  );
};
