import { DataSource } from 'typeorm';
import { Module, Provider } from '@nestjs/common';
import { UserController } from '@app/api/http-rest/controller/UserController';
import { UserDITokens } from '@core/domain/user/di/UserDITokens';
import { CreateUserService } from '@core/service/user/usecase/CreateUserService';
import { TypeOrmUserRepository } from '@infrastructure/persistence/typeorm/repository/user/TypeOrmUserRepository';
import { GetUserService } from '@core/service/user/usecase/GetUserService';
import { GetUsersService } from '@core/service/user/usecase/GetUsersService';

const persistenceProviders: Provider[] = [
  {
    provide: UserDITokens.UserRepository,
    useFactory: (dataSource: DataSource) => new TypeOrmUserRepository(dataSource),
    inject: [DataSource],
  },
];

const useCaseProviders: Provider[] = [
  {
    provide: UserDITokens.CreateUserUseCase,
    useFactory: (userRepository: TypeOrmUserRepository) => new CreateUserService(userRepository),
    inject: [UserDITokens.UserRepository],
  },
  {
    provide: UserDITokens.GetUsersUseCase,
    useFactory: (userRepository: TypeOrmUserRepository) => new GetUsersService(userRepository),
    inject: [UserDITokens.UserRepository],
  },
  {
    provide: UserDITokens.GetUserUseCase,
    useFactory: (userRepository: TypeOrmUserRepository) => new GetUserService(userRepository),
    inject: [UserDITokens.UserRepository],
  },
];

@Module({
  controllers: [UserController],
  providers: [...persistenceProviders, ...useCaseProviders],
})
export class UserModule {}
