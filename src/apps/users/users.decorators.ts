import { applyDecorators, Get, Post, UseGuards, HttpCode } from '@nestjs/common';
import { AuthGuard } from '../auths/auth.guard';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiQuery, ApiBody, ApiParam } from '@nestjs/swagger';

export const ApiUserListOperation = () => {
  return applyDecorators(ApiBearerAuth(), UseGuards(AuthGuard), Get('user-list'));
};

export const ApiCreateUserOperation = () => {
  return applyDecorators(ApiBearerAuth(), UseGuards(AuthGuard), HttpCode(200), Post('create-user'));
};

export const ApiUpdateUserOperation = () => {
  return applyDecorators(ApiBearerAuth(), UseGuards(AuthGuard), HttpCode(200), Post('update-user'));
};
