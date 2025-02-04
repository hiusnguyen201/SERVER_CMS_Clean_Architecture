import { hashSync, compareSync } from 'bcrypt';

export const makeHash = (value: string) => {
  const salt = 10;
  return hashSync(value, salt);
};

export const compareHash = (value: string, hash: string) => {
  return compareSync(value, hash);
};
