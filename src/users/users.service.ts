import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { FindOptionsSelect, Repository } from 'typeorm';
import { validate as isValidUUID } from 'uuid';

const SELECTED_FIELDS: FindOptionsSelect<User> = {
  id: true,
  name: true,
  email: true,
  phone: true,
  address: true,
  isVerified: true,
  verifiedAt: true,
  createdAt: true,
  updatedAt: true,
};

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = this.usersRepository.create({
      ...createUserDto,
      isVerified: false,
      verifiedAt: null,
    });
    return this.usersRepository.save(user);
  }

  async findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async findOneById(id: string): Promise<User> {
    if (!id || !isValidUUID(id)) {
      return null;
    }

    return this.usersRepository.findOne({
      where: {
        id,
      },
      select: SELECTED_FIELDS,
    });
  }

  async updateById(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    await this.usersRepository.update(id, updateUserDto);
    return this.findOneById(id);
  }

  async removeById(id: string): Promise<User> {
    await this.usersRepository.softDelete(id);
    return this.findOneById(id);
  }

  async checkExistEmail(email: string): Promise<boolean> {
    const user = await this.usersRepository.findOne({
      where: {
        email,
      },
    });
    return Boolean(user);
  }
}
