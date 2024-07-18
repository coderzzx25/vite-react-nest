import { applyDecorators, Get, Post, UseGuards, HttpCode } from '@nestjs/common';
import { AuthGuard } from '../auths/auth.guard';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiQuery, ApiBody, ApiParam } from '@nestjs/swagger';

export const ApiRoleListOperation = () => {
  return applyDecorators(ApiBearerAuth(), UseGuards(AuthGuard), Get('role-list'));
};

export const ApiCreateRoleOperation = () => {
  return applyDecorators(ApiBearerAuth(), UseGuards(AuthGuard), HttpCode(200), Post('create-role'));
};

export const ApiUpdateRoleOperation = () => {
  return applyDecorators(ApiBearerAuth(), UseGuards(AuthGuard), HttpCode(200), Post('update-role'));
};
