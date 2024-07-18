export interface ISelectPermissionParams {
  page: number;
  size: number;
  permissionName?: string;
  menuId?: number;
  status?: number;
}

export interface IPermissionInfo {
  id: number;
  permissionName: string;
  permissionValue: string;
  status: number;
  createTime: string;
  updateTime: string;
  menuId: number;
  menuArr?: number[];
}

export interface ISelectPermissionResponseData {
  total: number;
  data: IPermissionInfo[];
}

export interface ICreatePermissionBody {
  permissionName: string;
  permissionValue: string;
  menuId: number;
  status: number;
  createTime?: number;
  updateTime?: number;
}

export interface IUpdatePermissionBody {
  id: number;
  permissionName?: string;
  permissionValue?: string;
  menuId?: number;
  status?: number;
  createTime?: number;
  updateTime?: number;
}
