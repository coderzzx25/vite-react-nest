import { CoderzzxPermissions } from '../entities/permission.entity';

export interface IMenuInfo {
  id: number;
  menuName: string;
  menuIcon: string;
  menuUrl: string;
  menuPid: number;
  status: number;
  createTime: String;
  updateTime: String;
}

export interface IMenuRoute extends IMenuInfo {
  children?: IMenuRoute[];
}

export interface ISelectMenuInfo {
  page: number;
  size: number;
  menuName?: string;
  status?: number;
}

export interface ICreateMenuInfo {
  menuName: string;
  menuIcon: string;
  menuUrl: string;
  menuPid: number;
  status: number;
  createTime: number;
  updateTime: number;
}

export interface IUpdateMenuInfo {
  id: number;
  menuName?: string;
  menuIcon?: string;
  menuUrl?: string;
  menuPid?: number;
  status?: number;
  updateTime?: number;
}

export interface IUserMenuInfo {
  menus: IMenuRoute[];
  permissions: CoderzzxPermissions[];
}
