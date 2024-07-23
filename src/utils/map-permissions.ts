import { Permissions } from '../apps/entities/permissions.entity';
import { IPermissionInfo } from '../apps/permissions/permissions.interface';
import { timestampToDate } from './datetime';

export const mapPermissionToRoutes = (permissionList: Permissions[]): IPermissionInfo[] => {
  const handlePermission = (permissions: Permissions[], pid: number): IPermissionInfo[] => {
    return permissions
      .filter((permission) => permission.permissionPid === pid)
      .map((permission) => {
        const { id, permissionName, permissionUrl, permissionIcon, permissionPid, status, createTime, updateTime } =
          permission;
        const children = handlePermission(permissions, id);
        return {
          id,
          permissionName,
          permissionUrl,
          permissionIcon,
          permissionPid,
          status,
          createTime: timestampToDate(createTime),
          updateTime: timestampToDate(updateTime),
          children: children.length ? children : undefined,
        };
      });
  };
  return handlePermission(permissionList, 0);
};
