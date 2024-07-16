import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PermissionsService } from './permissions.service';
import { PermissionsController } from './permissions.controller';
import { CoderzzxPermissions } from '../entities/permission.entity';
import { MenusModule } from '../menus/menus.module';

@Module({
  imports: [TypeOrmModule.forFeature([CoderzzxPermissions]), forwardRef(() => MenusModule)],
  controllers: [PermissionsController],
  providers: [PermissionsService],
  exports: [PermissionsService],
})
export class PermissionsModule {}
