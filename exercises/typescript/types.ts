export type Role = 'admin' | 'editor' | 'viewer';

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  createdAt: Date;
  active: boolean;
}

export interface CreateUserDto {
  name: string;
  email: string;
  role?: Role;
}

export interface UpdateUserDto {
  name?: string;
  email?: string;
  role?: Role;
}

export interface PaginationOptions {
  page: number;
  pageSize: number;
}

export interface PagedResult<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
}
