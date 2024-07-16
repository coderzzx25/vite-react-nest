import { ConfigModuleOptions } from '@nestjs/config';

const configModel: ConfigModuleOptions = {
  isGlobal: true,
  envFilePath: ['.env', '.env.development'],
};

export default configModel;
