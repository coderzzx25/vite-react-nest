import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('coderzzx_roles', { schema: 'coderzzx_django' })
export class CoderzzxRoles {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id', comment: 'ID' })
  id: number;

  @Column('varchar', { name: 'role_name', comment: '角色名', length: 50 })
  roleName: string;

  @Column('varchar', { name: 'role_menus', comment: '角色菜单', length: 255 })
  roleMenus: string;

  @Column('varchar', {
    name: 'role_permissions',
    comment: '操作权限',
    length: 255,
  })
  rolePermissions: string;

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
