import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './apps/users/users.module';
import { RolesModule } from './apps/roles/roles.module';
import { MenusModule } from './apps/menus/menus.module';
import { AuthsModule } from './apps/auths/auths.module';

import configModel from './libs/env.config';
import typeorm from './libs/typeorm.config';

@Module({
  imports: [
    ConfigModule.forRoot(configModel),
    TypeOrmModule.forRootAsync(typeorm),
    UsersModule,
    RolesModule,
    MenusModule,
    AuthsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
