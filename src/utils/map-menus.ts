import { CoderzzxMenus } from '../apps/entities/menus.entity';
import { IMenuRoute } from '../apps/menus/menus.interface';
import { timestampToDate } from './datetime';

export const mapMenusToRoutes = (menuList: CoderzzxMenus[]): IMenuRoute[] => {
  const handleMenu = (menus: CoderzzxMenus[], pid: number): IMenuRoute[] => {
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
