import { Module, forwardRef } from '@nestjs/common';
import { MenusService } from './permissions.service';
import { MenusController } from './permissions.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoderzzxPermissions } from '../entities/permissions.entity';
import { RolesModule } from '../roles/roles.module';

@Module({
  imports: [TypeOrmModule.forFeature([CoderzzxPermissions]), forwardRef(() => RolesModule)],
  controllers: [MenusController],
  providers: [MenusService],
  exports: [MenusService],
})
export class MenusModule {}
