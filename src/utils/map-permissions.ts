import { Permissions } from '../apps/entities/permissions.entity';
import { IPermissionInfo } from '../apps/permissions/permissions.interface';
import { timestampToDate } from './datetime';

export const mapPermissionToRoutes = (permissionList: Permissions[]): IPermissionInfo[] => {
  const handlePermission = (permissions: Permissions[], pid: number, parentIds: number[] = []): IPermissionInfo[] => {
    return permissions
      .filter((permission) => permission.permissionPid === pid)
      .map((permission) => {
        const { id, permissionName, permissionUrl, permissionIcon, permissionType, status, createTime, updateTime } =
          permission;
        const currentParentIds = pid === 0 ? [0] : [...parentIds, pid];
        const children = handlePermission(permissions, id, currentParentIds);
        return {
          id,
          permissionName,
          permissionUrl,
          permissionIcon,
          permissionPid: currentParentIds.length === 1 && currentParentIds[0] === 0 ? [0] : currentParentIds.slice(1),
          permissionType,
          status,
          createTime: timestampToDate(createTime),
          updateTime: timestampToDate(updateTime),
          children: children.length ? children : undefined,
        };
      });
  };
  return handlePermission(permissionList, 0);
};
