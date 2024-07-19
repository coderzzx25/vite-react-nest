import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CoderzzxUsers } from '../entities/users.entity';
import { ICreateUserBody, ISelectUserBody, IUpdateUserBody } from './users.interface';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(CoderzzxUsers)
    private readonly usersRepository: Repository<CoderzzxUsers>,
  ) {}

  async getUserInfoByUserName(userName: string): Promise<CoderzzxUsers | null> {
    return await this.usersRepository.findOne({ where: { userName } });
  }

  async getUserListService(selectInfo: ISelectUserBody): Promise<{ data: CoderzzxUsers[]; total: number }> {
    const { page, size, userName, userNick, userRole, status } = selectInfo;

    const userQuery = this.usersRepository
      .createQueryBuilder('users')
      .select([
        'users.id',
        'users.userName',
        'users.userNick',
        'users.userHead',
        'users.userRole',
        'users.status',
        'users.createTime',
        'users.updateTime',
      ]);

    if (userName) {
      userQuery.andWhere('users.userName like :userName', {
        userName: `%${userName}%`,
      });
    }

    if (userNick) {
      userQuery.andWhere('users.userNick like :userNick', {
        userNick: `%${userNick}%`,
      });
    }

    if (userRole) {
      userQuery.andWhere('users.userRole = :userRole', { userRole });
    }

    if (status) {
      userQuery.andWhere('users.status = :status', { status });
    }

    userQuery.orderBy('users.id', 'ASC');
    userQuery.offset((page - 1) * size);
    userQuery.limit(size);

    const [userList, total] = await userQuery.getManyAndCount();

    return {
      data: userList,
      total,
    };
  }

  async getUserByUserNameService(userName: string): Promise<CoderzzxUsers | null> {
    return await this.usersRepository.findOne({ where: { userName } });
  }

  async createUserService(userInfo: ICreateUserBody) {
    const result = await this.usersRepository.save(userInfo);
    return result;
  }

  async updateUserService(userInfo: IUpdateUserBody) {
    const { id, ...rest } = userInfo;
    const result = await this.usersRepository.update(id, rest);
    return result;
  }
}
