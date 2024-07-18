export interface IAccountLoginBody {
  userName: string;
  userPassword: string;
}

export interface IAccountLoginResponseData {
  userInfo: {
    userName: string;
    userNickName: string;
    userHead: string;
    roleId: number;
  };
  accessToken: string;
  refreshToken: string;
}
