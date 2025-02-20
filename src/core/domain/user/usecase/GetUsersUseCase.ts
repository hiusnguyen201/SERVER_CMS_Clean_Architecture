import { UseCase } from '@core/common/usecase/UseCase';
import { GetUsersPort } from '@core/domain/user/port/usecase/GetUsersPort';
import { UserUseCaseDto } from '@core/domain/user/usecase/dto/UserUseCaseDto';

export interface GetUsersUseCase extends UseCase<GetUsersPort, UserUseCaseDto[]> {}
