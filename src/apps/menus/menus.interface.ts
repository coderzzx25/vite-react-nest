import { IPermissionInfo } from '../permissions/permissions.interface';
export interface ISelectMenuParams {
  page: number;
  size: number;
  menuName?: string;
  status?: number;
}

export interface IMenuInfo {
  id: number;
  menuName: string;
  menuIcon: string;
  menuUrl: string;
  menuPid: number;
  status: number;
  createTime: string;
  updateTime: string;
  children?: IMenuInfo[];
}

export interface ISelectMenuResponseData {
  total: number;
  data: IMenuInfo[];
}

export interface ICreateMenuBody {
  menuName: string;
  menuIcon: string;
  menuUrl: string;
  menuPid: number;
  status: number;
  createTime?: number;
  updateTime?: number;
}

export interface IUpdateMenuBody {
  id: number;
  menuName?: string;
  menuIcon?: string;
  menuUrl?: string;
  menuPid?: number;
  status?: number;
  updateTime?: number;
}

export interface IUserMenuResponseData {
  menus: IMenuInfo[];
  permissions: IPermissionInfo[];
}
