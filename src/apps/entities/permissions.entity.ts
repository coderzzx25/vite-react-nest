import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('permissions')
export class Permissions {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id', comment: 'ID' })
  id: number;

  @Column('varchar', { name: 'permission_name', comment: '权限名', length: 50 })
  permissionName: string;

  @Column('varchar', { name: 'permission_icon', comment: '权限图标', length: 50, default: () => "''" })
  permissionIcon: string;

  @Column('varchar', { name: 'permission_url', comment: '权限地址', length: 100, default: () => "''" })
  permissionUrl: string;

  @Column('int', { name: 'permission_pid', comment: '父权限', default: () => "'0'" })
  permissionPid: number;

  @Column('tinyint', {
    name: 'permission_type',
    comment: '权限类型 1:菜单,2:按钮',
    width: 1,
    default: () => "'1'",
  })
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
