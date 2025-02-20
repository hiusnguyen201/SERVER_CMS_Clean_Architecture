export type EditUserEntityPayload = {
  name?: string;
  password?: string;
  phone?: string;
  address?: string;
  isVerified?: boolean;
  verifiedAt?: Date;
};
