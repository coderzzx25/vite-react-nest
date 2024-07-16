import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CoderzzxRoles } from '../entities/roles.entity';

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
}
