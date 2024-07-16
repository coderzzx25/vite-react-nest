export interface ISelectPermissionInfo {
  page: number;
  size: number;
  permissionName?: string;
  menuId?: number;
  status?: number;
}

export interface ISelectPermissionData {
  id: number;
  permissionName: string;
  permissionValue: string;
  status: number;
  createTime: string;
  updateTime: string;
  menuId: number;
  menuArr: number[];
}

export interface ICreatePermissionInfo {
  permissionName: string;
  permissionValue: string;
  menuId: number;
  status: number;
  createTime?: number;
  updateTime?: number;
}

export interface IUpdatePermissionInfo {
  id: number;
  permissionName?: string;
  permissionValue?: string;
  menuId?: number;
  status?: number;
  createTime?: number;
  updateTime?: number;
}
