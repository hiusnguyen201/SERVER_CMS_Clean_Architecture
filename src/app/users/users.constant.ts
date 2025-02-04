import { FindOptionsSelect } from 'typeorm/find-options/FindOptionsSelect';
import { User } from './entities/user.entity';

export const SELECTED_USER_FIELDS: FindOptionsSelect<User> = {
  id: true,
  name: true,
  email: true,
  phone: true,
  address: true,
  isVerified: true,
  verifiedAt: true,
  createdAt: true,
  updatedAt: true,
};
