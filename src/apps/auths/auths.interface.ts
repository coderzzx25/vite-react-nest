export interface IAccountLoginInfo {
  userName: string;
  userPassword: string;
}

export interface IAccountLoginData {
  userInfo: {
    userName: string;
    userNickName: string;
    userHead: string;
    roleId: number;
  };
  accessToken: string;
  refreshToken: string;
}
