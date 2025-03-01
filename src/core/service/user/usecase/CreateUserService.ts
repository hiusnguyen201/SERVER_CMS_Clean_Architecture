import { CoreAssert } from '@core/common/assert/CoreAssert';
import { Code } from '@core/common/code/Code';
import { Exception } from '@core/common/exception/Exception';
import { generateRandomString } from '@core/common/util/common.util';
import { USER_TYPE, UserConstant } from '@core/domain/user/constant/UserConstant';
import { User } from '@core/domain/user/entity/User';
import { UserRepositoryPort } from '@core/domain/user/port/repository/UserRepositoryPort';
import { MailerServicePort } from '@core/domain/user/port/service/MailerServicePort';
import { CreateUserPort } from '@core/domain/user/port/usecase/CreateUserPort';
import { CreateUserUseCase } from '@core/domain/user/usecase/CreateUserUseCase';
import { UserUseCaseDto } from '@core/domain/user/usecase/dto/UserUseCaseDto';

export class CreateUserService implements CreateUserUseCase {
  constructor(
    private readonly userRepository: UserRepositoryPort,
    private readonly mailerService: MailerServicePort,
  ) {}

  public async execute(payload: CreateUserPort): Promise<UserUseCaseDto> {
    const isExistEmail = await this.userRepository.existUser({ email: payload.email });
    CoreAssert.isFalse(isExistEmail, Exception.new({ code: Code.ENTITY_ALREADY_EXISTS }));

    const password = generateRandomString(UserConstant.DEFAULT_RANDOM_PASSWORD_LENGTH);
    const user: User = await User.new({
      name: payload.name,
      email: payload.email,
      password: password,
      phone: payload.phone,
      address: payload.address,
      type: USER_TYPE.USER,
      isVerified: false,
    });

    await this.userRepository.addUser(user);

    this.mailerService.sendUserPassword(payload.email, password);

    return UserUseCaseDto.newFromUser(user);
  }
}
