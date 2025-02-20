import { CoreAssert } from '@core/common/assert/CoreAssert';
import { Code } from '@core/common/code/Code';
import { Exception } from '@core/common/exception/Exception';
import { User } from '@core/domain/user/entity/User';
import { UserRepositoryPort } from '@core/domain/user/port/repository/UserRepositoryPort';
import { CreateUserPort } from '@core/domain/user/port/usecase/CreateUserPort';
import { CreateUserUseCase } from '@core/domain/user/usecase/CreateUserUseCase';
import { UserUseCaseDto } from '@core/domain/user/usecase/dto/UserUseCaseDto';

export class CreateUserService implements CreateUserUseCase {
  constructor(private readonly userRepository: UserRepositoryPort) {}

  public async execute(payload: CreateUserPort): Promise<UserUseCaseDto> {
    const isExistEmail = !!(await this.userRepository.countUsers({ where: { email: payload.email } }));
    CoreAssert.isFalse(isExistEmail, Exception.new({ code: Code.ENTITY_ALREADY_EXISTS }));

    const user: User = await User.new({
      name: payload.name,
      email: payload.email,
      password: payload.password,
      phone: payload.phone,
      address: payload.address,
      isVerified: false,
    });

    await this.userRepository.addUser(user);

    return UserUseCaseDto.newFromUser(user);
  }
}
