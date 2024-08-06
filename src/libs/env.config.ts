import { ConfigModuleOptions } from '@nestjs/config';

const configModel: ConfigModuleOptions = {
  isGlobal: true,
  envFilePath: ['.env.development', '.env'],
};

export default configModel;
