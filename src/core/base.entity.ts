import {
  CreateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export abstract class BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @CreateDateColumn({ type: 'timestamp', nullable: false })
  public createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', nullable: false })
  public updatedAt: Date;

  @DeleteDateColumn({ type: 'timestamp', nullable: true })
  public deletedAt: Date;
}
