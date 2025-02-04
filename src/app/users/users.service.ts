import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { validate as isValidUUID } from 'uuid';
import { FindOptionsWhere, ILike } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { makeHash } from 'src/libs/utils/bcrypt.util';
import { SELECTED_USER_FIELDS } from './users.constant';
import { GetUsersDto } from './dto/get-users.dto';
import { PaginateData } from 'src/libs/abstract/abstract.repository';
import { UsersRepository } from './users.repository';
import { orderedObject } from 'src/libs/utils/common.util';
import { RedisService } from 'src/libs/modules/redis/redis.service';

@Injectable()
export class UsersService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly redisService: RedisService,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const isExistEmail = await this.checkExistEmail(createUserDto.email);
    if (isExistEmail) {
      throw new ConflictException('Email already exists');
    }

    const user = this.usersRepository.create({
      ...createUserDto,
      password: makeHash(createUserDto.password),
      isVerified: false,
      verifiedAt: null,
    });

    return this.usersRepository.save(user);
  }

  async findAll(query: GetUsersDto): Promise<PaginateData<User>> {
    const cacheKey = `CACHED:USERS:${JSON.stringify(orderedObject(query))}`;

    const cachedData =
      await this.redisService.get<PaginateData<User>>(cacheKey);
    if (cachedData) return cachedData;

    const filter: FindOptionsWhere<User>[] = [];

    if (query.keyword) {
      filter.push({ name: ILike(`%${query.keyword}%`) });
      filter.push({ email: ILike(`%${query.keyword}%`) });
    }

    const result = await this.usersRepository.findAndPaginate({
      query,
      where: filter,
      select: SELECTED_USER_FIELDS,
    });

    await this.redisService.set(cacheKey, result, 10000);
    return result;
  }

  async findOneById(id: string): Promise<User> {
    if (!isValidUUID(id)) return null;
    return this.usersRepository.findOne({
      where: {
        id,
      },
      select: SELECTED_USER_FIELDS,
    });
  }

  async updateById(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const exists = await this.findOneById(id);
    if (!exists) {
      throw new NotFoundException('User not found');
    }
    await this.usersRepository.update(id, updateUserDto);
    return this.findOneById(id);
  }

  async removeById(id: string): Promise<boolean> {
    const exists = await this.findOneById(id);
    if (!exists) {
      throw new NotFoundException('User not found');
    }
    await this.usersRepository.softDelete(id);
    return true;
  }

  async checkExistEmail(email: string): Promise<boolean> {
    const user = await this.usersRepository.findOne({
      where: {
        email,
      },
      select: {
        id: true,
      },
    });
    return Boolean(user);
  }
}
