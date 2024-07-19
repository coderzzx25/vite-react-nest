import { RoleInfo } from '../roles/roles.interface';

export interface ISelectUserBody {
  page: number;
  size: number;
  userName?: string;
  userNick?: string;
  userRole?: number;
  status?: number;
}

export interface IUserInfo {
  id: number;
  userName: string;
  userNick: string;
  userHead: string;
  userRole: RoleInfo;
  status: number;
  createTime: string;
  updateTime: string;
}

export interface ISelectUserData {
  total: number;
  data: IUserInfo[];
}

export interface ICreateUserBody {
  userName: string;
  userPassword: string;
  userNick: string;
  userHead: string;
  userRole: number;
  status: number;
  createTime?: number;
  updateTime?: number;
}

export interface IUpdateUserBody {
  id: number;
  userName?: string;
  userNick?: string;
  userHead?: string;
  userRole?: number;
  status?: number;
  updateTime?: number;
}
