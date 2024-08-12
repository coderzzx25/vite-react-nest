DROP TABLE IF EXISTS `permissions`;
CREATE TABLE `permissions`  (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `permission_name` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '权限名',
  `permission_icon` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '' COMMENT '权限图标',
  `permission_url` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '' COMMENT '权限地址',
  `permission_pid` int(11) NOT NULL DEFAULT 0 COMMENT '父权限',
  `status` tinyint(1) NOT NULL DEFAULT 1 COMMENT '状态：0:失效，1:启用',
  `create_time` int(11) NOT NULL DEFAULT 0 COMMENT '创建时间',
  `update_time` int(11) NOT NULL DEFAULT 0 COMMENT '更新时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='权限表';


INSERT INTO `permissions` VALUES (1, '数据概况', 'BarChartOutlined', '/dashboard', 0, 1, UNIX_TIMESTAMP(NOW()), UNIX_TIMESTAMP(NOW()));
INSERT INTO `permissions` VALUES (2, '系统管理', 'SettingOutlined', '/systems', 0, 1, UNIX_TIMESTAMP(NOW()), UNIX_TIMESTAMP(NOW()));
INSERT INTO `permissions` VALUES (3, '权限管理', 'ApartmentOutlined', '/permissions', 2, 1, UNIX_TIMESTAMP(NOW()), UNIX_TIMESTAMP(NOW()));
INSERT INTO `permissions` VALUES (4, '角色管理', 'UserSwitchOutlined', '/roles', 2, 1, UNIX_TIMESTAMP(NOW()), UNIX_TIMESTAMP(NOW()));
INSERT INTO `permissions` VALUES (5, '用户管理', 'UserOutlined', '/users', 2, 1, UNIX_TIMESTAMP(NOW()), UNIX_TIMESTAMP(NOW()));

DROP TABLE IF EXISTS `roles`;
CREATE TABLE `roles`  (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `role_name` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '角色名',
  `role_permissions` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '角色权限',
  `status` tinyint(1) NOT NULL DEFAULT 1 COMMENT '状态：0:失效，1:启用',
  `create_time` int(11) NOT NULL DEFAULT 0 COMMENT '创建时间',
  `update_time` int(11) NOT NULL DEFAULT 0 COMMENT '更新时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='角色表';

INSERT INTO `roles` VALUES (1, '超级管理员', '1,2,3,4,5', 1, UNIX_TIMESTAMP(NOW()), UNIX_TIMESTAMP(NOW()));


DROP TABLE IF EXISTS `users`;
CREATE TABLE `users`  (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `user_account` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '账户',
  `user_password` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '密码',
  `user_avatar` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '头像',
  `user_name` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '姓名',
  `user_role` tinyint(4) NOT NULL DEFAULT 0 COMMENT '角色',
  `status` tinyint(1) NOT NULL DEFAULT 1 COMMENT '状态：0:失效，1:启用',
  `create_time` int(11) NOT NULL DEFAULT 0 COMMENT '创建时间',
  `update_time` int(11) NOT NULL DEFAULT 0 COMMENT '更新时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='用户表';

INSERT INTO `users` VALUES (1, 'admin', '$2a$10$3MBlppFjTiqzJKgxP9o5oeVumgI5Bt.FnOn41BMZc7qXFQbI0z1jC', 'https://github.githubassets.com/assets/pull-shark-default-498c279a747d.png', 'coderzzx', 1, 1, UNIX_TIMESTAMP(NOW()), UNIX_TIMESTAMP(NOW()));

ALTER TABLE users ADD github_id varchar(50) NOT NULL DEFAULT '' COMMENT 'github_id';
