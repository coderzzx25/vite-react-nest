import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';
import { CoderzzxRoles } from '../entities/roles.entity';
import { MenusModule } from '../menus/menus.module';

@Module({
  imports: [TypeOrmModule.forFeature([CoderzzxRoles])],
  controllers: [RolesController],
  providers: [RolesService],
  exports: [RolesService],
})
export class RolesModule {}
