import { CoreApiResponse } from '@core/common/api/CoreApiResponse';
import { UserDITokens } from '@core/domain/user/di/UserDITokens';
import { CreateUserUseCase } from '@core/domain/user/usecase/CreateUserUseCase';
import { UserUseCaseDto } from '@core/domain/user/usecase/dto/UserUseCaseDto';
import { GetUsersUseCase } from '@core/domain/user/usecase/GetUsersUseCase';
import { GetUserUseCase } from '@core/domain/user/usecase/GetUserUseCase';
import { Body, Controller, Get, HttpCode, HttpStatus, Inject, Param, Post, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { HttpRestApiModelCreateUserBody } from '@app/api/http-rest/controller/documentation/user/HttpRestApiModelCreateUserBody';
import { HttpRestApiResponseUser } from '@app/api/http-rest/controller/documentation/user/HttpRestApiResponseUser';
import { HttpRestApiResponseUsers } from '@app/api/http-rest/controller/documentation/user/HttpRestApiResponseUsers';
import { CreateUserAdapter } from '@infrastructure/adapter/user/CreateUserAdapter';
import { GetUsersAdapter } from '@infrastructure/adapter/user/GetUsersAdapter';
import { HttpRestApiModelGetUsersQuery } from '@app/api/http-rest/controller/documentation/user/HttpRestApiModelGetUsersQuery';

@ApiTags('users')
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

  @Post('/')
  @HttpCode(HttpStatus.CREATED)
  @ApiBearerAuth()
  @ApiResponse({ status: HttpStatus.CREATED, type: HttpRestApiResponseUser })
  async createUser(@Body() body: HttpRestApiModelCreateUserBody): Promise<CoreApiResponse<UserUseCaseDto>> {
    const adapter: CreateUserAdapter = await CreateUserAdapter.new({
      name: body.name,
      email: body.email,
      address: body.address,
      phone: body.phone,
    });

    const createdUser: UserUseCaseDto = await this.createUserUseCase.execute(adapter);
    return CoreApiResponse.success(createdUser);
  }

  @Get('/')
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth()
  @ApiResponse({ status: HttpStatus.OK, type: HttpRestApiResponseUsers })
  async getUsers(
    @Query() query: HttpRestApiModelGetUsersQuery,
  ): Promise<CoreApiResponse<{ list: UserUseCaseDto[]; totalCount: number }>> {
    const adapter: GetUsersAdapter = await GetUsersAdapter.new({
      keyword: query.keyword,
      limit: query.limit,
      page: query.page,
      sortBy: query.sortBy,
      sortOrder: query.sortOrder,
      isVerified: query.status ? query.status === 'verified' : undefined,
    });

    const data: { list: UserUseCaseDto[]; totalCount: number } = await this.getUsersUseCase.execute(adapter);
    return CoreApiResponse.success(data);
  }

  @Get('/:userId')
  @HttpCode(HttpStatus.OK)
  async getUser(@Param('userId') userId: string) {
    const user: UserUseCaseDto = await this.getUserUseCase.execute({ userId });
    return CoreApiResponse.success(user);
  }
}
