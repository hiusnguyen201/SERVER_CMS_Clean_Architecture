export interface CreateUserPort {
  name: string;
  email: string;
  phone: string;
  address?: string;
  typeId?: string;
}
