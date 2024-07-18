import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CoderzzxMenus } from '../entities/menus.entity';
import { Repository } from 'typeorm';
import { ISelectMenuParams, ICreateMenuBody, IUpdateMenuBody } from './menus.interface';
import { In } from 'typeorm';
import { async } from 'rxjs';

@Injectable()
export class MenusService {
  constructor(
    @InjectRepository(CoderzzxMenus)
    private readonly menusRepository: Repository<CoderzzxMenus>,
  ) {}

  async getMenuListService(selectInfo: ISelectMenuParams): Promise<{ data: CoderzzxMenus[]; total: number }> {
    const { page, size, menuName, status } = selectInfo;
    const menuQuery = this.menusRepository.createQueryBuilder('menus');
    if (menuName) {
      menuQuery.andWhere('menus.menuName like :menuName', {
        menuName: `%${menuName}%`,
      });
    }

    if (status) {
      menuQuery.andWhere('menus.status = :status', { status });
    }

    menuQuery.orderBy('menus.id', 'ASC');
    menuQuery.offset((page - 1) * size);
    menuQuery.limit(size);

    const [menuList, total] = await menuQuery.getManyAndCount();

    return {
      data: menuList,
      total,
    };
  }

  /**
   * 根据菜单名称获取菜单
   * @param menuName 菜单名称
   * @returns 菜单信息
   */
  async getMenuByNameService(menuName: string): Promise<CoderzzxMenus | null> {
    const result = await this.menusRepository.findOne({ where: { menuName } });
    return result;
  }

  /**
   * 根据父级ID获取菜单
   * @param menuPid 父级ID
   * @returns 菜单信息
   */
  async getMenuByPidService(menuPid: number): Promise<CoderzzxMenus | null> {
    const result = await this.menusRepository.findOne({ where: { menuPid } });
    return result;
  }

  /**
   * 根据ID获取菜单
   * @param id 菜单ID
   * @returns 菜单信息
   */
  async getMenuByIdService(id: number): Promise<CoderzzxMenus | null> {
    const result = await this.menusRepository.findOne({ where: { id } });
    return result;
  }

  /**
   * 创建菜单
   * @param createInfo 菜单信息
   * @returns 创建结果
   */
  async createMenuService(createInfo: ICreateMenuBody) {
    const result = await this.menusRepository.save(createInfo);
    return result;
  }

  /**
   * 更新菜单
   * @param updateInfo 菜单信息
   * @returns 更新结果
   */
  async updateMenuService(updateInfo: IUpdateMenuBody) {
    const { id } = updateInfo;
    const result = await this.menusRepository.update(id, updateInfo);
    return result;
  }

  /**
   * 根据ID查询菜单列表
   * @param ids 菜单ID列表
   * @returns 菜单列表
   */
  async getMenuListByIdsService(ids: number[]): Promise<CoderzzxMenus[]> {
    const result = await this.menusRepository.find({ where: { id: In(ids) } });
    return result;
  }

  /**
   * 查询所有菜单
   * @returns 菜单列表
   */
  async getAllMenuListService(): Promise<CoderzzxMenus[]> {
    const result = await this.menusRepository.find();
    return result;
  }
}
