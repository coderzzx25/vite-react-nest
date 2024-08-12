import { Injectable } from '@nestjs/common';
import axios from 'axios';

import { IGithubUserInfo } from './auths.interface';

@Injectable()
export class AuthsService {
  constructor() {}

  /**
   * 获取 github accessToken
   * @param code github code
   * @param clientId github clientId
   * @param clientSecret github clientSecret
   * @returns accessToken
   */
  async getGithubAccessToken(code: string, clientId: string, clientSecret: string): Promise<string> {
    const url = 'https://github.com/login/oauth/access_token';
    const data = {
      client_id: clientId,
      client_secret: clientSecret,
      code,
    };
    const headers = {
      accept: 'application/json',
    };

    try {
      const response = await axios.post(url, data, { headers });
      const accessToken = response.data.access_token;
      return accessToken;
    } catch (error) {
      return '';
    }
  }

  /**
   * 获取 github 用户信息
   * @param accessToken github accessToken
   */
  async getGithubUserInfo(accessToken: string): Promise<IGithubUserInfo | null> {
    const url = 'https://api.github.com/user';
    const headers = {
      Authorization: `Bearer ${accessToken}`,
    };

    try {
      const response = await axios.get(url, { headers });
      return response.data;
    } catch (error) {
      return null;
    }
  }
}
