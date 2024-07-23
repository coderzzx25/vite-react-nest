export interface ISelectRoleBody {
  page: number;
  size: number;
  roleName?: string;
  status?: number;
}

export interface RoleInfo {
  id: number;
  roleName: string;
  rolePermissions: number[];
  permissionInfo?: {
    id: number;
    permissionName: string;
  }[];
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
  rolePermissions: number[];
  status: number;
  createTime?: number;
  updateTime?: number;
}

export interface ICreateRoleService {
  roleName: string;
  rolePermissions: string;
  status: number;
  createTime?: number;
  updateTime?: number;
}

export interface IUpdateRoleBody {
  id: number;
  roleName?: string;
  rolePermissions?: number[];
  status?: number;
  updateTime?: number;
}

export interface IUpdateRoleService {
  id: number;
  roleName?: string;
  rolePermissions?: string;
  status?: number;
  updateTime?: number;
}
