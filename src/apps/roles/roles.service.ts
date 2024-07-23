import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Roles } from '../entities/roles.entity';
import { ICreateRoleService, ISelectRoleBody, IUpdateRoleService } from './roles.interface';

@Injectable()
export class RolesService {
  constructor(@InjectRepository(Roles) private readonly rolesRepository: Repository<Roles>) {}
  /**
   * 根据ID获取角色信息
   * @param id 角色ID
   * @returns 角色信息
   */
  async getRoleByIdService(id: number): Promise<Roles | null> {
    const result = await this.rolesRepository.findOne({ where: { id } });
    return result;
  }

  async getRoleListService(searchInfo: ISelectRoleBody): Promise<{ data: Roles[]; total: number }> {
    const { page, size, roleName, status } = searchInfo;
    const roleQuery = this.rolesRepository.createQueryBuilder('roles');

    if (roleName) {
      roleQuery.andWhere('roles.roleName like :roleName', {
        roleName: `%${roleName}%`,
      });
    }

    if (status) {
      roleQuery.andWhere('roles.status = :status', { status });
    }

    roleQuery.orderBy('roles.id', 'ASC');
    roleQuery.offset((page - 1) * size);
    roleQuery.limit(size);

    const [roleList, total] = await roleQuery.getManyAndCount();

    return {
      data: roleList,
      total,
    };
  }

  async getRoleByNameService(roleName: string): Promise<Roles | null> {
    const result = await this.rolesRepository.findOne({ where: { roleName } });
    return result;
  }

  async createRoleService(roleInfo: ICreateRoleService) {
    const result = await this.rolesRepository.save(roleInfo);
    return result;
  }

  async updateRoleService(roleInfo: IUpdateRoleService) {
    const { id } = roleInfo;
    const result = await this.rolesRepository.update(id, roleInfo);
    return result;
  }

  async getRoleByIdsService(roleIds: number[]): Promise<Roles[]> {
    const result = await this.rolesRepository.find({ where: { id: In(roleIds) } });
    return result;
  }

  async getAllRoleListService(): Promise<Roles[]> {
    const result = await this.rolesRepository.find({ where: { status: 1 } });
    return result;
  }
}
