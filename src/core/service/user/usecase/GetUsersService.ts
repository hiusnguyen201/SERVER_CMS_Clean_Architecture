import { CoreAssert } from '@core/common/assert/CoreAssert';
import { Code } from '@core/common/code/Code';
import { Exception } from '@core/common/exception/Exception';
import { User } from '@core/domain/user/entity/User';
import { UserRepositoryPort } from '@core/domain/user/port/repository/UserRepositoryPort';
import { GetUsersPort } from '@core/domain/user/port/usecase/GetUsersPort';
import { GetUsersUseCase } from '@core/domain/user/usecase/GetUsersUseCase';
import { UserUseCaseDto } from '@core/domain/user/usecase/dto/UserUseCaseDto';

export class GetUsersService implements GetUsersUseCase {
  constructor(private readonly userRepository: UserRepositoryPort) {}

  public async execute(payload: GetUsersPort): Promise<UserUseCaseDto[]> {
    const users: User[] = await this.userRepository.findUsers({});
    CoreAssert.isTrue(
      users.length > 0,
      Exception.new({ code: Code.ENTITY_NOT_FOUND, overrideMessage: 'User not found' }),
    );

    return UserUseCaseDto.newListFromUsers(users);
  }
}
