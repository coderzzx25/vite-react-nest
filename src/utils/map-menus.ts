import { CoderzzxPermissions } from '../apps/entities/permissions.entity';
import { IMenuInfo } from '../apps/permissions/permissions.interface';
import { timestampToDate } from './datetime';

export const mapMenusToRoutes = (menuList: CoderzzxPermissions[]): IMenuInfo[] => {
  const handleMenu = (menus: CoderzzxPermissions[], pid: number): IMenuInfo[] => {
    return menus
      .filter((menu) => menu.menuPid === pid)
      .map((menu) => {
        const { id, menuName, menuUrl, menuIcon, menuPid, status, createTime, updateTime } = menu;
        const children = handleMenu(menus, id);
        return {
          id,
          menuName,
          menuUrl,
          menuIcon,
          menuPid,
          status,
          createTime: timestampToDate(createTime),
          updateTime: timestampToDate(updateTime),
          children: children.length ? children : undefined,
        };
      });
  };
  return handleMenu(menuList, 0);
};
