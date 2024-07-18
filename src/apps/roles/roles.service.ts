import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CoderzzxRoles } from '../entities/roles.entity';
import { ISelectRoleBody } from './roles.interface';

@Injectable()
export class RolesService {
  constructor(@InjectRepository(CoderzzxRoles) private readonly rolesRepository: Repository<CoderzzxRoles>) {}
  /**
   * 根据ID获取角色信息
   * @param id 角色ID
   * @returns 角色信息
   */
  async getRoleByIdService(id: number): Promise<CoderzzxRoles | null> {
    const result = await this.rolesRepository.findOne({ where: { id } });
    return result;
  }

  async getRoleListService(searchInfo: ISelectRoleBody): Promise<{ data: CoderzzxRoles[]; total: number }> {
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
}
