import { CoreAssert } from '@core/common/assert/CoreAssert';
import { Code } from '@core/common/code/Code';
import { Exception } from '@core/common/exception/Exception';
import { Nullable } from '@core/common/type/CommonTypes';
import { User } from '@core/domain/user/entity/User';
import { UserRepositoryPort } from '@core/domain/user/port/repository/UserRepositoryPort';
import { GetUserPort } from '@core/domain/user/port/usecase/GetUserPort';
import { GetUserUseCase } from '@core/domain/user/usecase/GetUserUseCase';
import { UserUseCaseDto } from '@core/domain/user/usecase/dto/UserUseCaseDto';

export class GetUserService implements GetUserUseCase {
  constructor(private readonly userRepository: UserRepositoryPort) {}

  public async execute(payload: GetUserPort): Promise<UserUseCaseDto> {
    const user: Nullable<User> = await this.userRepository.findUser({ where: { id: payload.userId } });
    CoreAssert.isTrue(!!user, Exception.new({ code: Code.ENTITY_NOT_FOUND, overrideMessage: 'User not found' }));

    return UserUseCaseDto.newFromUser(user);
  }
}
