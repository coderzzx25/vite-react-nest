import { TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

const typeorm: TypeOrmModuleAsyncOptions = {
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: (ConfigService: ConfigService) => ({
    type: 'mysql', // 数据库类型
    host: ConfigService.get<string>('NEST_MYSQL_HOST'), // 数据库地址
    port: ConfigService.get<number>('NEST_MYSQL_PORT'), // 数据库端口
    username: ConfigService.get<string>('NEST_MYSQL_USER'), // 数据库用户名
    password: ConfigService.get<string>('NEST_MYSQL_PASSWORD'), // 数据库密码
    database: ConfigService.get<string>('NEST_MYSQL_DATABASE'), // 数据库名称
    charset: 'utf8mb4', // 字符集
    entities: [__dirname + '/../**/*.entity{.ts,.js}'], // 实体文件路径
    synchronize: true, // 是否自动同步数据库表结构
  }),
};

export default typeorm;
