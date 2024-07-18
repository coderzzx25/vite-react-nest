import { applyDecorators, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../auths/auth.guard';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiQuery, ApiBody, ApiParam } from '@nestjs/swagger';

export const ApiRoleListOperation = () => {
  return applyDecorators(ApiBearerAuth(), UseGuards(AuthGuard), Get('role-list'));
};
