import { RoleInfo } from '../roles/roles.interface';

export interface ISelectUserBody {
  page: number;
  size: number;
  userAccount?: string;
  userName?: string;
  userRole?: number;
  status?: number;
}

export interface IUserInfo {
  id: number;
  userAccount: string;
  userName: string;
  userAvatar: string;
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
  userAccount: string;
  userPassword: string;
  userName: string;
  userAvatar: string;
  userRole: number;
  status: number;
  createTime?: number;
  updateTime?: number;
}

export interface IUpdateUserBody {
  id: number;
  userAccount?: string;
  userName?: string;
  userAvatar?: string;
  userRole?: number;
  status?: number;
  updateTime?: number;
}
