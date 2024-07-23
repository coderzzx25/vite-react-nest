import { Module, forwardRef } from '@nestjs/common';
import { PermissionsService } from './permissions.service';
import { PermissionController } from './permissions.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Permissions } from '../entities/permissions.entity';
import { RolesModule } from '../roles/roles.module';

@Module({
  imports: [TypeOrmModule.forFeature([Permissions]), forwardRef(() => RolesModule)],
  controllers: [PermissionController],
  providers: [PermissionsService],
  exports: [PermissionsService],
})
export class PermissionsModule {}
