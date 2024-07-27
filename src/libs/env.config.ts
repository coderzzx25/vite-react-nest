import { ConfigModuleOptions } from '@nestjs/config';

const configModel: ConfigModuleOptions = {
  isGlobal: true,
  envFilePath: ['.env.development', '.env.production'],
};

export default configModel;
