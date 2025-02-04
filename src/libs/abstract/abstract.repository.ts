import {
  FindManyOptions,
  FindOneOptions,
  FindOptionsOrder,
  FindOptionsWhere,
  Repository,
} from 'typeorm';
import { PaginationRequestDto } from 'src/libs/dtos/pagination-request.dto';
import { NotFoundException } from '@nestjs/common';
import { AbstractEntity } from './abstract.entity';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

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

export class AbstractRepository<
  TEntity extends AbstractEntity,
> extends Repository<TEntity> {
  constructor(protected readonly entityRepository: Repository<TEntity>) {
    super(
      entityRepository.target,
      entityRepository.manager,
      entityRepository.queryRunner,
    );
  }

  getEntityName(): string {
    return (this.entityRepository.target as Function).name;
  }

  getTableName(): string {
    return this.entityRepository.metadata.tableName;
  }

  async findAndPaginate({
    query,
    ...options
  }: {
    query: PaginationRequestDto;
  } & FindOneOptions<TEntity>): Promise<PaginateData<TEntity>> {
    const limit = Math.min(query.limit, 100);
    const skip = Math.max((query.page - 1) * limit, 0);
    const { page, sortBy = 'createdAt', sortOrder = 'desc' } = query;

    const filters: FindManyOptions<TEntity> = {
      skip,
      take: limit,
      ...options,
    };

    if (sortBy && sortOrder) {
      filters.order = {
        [sortBy]: sortOrder.toUpperCase(),
      } as FindOptionsOrder<TEntity>;
    }

    const [list, total] = await this.entityRepository.findAndCount(filters);
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

  async findOneOrThrow(
    where: FindOptionsWhere<TEntity>,
    options: Omit<FindOneOptions<TEntity>, 'where'>,
  ): Promise<TEntity> {
    const entity = await this.entityRepository.findOne({ ...options, where });

    if (!entity) {
      throw new NotFoundException(`${this.getEntityName()} not found!`);
    }

    return entity;
  }

  async findOneAndUpdateOrThrow(
    where: FindOptionsWhere<TEntity>,
    updateData: QueryDeepPartialEntity<TEntity>,
    options: Omit<FindOneOptions<TEntity>, 'where'>,
  ): Promise<TEntity> {
    if (updateData.hasOwnProperty('id')) delete updateData['id'];

    const queryBuilder = this.entityRepository.createQueryBuilder();

    const entity = (
      await queryBuilder
        .update()
        .where(
          `id IN (SELECT id FROM ${this.getTableName()} WHERE ${Object.keys(
            where,
          )
            .map((key) => `${key} = :${key}`)
            .join(' AND ')} LIMIT 1)`,
          where,
        )
        .set(updateData)
        .returning(options?.select ? Object.keys(options.select) : '*')
        .execute()
    ).raw[0];

    if (!entity) {
      throw new NotFoundException(`${this.getEntityName()} not found!`);
    }

    return entity;
  }

  async findOneAndDeleteOrThrow(
    where: FindOptionsWhere<TEntity>,
    options: Omit<FindOneOptions<TEntity>, 'where'>,
  ): Promise<TEntity> {
    const queryBuilder = this.entityRepository.createQueryBuilder();

    const entity = (
      await queryBuilder
        .softDelete()
        .where(
          `id IN (SELECT id FROM ${this.getTableName()} WHERE ${Object.keys(
            where,
          )
            .map((key) => `${key} = :${key}`)
            .join(' AND ')} LIMIT 1)`,
          where,
        )
        .returning(options?.select ? Object.keys(options.select) : '*')
        .execute()
    ).raw[0];

    if (!entity) {
      throw new NotFoundException(`${this.getEntityName()} not found!`);
    }

    return entity;
  }
}
