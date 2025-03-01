import { User } from '@core/domain/user/entity/User';
import { UserRepositoryPort } from '@core/domain/user/port/repository/UserRepositoryPort';
import { GetUsersPort } from '@core/domain/user/port/usecase/GetUsersPort';
import { GetUsersUseCase } from '@core/domain/user/usecase/GetUsersUseCase';
import { UserUseCaseDto } from '@core/domain/user/usecase/dto/UserUseCaseDto';
import { TypeOrmUser } from '@infrastructure/persistence/typeorm/entity/user/TypeOrmUser';
import { FindOptionsWhere, Like } from 'typeorm';

export class GetUsersService implements GetUsersUseCase {
  constructor(private readonly userRepository: UserRepositoryPort) {}

  public async execute(payload: GetUsersPort): Promise<{ totalCount: number; list: UserUseCaseDto[] }> {
    const filters: FindOptionsWhere<TypeOrmUser>[] = [
      { name: Like(`%${payload.keyword}%`) },
      { email: Like(`%${payload.keyword}%`) },
      { phone: Like(`%${payload.keyword}%`) },
    ];

    const totalCount: number = await this.userRepository.countUsers({ where: filters });

    const skip: number = (payload.page - 1) * payload.limit;
    const users: User[] = await this.userRepository.findUsers({
      where: filters,
      take: payload.limit,
      skip: skip,
      order: { [payload.sortBy]: payload.sortOrder },
    });

    return { totalCount: totalCount, list: UserUseCaseDto.newListFromUsers(users) };
  }
}
