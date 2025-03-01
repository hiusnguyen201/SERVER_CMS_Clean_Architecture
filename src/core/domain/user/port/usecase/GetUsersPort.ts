export interface GetUsersPort {
  keyword?: string;
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: string;

  isVerified?: boolean;
}
