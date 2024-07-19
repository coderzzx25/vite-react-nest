export interface ISelectRoleBody {
  page: number;
  size: number;
  roleName?: string;
  status?: number;
}

interface RoleInfo {
  id: number;
  roleName: string;
  roleMenus: number[];
  status: number;
  createTime: string;
  updateTime: string;
}

export interface ISelectRoleData {
  total: number;
  data: RoleInfo[];
}

export interface ICreateRoleBody {
  roleName: string;
  roleMenus: number[];
  status: number;
  createTime?: number;
  updateTime?: number;
}

export interface ICreateRoleService {
  roleName: string;
  roleMenus: string;
  status: number;
  createTime?: number;
  updateTime?: number;
}

export interface IUpdateRoleBody {
  id: number;
  roleName?: string;
  roleMenus?: number[];
  status?: number;
  updateTime?: number;
}

export interface IUpdateRoleService {
  id: number;
  roleName?: string;
  roleMenus?: string;
  status?: number;
  updateTime?: number;
}
