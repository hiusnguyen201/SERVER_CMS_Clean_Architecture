import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('users')
export class TypeOrmUser {
  @PrimaryColumn('uuid')
  public id: string;

  @Column({ length: 150, nullable: false })
  public name: string;

  @Column({ length: 150, unique: true, nullable: false })
  public email: string;

  @Column({ length: 100, nullable: false })
  public password: string;

  @Column({ length: 15, nullable: true })
  public phone: string;

  @Column({ length: 200, nullable: true })
  public address: string;

  @Column({ nullable: false })
  public isVerified: boolean;

  @Column({ type: 'timestamp', nullable: true })
  public verifiedAt: Date;

  @Column({ type: 'timestamp', nullable: false })
  public createdAt: Date;

  @Column({ type: 'timestamp', nullable: true })
  public editedAt: Date;

  @Column({ type: 'timestamp', nullable: true })
  public removedAt: Date;
}
