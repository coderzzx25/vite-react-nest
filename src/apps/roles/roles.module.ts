import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';
import { CoderzzxRoles } from '../entities/roles.entity';
import { MenusModule } from '../menus/menus.module';

@Module({
  imports: [TypeOrmModule.forFeature([CoderzzxRoles]), forwardRef(() => MenusModule)],
  controllers: [RolesController],
  providers: [RolesService],
  exports: [RolesService],
})
export class RolesModule {}
