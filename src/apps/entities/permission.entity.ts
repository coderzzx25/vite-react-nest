import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { CoderzzxMenus } from 'd:/Desktop/server/src/apps/entities/menus.entity';

@Entity('coderzzx_permissions', { schema: 'coderzzx_django' })
export class CoderzzxPermissions {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id', comment: 'ID' })
  id: number;

  @Column('varchar', { name: 'permission_name', comment: '权限名', length: 50 })
  permissionName: string;

  @Column('varchar', {
    name: 'permission_value',
    comment: '权限值',
    length: 50,
  })
  permissionValue: string;

  @Column('int', { name: 'menu_id', comment: '菜单', default: () => "'0'" })
  menuId: number;

  @Column('tinyint', {
    name: 'status',
    comment: '状态：0:失效，1:启用',
    width: 1,
    default: () => "'1'",
  })
  status: number;

  @Column('int', {
    name: 'create_time',
    comment: '创建时间',
    default: () => "'0'",
  })
  createTime: number;

  @Column('int', {
    name: 'update_time',
    comment: '更新时间',
    default: () => "'0'",
  })
  updateTime: number;
  menu?: CoderzzxMenus;
}
