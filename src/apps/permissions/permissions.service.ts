import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { CoderzzxPermissions } from '../entities/permission.entity';
import { ISelectPermissionInfo, ICreatePermissionInfo, IUpdatePermissionInfo } from './permissions.interface';

@Injectable()
export class PermissionsService {
  constructor(
    @InjectRepository(CoderzzxPermissions) private readonly permissionsRepository: Repository<CoderzzxPermissions>,
  ) {}

  async getPermissionListService(
    selectInfo: ISelectPermissionInfo,
  ): Promise<{ data: CoderzzxPermissions[]; total: number }> {
    const { page, size, permissionName, menuId, status } = selectInfo;

    const permissionQuery = this.permissionsRepository.createQueryBuilder('permissions');

    if (permissionName) {
      permissionQuery.andWhere('permissions.permissionName like :permissionName', {
        permissionName: `%${permissionName}%`,
      });
    }

    if (menuId) {
      permissionQuery.andWhere('permissions.menuId = :menuId', { menuId });
    }

    if (status !== undefined) {
      permissionQuery.andWhere('permissions.status = :status', { status });
    }

    permissionQuery.orderBy('permissions.id', 'ASC');
    permissionQuery.offset((page - 1) * size);
    permissionQuery.limit(size);

    const [permissionList, total] = await permissionQuery.getManyAndCount();

    return {
      data: permissionList,
      total,
    };
  }

  /**
   * 根据权限Id获取权限列表
   * @param {Array} ids 权限ID
   * @returns 权限列表
   */
  async getPermissionListByIdsService(ids: number[]): Promise<CoderzzxPermissions[]> {
    const result = await this.permissionsRepository.find({ where: { id: In(ids) } });
    return result;
  }

  /**
   * 根据权限名称和菜单ID获取权限
   * @param {string} permissionName 权限名称
   * @param {number} menuId 菜单ID
   * @returns 权限信息
   */
  async getPermissionByNameAndMenuIdService(
    permissionName: string,
    menuId: number,
  ): Promise<CoderzzxPermissions | null> {
    const result = await this.permissionsRepository.findOne({ where: { permissionName, menuId } });
    return result;
  }

  /**
   * 创建权限
   * @param createInfo 权限信息
   * @returns 创建结果
   */
  async createPermissionService(createInfo: ICreatePermissionInfo) {
    const result = await this.permissionsRepository.save(createInfo);
    return result;
  }

  /**
   * 根据ID获取权限
   * @param id 权限ID
   * @returns 权限信息
   */
  async getPermissionByIdService(id: number): Promise<CoderzzxPermissions | null> {
    const result = await this.permissionsRepository.findOne({ where: { id } });
    return result;
  }

  async updatePermissionService(updateInfo: IUpdatePermissionInfo) {
    const { id, ...updateData } = updateInfo;
    const result = await this.permissionsRepository.update(id, updateData);
    return result;
  }
}
