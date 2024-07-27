import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class Users {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id', comment: 'ID' })
  id: number;

  @Column('varchar', { name: 'user_account', comment: '账户', length: 50 })
  userAccount: string;

  @Column('varchar', { name: 'user_password', comment: '密码', length: 100 })
  userPassword: string;

  @Column('varchar', { name: 'user_avatar', comment: '头像', length: 100 })
  userAvatar: string;

  @Column('varchar', { name: 'user_name', comment: '姓名', length: 20 })
  userName: string;

  @Column('tinyint', {
    name: 'user_role',
    comment: '角色',
    default: () => "'0'",
  })
  userRole: number;

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
