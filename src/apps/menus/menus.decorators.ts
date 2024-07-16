import { applyDecorators } from '@nestjs/common';
import { Get, UseGuards, Post, HttpCode } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiQuery, ApiBody, ApiParam } from '@nestjs/swagger';
import { AuthGuard } from '../auths/auth.guard';

export const ApiMenuListOperation = () => {
  return applyDecorators(
    ApiBearerAuth(),
    ApiOperation({ summary: '菜单列表' }),
    ApiQuery({ name: 'page', description: '页码', required: true, type: Number }),
    ApiQuery({ name: 'size', description: '每页数量', required: true, type: Number }),
    ApiQuery({ name: 'menuName', description: '菜单名称', required: false, type: String }),
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
                menuName: { type: 'string', description: '菜单名称', example: '首页' },
                menuUrl: { type: 'string', description: '菜单路径', example: '/home' },
                menuIcon: { type: 'string', description: '菜单图标', example: 'icon-home' },
                menuPid: { type: 'number', description: '父级ID', example: 0 },
                status: { type: 'number', description: '状态', example: 1 },
                createTime: { type: 'string', description: '创建时间', example: '2021-01-01 00:00:00' },
                updateTime: { type: 'string', description: '更新时间', example: '2021-01-01 00:00:00' },
                children: {
                  type: 'array',
                  items: {
                    type: 'object',
                    properties: {
                      id: { type: 'number', description: 'ID', example: 2 },
                      menuName: { type: 'string', description: '菜单名称', example: '用户管理' },
                      menuUrl: { type: 'string', description: '菜单路径', example: '/user' },
                      menuIcon: { type: 'string', description: '菜单图标', example: 'icon-user' },
                      menuPid: { type: 'number', description: '父级ID', example: 1 },
                      status: { type: 'number', description: '状态', example: 1 },
                      createTime: { type: 'string', description: '创建时间', example: '2021-01-01 00:00:00' },
                      updateTime: { type: 'string', description: '更新时间', example: '2021-01-01 00:00:00' },
                    },
                  },
                },
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
          message: { type: 'string', description: '错误信息', example: '未登录' },
          error: { type: 'string', description: '错误名称', example: 'Unauthorized' },
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
    Get('menu-list'),
  );
};

export const ApiCreateMenuOperation = () => {
  return applyDecorators(
    ApiBearerAuth(),
    ApiOperation({ summary: '创建菜单' }),
    ApiBody({
      schema: {
        type: 'object',
        properties: {
          menuName: { type: 'string', description: '菜单名称', example: '用户管理' },
          menuIcon: { type: 'string', description: '菜单图标', example: 'icon-user' },
          menuUrl: { type: 'string', description: '菜单路径', example: '/user' },
          menuPid: { type: 'number', description: '父级ID', example: 1 },
          status: { type: 'number', description: '状态', example: 1 },
        },
      },
    }),
    ApiResponse({
      status: 200,
      description: '成功',
      schema: {
        type: 'string',
        example: '创建菜单成功',
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
      status: 500,
      description: '创建菜单失败',
      schema: {
        type: 'object',
        properties: {
          statusCode: { type: 'number', description: '状态码', example: 500 },
          message: { type: 'string', description: '错误信息', example: '创建菜单失败' },
        },
      },
    }),
    UseGuards(AuthGuard),
    HttpCode(200),
    Post('create-menu'),
  );
};

export const ApiUpdateMenuOperation = () => {
  return applyDecorators(
    ApiBearerAuth(),
    ApiOperation({ summary: '编辑菜单' }),
    ApiBody({
      schema: {
        type: 'object',
        properties: {
          id: { type: 'number', description: '菜单ID', example: 1 },
          menuName: { type: 'string', description: '菜单名称', example: '用户管理' },
          menuIcon: { type: 'string', description: '菜单图标', example: 'icon-user' },
          menuUrl: { type: 'string', description: '菜单路径', example: '/user' },
          menuPid: { type: 'number', description: '父级ID', example: 1 },
          status: { type: 'number', description: '状态', example: 1 },
        },
      },
    }),
    ApiResponse({
      status: 200,
      description: '成功',
      schema: {
        type: 'string',
        example: '更新菜单成功',
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
      description: '参数错误/菜单名称重复/父级菜单不存在',
      schema: {
        type: 'object',
        properties: {
          statusCode: { type: 'number', description: '状态码', example: 400 },
          message: { type: 'string', description: '错误信息', example: '参数错误' },
        },
      },
    }),
    ApiResponse({
      status: 500,
      description: '更新菜单失败',
      schema: {
        type: 'object',
        properties: {
          statusCode: { type: 'number', description: '状态码', example: 500 },
          message: { type: 'string', description: '错误信息', example: '更新菜单失败' },
        },
      },
    }),
    UseGuards(AuthGuard),
    HttpCode(200),
    Post('update-menu'),
  );
};

export const ApiUserMenuListOperation = () => {
  return applyDecorators(
    ApiBearerAuth(),
    ApiOperation({ summary: '角色菜单' }),
    ApiParam({ name: 'roleId', description: '角色ID', required: true, type: Number }),
    ApiResponse({
      status: 200,
      description: '成功',
      schema: {
        type: 'object',
        properties: {
          menus: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                id: { type: 'number', description: 'ID', example: 1 },
                menuName: { type: 'string', description: '菜单名称', example: '系统管理' },
                menuUrl: { type: 'string', description: '菜单路径', example: '/roles' },
                menuIcon: { type: 'string', description: '菜单图标', example: 'AppstoreOutlined' },
                menuPid: { type: 'number', description: '父级ID', example: 0 },
                status: { type: 'booble', description: '状态', example: true },
                createTime: { type: 'string', description: '创建时间', example: '2024-6-24 17:32' },
                updateTime: { type: 'string', description: '更新时间', example: '2024-7-4 15:47' },
                children: {
                  type: 'array',
                  items: {
                    type: 'object',
                    properties: {
                      id: { type: 'number', description: 'ID', example: 3 },
                      menuName: { type: 'string', description: '菜单名称', example: '角色管理' },
                      menuUrl: { type: 'string', description: '菜单路径', example: '/roles' },
                      menuIcon: { type: 'string', description: '菜单图标', example: 'AppstoreOutlined' },
                      menuPid: { type: 'number', description: '父级ID', example: 2 },
                      status: { type: 'booble', description: '状态', example: true },
                      createTime: { type: 'string', description: '创建时间', example: '2024-6-24 21:11' },
                      updateTime: { type: 'string', description: '更新时间', example: '2024-6-24 21:11' },
                    },
                  },
                },
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
          message: { type: 'string', description: '错误信息', example: '未登录' },
          error: { type: 'string', description: '错误名称', example: 'Unauthorized' },
        },
      },
    }),
    ApiResponse({
      status: 400,
      description: '参数错误/角色不存在',
      schema: {
        type: 'object',
        properties: {
          statusCode: { type: 'number', description: '状态码', example: 400 },
          message: { type: 'string', description: '错误信息', example: '参数错误' },
        },
      },
    }),
    UseGuards(AuthGuard),
    Get('user-menu/:roleId'),
  );
};
