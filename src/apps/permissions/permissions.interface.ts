export interface ISelectPermissionParams {
  page: number;
  size: number;
  permissionName?: string;
  status?: number;
}

export interface IPermissionInfo {
  id: number;
  permissionName: string;
  permissionIcon: string;
  permissionUrl: string;
  permissionPid: number[];
  status: number;
  createTime: string;
  updateTime: string;
  children?: IPermissionInfo[];
}

export interface ISelectPermissionResponseData {
  total: number;
  data: IPermissionInfo[];
}

export interface ICreatePermissionBody {
  permissionName: string;
  permissionIcon: string;
  permissionUrl: string;
  permissionPid: number;
  status: number;
  createTime?: number;
  updateTime?: number;
}

export interface IUpdatePermissionBody {
  id: number;
  permissionName?: string;
  permissionIcon?: string;
  permissionUrl?: string;
  permissionPid?: number;
  status?: number;
  updateTime?: number;
}
