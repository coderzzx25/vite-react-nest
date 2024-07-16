import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CoderzzxUsers } from '../entities/users.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(CoderzzxUsers)
    private readonly usersRepository: Repository<CoderzzxUsers>,
  ) {}

  async getUserInfoByUserName(userName: string): Promise<CoderzzxUsers | null> {
    return await this.usersRepository.findOne({ where: { userName } });
  }

  findOne(userName: string): Promise<CoderzzxUsers | null> {
    return this.usersRepository.findOne({ where: { userName } });
  }
}
