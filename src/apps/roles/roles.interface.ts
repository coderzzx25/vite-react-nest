export interface ISelectRoleBody {
  page: number;
  size: number;
  roleName?: string;
  status?: number;
}

interface RoleInfo {
  id: number;
  roleName: string;
  roleMenus: string;
  rolePermissions: string;
  status: number;
  createTime: string;
  updateTime: string;
}

export interface ISelectRoleData {
  total: number;
  data: RoleInfo[];
}
