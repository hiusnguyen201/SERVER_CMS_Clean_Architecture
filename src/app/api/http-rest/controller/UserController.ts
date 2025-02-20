import { CoreApiResponse } from '@core/common/api/CoreApiResponse';
import { UserDITokens } from '@core/domain/user/di/UserDITokens';
import { CreateUserUseCase } from '@core/domain/user/usecase/CreateUserUseCase';
import { UserUseCaseDto } from '@core/domain/user/usecase/dto/UserUseCaseDto';
import { GetUsersUseCase } from '@core/domain/user/usecase/GetUsersUseCase';
import { GetUserUseCase } from '@core/domain/user/usecase/GetUserUseCase';
import { Body, Controller, Get, HttpCode, HttpStatus, Inject, Param, Post } from '@nestjs/common';

@Controller('users')
export class UserController {
  constructor(
    @Inject(UserDITokens.CreateUserUseCase)
    private readonly createUserUseCase: CreateUserUseCase,

    @Inject(UserDITokens.GetUserUseCase)
    private readonly getUserUseCase: GetUserUseCase,

    @Inject(UserDITokens.GetUsersUseCase)
    private readonly getUsersUseCase: GetUsersUseCase,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createUser(@Body() body: any) {
    const createdUser: UserUseCaseDto = await this.createUserUseCase.execute(body);
    return CoreApiResponse.success(createdUser);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async getUsers() {
    const users: UserUseCaseDto[] = await this.getUsersUseCase.execute();
    return CoreApiResponse.success(users);
  }

  @Get(':userId')
  @HttpCode(HttpStatus.OK)
  async getUser(@Param('userId') userId: string) {
    const user: UserUseCaseDto = await this.getUserUseCase.execute({ userId });
    return CoreApiResponse.success(user);
  }
}
