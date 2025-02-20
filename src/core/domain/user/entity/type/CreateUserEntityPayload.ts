export type CreateUserEntityPayload = {
  id?: string;
  name: string;
  email: string;
  password: string;
  phone?: string;
  address?: string;
  isVerified: boolean;
  verifiedAt?: Date;
  createdAt?: Date;
  editedAt?: Date;
  removedAt?: Date;
};
