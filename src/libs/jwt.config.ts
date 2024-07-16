import { JwtModuleOptions } from '@nestjs/jwt';
import * as path from 'path';
import * as fs from 'fs';

const privateKeyPath = path.resolve(__dirname, '..', 'keys', 'private.key');
const publicKeyPath = path.resolve(__dirname, '..', 'keys', 'public.key');

const privateKey = fs.readFileSync(privateKeyPath, 'utf8');
const publicKey = fs.readFileSync(publicKeyPath, 'utf8');

const jwtConfig: JwtModuleOptions = {
  global: true, // 全局模块
  privateKey: privateKey, // 私钥
  publicKey: publicKey, // 公钥
  signOptions: {
    expiresIn: '5d', // 过期时间
    algorithm: 'RS256', // 算法
  },
  verifyOptions: {
    algorithms: ['RS256'], // 算法
  },
};

export default jwtConfig;
