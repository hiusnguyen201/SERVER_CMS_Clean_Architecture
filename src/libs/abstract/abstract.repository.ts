import {
  FindManyOptions,
  FindOneOptions,
  FindOptionsOrder,
  Repository,
} from 'typeorm';
import { PaginationRequestDto } from 'src/libs/dtos/pagination-request.dto';

export type PaginateData<TEntity> = {
  meta: {
    page: number;
    limit: number;
    totalCount: number;
    offset: number;
    totalPage: number;
    isNext: boolean;
    isPrevious: boolean;
    isFirst: boolean;
    isLast: boolean;
  };
  list: TEntity[];
};

export class AbstractRepository<TEntity> extends Repository<TEntity> {
  constructor(protected readonly entityRepository: Repository<TEntity>) {
    super(
      entityRepository.target,
      entityRepository.manager,
      entityRepository.queryRunner,
    );
  }

  async findAndPaginate({
    query,
    ...filterQuery
  }: {
    query: PaginationRequestDto;
  } & FindOneOptions<TEntity>): Promise<PaginateData<TEntity>> {
    const limit = Math.min(query.limit, 100);
    const skip = Math.max((query.page - 1) * limit, 0);
    const { page, sortBy, sortOrder } = query;

    const options: FindManyOptions<TEntity> = {
      skip,
      take: limit,
      ...filterQuery,
    };

    if (sortBy && sortOrder) {
      options.order = {
        [sortBy]: sortOrder.toUpperCase(),
      } as FindOptionsOrder<TEntity>;
    }

    const [list, total] = await this.entityRepository.findAndCount(options);
    const totalPage = Math.ceil(total / limit);
    return {
      meta: {
        page,
        limit,
        totalCount: total,
        offset: skip,
        totalPage,
        isNext: page < totalPage,
        isPrevious: page > 1,
        isFirst: page > 1 && page <= totalPage,
        isLast: page >= 1 && page < totalPage,
      },
      list,
    };
  }
}
