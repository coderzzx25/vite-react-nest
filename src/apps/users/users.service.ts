import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from '../entities/users.entity';
import { ICreateUserBody, ISelectUserBody, IUpdateUserBody } from './users.interface';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private readonly usersRepository: Repository<Users>,
  ) {}

  async getUserInfoByUserAccount(userAccount: string): Promise<Users | null> {
    return await this.usersRepository.findOne({ where: { userAccount } });
  }

  async getUserListService(selectInfo: ISelectUserBody): Promise<{ data: Users[]; total: number }> {
    const { page, size, userAccount, userName, userRole, status } = selectInfo;

    const userQuery = this.usersRepository
      .createQueryBuilder('users')
      .select([
        'users.id',
        'users.userAccount',
        'users.userName',
        'users.userAvatar',
        'users.userRole',
        'users.status',
        'users.createTime',
        'users.updateTime',
      ]);

    if (userAccount) {
      userQuery.andWhere('users.userAccount like :userAccount', {
        userAccount: `%${userAccount}%`,
      });
    }

    if (userName) {
      userQuery.andWhere('users.userName like :userName', {
        userName: `%${userName}%`,
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

  async getUserByUserAccountService(userAccount: string): Promise<Users | null> {
    return await this.usersRepository.findOne({ where: { userAccount } });
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
