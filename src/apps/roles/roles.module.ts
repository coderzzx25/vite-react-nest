import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';
import { Roles } from '../entities/roles.entity';
import { MenusModule } from '../permissions/permissions.module';

@Module({
  imports: [TypeOrmModule.forFeature([Roles]), forwardRef(() => MenusModule)],
  controllers: [RolesController],
  providers: [RolesService],
  exports: [RolesService],
})
export class RolesModule {}
