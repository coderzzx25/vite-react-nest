export interface IAccountLoginBody {
  userAccount: string;
  userPassword: string;
}

export interface IAccountLoginResponseData {
  userInfo: {
    userAccount: string;
    userName: string;
    userAvatar: string;
    roleId: number;
  };
  accessToken: string;
  refreshToken: string;
}
