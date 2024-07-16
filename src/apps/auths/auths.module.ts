import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthsService } from './auths.service';
import { AuthsController } from './auths.controller';
import { UsersModule } from '../users/users.module';
import jwtConfig from '../../libs/jwt.config';

@Module({
  imports: [UsersModule, JwtModule.register(jwtConfig)],
  controllers: [AuthsController],
  providers: [AuthsService],
})
export class AuthsModule {}
