import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoderzzxUsers } from '../entities/users.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CoderzzxUsers])],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
