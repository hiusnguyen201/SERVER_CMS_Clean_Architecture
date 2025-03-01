import { USER_TYPE } from '@core/domain/user/constant/UserConstant';

export type CreateUserEntityPayload = {
  id?: string;
  name: string;
  email: string;
  password: string;
  phone: string;
  type: USER_TYPE;
  address?: string;
  isVerified: boolean;
  verifiedAt?: Date;
  createdAt?: Date;
  editedAt?: Date;
  removedAt?: Date;
};
