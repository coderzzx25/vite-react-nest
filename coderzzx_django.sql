/*
 Navicat Premium Data Transfer

 Source Server         : 本地
 Source Server Type    : MySQL
 Source Server Version : 50744 (5.7.44)
 Source Host           : localhost:3306
 Source Schema         : coderzzx_django

 Target Server Type    : MySQL
 Target Server Version : 50744 (5.7.44)
 File Encoding         : 65001

 Date: 03/07/2024 07:23:49
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for coderzzx_menus
-- ----------------------------
DROP TABLE IF EXISTS `coderzzx_menus`;
CREATE TABLE `coderzzx_menus` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `menu_name` varchar(50) NOT NULL DEFAULT '' COMMENT '菜单名',
  `menu_icon` varchar(50) NOT NULL DEFAULT '' COMMENT '菜单图标',
  `menu_url` varchar(100) NOT NULL DEFAULT '' COMMENT '菜单地址',
  `menu_pid` int(11) NOT NULL DEFAULT '0' COMMENT '父菜单',
  `status` tinyint(1) NOT NULL DEFAULT '1' COMMENT '状态：0:失效，1:启用',
  `create_time` int(11) NOT NULL DEFAULT '0' COMMENT '创建时间',
  `update_time` int(11) NOT NULL DEFAULT '0' COMMENT '更新时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8 COMMENT='菜单表';

-- ----------------------------
-- Records of coderzzx_menus
-- ----------------------------
BEGIN;
INSERT INTO `coderzzx_menus` (`id`, `menu_name`, `menu_icon`, `menu_url`, `menu_pid`, `status`, `create_time`, `update_time`) VALUES (1, '数据概况', 'AppstoreOutlined', '/dashboard', 0, 1, 1719221558, 1719234032);
INSERT INTO `coderzzx_menus` (`id`, `menu_name`, `menu_icon`, `menu_url`, `menu_pid`, `status`, `create_time`, `update_time`) VALUES (2, '系统设置', 'AppstoreOutlined', '/systems', 0, 1, 1719234161, 1719234161);
INSERT INTO `coderzzx_menus` (`id`, `menu_name`, `menu_icon`, `menu_url`, `menu_pid`, `status`, `create_time`, `update_time`) VALUES (3, '角色管理', 'AppstoreOutlined', '/roles', 2, 1, 1719234664, 1719234664);
INSERT INTO `coderzzx_menus` (`id`, `menu_name`, `menu_icon`, `menu_url`, `menu_pid`, `status`, `create_time`, `update_time`) VALUES (5, '菜单管理', 'AppstoreOutlined', '/menus', 2, 1, 1719370968, 1719370968);
COMMIT;

-- ----------------------------
-- Table structure for coderzzx_permissions
-- ----------------------------
DROP TABLE IF EXISTS `coderzzx_permissions`;
CREATE TABLE `coderzzx_permissions` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `permission_name` varchar(50) NOT NULL DEFAULT '' COMMENT '权限名',
  `permission_value` varchar(50) NOT NULL DEFAULT '' COMMENT '权限值',
  `menu_id` int(11) NOT NULL DEFAULT '0' COMMENT '菜单',
  `status` tinyint(1) NOT NULL DEFAULT '1' COMMENT '状态：0:失效，1:启用',
  `create_time` int(11) NOT NULL DEFAULT '0' COMMENT '创建时间',
  `update_time` int(11) NOT NULL DEFAULT '0' COMMENT '更新时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COMMENT='权限表';

-- ----------------------------
-- Records of coderzzx_permissions
-- ----------------------------
BEGIN;
INSERT INTO `coderzzx_permissions` (`id`, `permission_name`, `permission_value`, `menu_id`, `status`, `create_time`, `update_time`) VALUES (1, '查看角色', 'selectRole', 3, 1, 0, 0);
INSERT INTO `coderzzx_permissions` (`id`, `permission_name`, `permission_value`, `menu_id`, `status`, `create_time`, `update_time`) VALUES (2, '创建角色', 'createRole', 3, 1, 0, 0);
COMMIT;

-- ----------------------------
-- Table structure for coderzzx_roles
-- ----------------------------
DROP TABLE IF EXISTS `coderzzx_roles`;
CREATE TABLE `coderzzx_roles` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `role_name` varchar(50) NOT NULL DEFAULT '' COMMENT '角色名',
  `role_menus` varchar(255) NOT NULL DEFAULT '' COMMENT '角色菜单',
  `role_permissions` varchar(255) NOT NULL DEFAULT '' COMMENT '操作权限',
  `status` tinyint(1) NOT NULL DEFAULT '1' COMMENT '状态：0:失效，1:启用',
  `create_time` int(11) NOT NULL DEFAULT '0' COMMENT '创建时间',
  `update_time` int(11) NOT NULL DEFAULT '0' COMMENT '更新时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 COMMENT='角色表';

-- ----------------------------
-- Records of coderzzx_roles
-- ----------------------------
BEGIN;
INSERT INTO `coderzzx_roles` (`id`, `role_name`, `role_menus`, `role_permissions`, `status`, `create_time`, `update_time`) VALUES (1, '超级管理员', '1,2,3', '1,2', 1, 0, 0);
INSERT INTO `coderzzx_roles` (`id`, `role_name`, `role_menus`, `role_permissions`, `status`, `create_time`, `update_time`) VALUES (4, '用户', '1,2', '1,2', 1, 1719382355, 1719382935);
COMMIT;

-- ----------------------------
-- Table structure for coderzzx_users
-- ----------------------------
DROP TABLE IF EXISTS `coderzzx_users`;
CREATE TABLE `coderzzx_users` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `user_name` varchar(50) NOT NULL DEFAULT '' COMMENT '账户',
  `user_password` varchar(100) NOT NULL DEFAULT '' COMMENT '密码',
  `user_head` varchar(100) NOT NULL DEFAULT '' COMMENT '头像',
  `user_nick` varchar(20) NOT NULL DEFAULT '' COMMENT '别名',
  `user_role` tinyint(11) NOT NULL DEFAULT '0' COMMENT '角色',
  `status` tinyint(1) NOT NULL DEFAULT '1' COMMENT '状态：0:失效，1:启用',
  `create_time` int(11) NOT NULL DEFAULT '0' COMMENT '创建时间',
  `update_time` int(11) NOT NULL DEFAULT '0' COMMENT '更新时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COMMENT='用户表';

-- ----------------------------
-- Records of coderzzx_users
-- ----------------------------
BEGIN;
INSERT INTO `coderzzx_users` (`id`, `user_name`, `user_password`, `user_head`, `user_nick`, `user_role`, `status`, `create_time`, `update_time`) VALUES (2, 'admin', 'pbkdf2_sha256$390000$Lk0flInUvocJ7IvdCiDWVQ$o6fRHUgnxDT9uo5FdJ+9LinZJUgKOu3ad2sffQrTk/A=', 'https://avatars.githubusercontent.com/u/57378405?v=4', 'coderzzx', 1, 1, 1719388513, 1719388513);
INSERT INTO `coderzzx_users` (`id`, `user_name`, `user_password`, `user_head`, `user_nick`, `user_role`, `status`, `create_time`, `update_time`) VALUES (3, 'admin1', 'pbkdf2_sha256$390000$u5K1GZbUffe0VB6fyLHGsT$BqMra9Iod9zrwyXvwamqD12eZzydwIyVeiVt4AtjeYs=', 'https://avatars.githubusercontent.com/u/57378405?v=4', 'coderzzx', 1, 1, 1719388809, 1719388809);
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;
