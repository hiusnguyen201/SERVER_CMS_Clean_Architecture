import { BaseEntity } from 'src/core/base.entity';
import { Column, Entity } from 'typeorm';

@Entity({ name: 'users' })
export class User extends BaseEntity {
  @Column({ length: 100, nullable: false })
  name: string;

  @Column({ length: 150, unique: true, nullable: false })
  email: string;

  @Column({ length: 100, nullable: true })
  password: string;

  @Column({ length: 15, nullable: true })
  phone: string;

  @Column({ length: 200, nullable: true })
  address: string;

  @Column({ nullable: false })
  isVerified: boolean;

  @Column({ type: 'timestamp', nullable: true })
  verifiedAt: Date;
}
