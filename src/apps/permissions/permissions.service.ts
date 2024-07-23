import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Permissions } from '../entities/permissions.entity';
import { Repository } from 'typeorm';
import { ISelectPermissionParams, ICreatePermissionBody, IUpdatePermissionBody } from './permissions.interface';
import { In } from 'typeorm';

@Injectable()
export class PermissionsService {
  constructor(
    @InjectRepository(Permissions)
    private readonly permissionsRepository: Repository<Permissions>,
  ) {}

  async getPermissionListService(selectInfo: ISelectPermissionParams): Promise<{ data: Permissions[]; total: number }> {
    const { page, size, permissionName, status } = selectInfo;
    const menuQuery = this.permissionsRepository.createQueryBuilder('permissions');
    if (permissionName) {
      menuQuery.andWhere('permissions.permissionName like :permissionName', {
        permissionName: `%${permissionName}%`,
      });
    }

    if (status) {
      menuQuery.andWhere('permissions.status = :status', { status });
    }

    menuQuery.orderBy('permissions.id', 'ASC');
    menuQuery.offset((page - 1) * size);
    menuQuery.limit(size);

    const [data, total] = await menuQuery.getManyAndCount();

    return {
      data,
      total,
    };
  }

  /**
   * 根据权限名称获取权限
   * @param permissionName 权限名称
   * @returns 权限信息
   */
  async getPermissionByNameService(permissionName: string): Promise<Permissions | null> {
    const result = await this.permissionsRepository.findOne({ where: { permissionName } });
    return result;
  }

  /**
   * 根据父级ID获取权限
   * @param menuPid 父级ID
   * @returns 权限信息
   */
  async getPermissionByPidService(permissionPid: number): Promise<Permissions | null> {
    const result = await this.permissionsRepository.findOne({ where: { permissionPid } });
    return result;
  }

  /**
   * 根据ID获取权限
   * @param id 权限ID
   * @returns 权限信息
   */
  async getPermissionByIdService(id: number): Promise<Permissions | null> {
    const result = await this.permissionsRepository.findOne({ where: { id } });
    return result;
  }

  /**
   * 创建权限
   * @param createInfo 权限信息
   * @returns 创建结果
   */
  async createPermissionService(createInfo: ICreatePermissionBody) {
    const result = await this.permissionsRepository.save(createInfo);
    return result;
  }

  /**
   * 更新权限
   * @param updateInfo 权限信息
   * @returns 更新结果
   */
  async updatePermissionService(updateInfo: IUpdatePermissionBody) {
    const { id } = updateInfo;
    const result = await this.permissionsRepository.update(id, updateInfo);
    return result;
  }

  /**
   * 根据ID查询权限列表
   * @param ids 权限ID列表
   * @returns 权限列表
   */
  async getPermissionListByIdsService(ids: number[]): Promise<Permissions[]> {
    const result = await this.permissionsRepository.find({ where: { id: In(ids) } });
    return result;
  }

  /**
   * 查询所有权限
   * @returns 权限列表
   */
  async getAllPermissionListService(): Promise<Permissions[]> {
    const result = await this.permissionsRepository.find();
    return result;
  }
}
