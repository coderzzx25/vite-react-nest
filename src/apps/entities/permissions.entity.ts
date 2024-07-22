import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('coderzzx_permissions', { schema: 'coderzzx_django' })
export class CoderzzxPermissions {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id', comment: 'ID' })
  id: number;

  @Column('varchar', { name: 'menu_name', comment: '菜单名', length: 50 })
  menuName: string;

  @Column('varchar', { name: 'menu_icon', comment: '菜单图标', length: 50 })
  menuIcon: string;

  @Column('varchar', { name: 'menu_url', comment: '菜单地址', length: 100 })
  menuUrl: string;

  @Column('int', { name: 'menu_pid', comment: '父菜单', default: () => "'0'" })
  menuPid: number;

  @Column('tinyint', { name: 'permission_type', comment: '权限类型,1:页面,2:操作', width: 1, default: () => "'1'" })
  permissionType: number;

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
}
