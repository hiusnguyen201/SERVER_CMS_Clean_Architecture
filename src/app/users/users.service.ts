import { ConflictException, Injectable } from '@nestjs/common';
import { FindOptionsWhere, ILike } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { makeHash } from 'src/libs/utils/bcrypt.util';
import { SELECTED_USER_FIELDS } from './users.constant';
import { GetUsersDto } from './dto/get-users.dto';
import { PaginateData } from 'src/libs/abstract/abstract.repository';
import { UsersRepository } from './users.repository';
import { sortedStringify } from 'src/libs/utils/common.util';
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

    await this.usersRepository.save(user);

    return this.findOneById(user.id);
  }

  async findAll(query: GetUsersDto): Promise<PaginateData<User>> {
    const cacheKey = `CACHED:USERS:${sortedStringify(query)}`;

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
    return this.usersRepository.findOneOrThrow(
      { id },
      {
        select: SELECTED_USER_FIELDS,
      },
    );
  }

  async updateById(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    return this.usersRepository.findOneAndUpdateOrThrow({ id }, updateUserDto, {
      select: SELECTED_USER_FIELDS,
    });
  }

  async removeById(id: string): Promise<User> {
    return this.usersRepository.findOneAndDeleteOrThrow(
      { id },
      {
        select: SELECTED_USER_FIELDS,
      },
    );
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
