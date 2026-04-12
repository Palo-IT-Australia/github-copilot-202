import { randomUUID } from 'crypto';
import { User, CreateUserDto, UpdateUserDto, PaginationOptions, PagedResult, Role } from './types';

const store = new Map<string, User>();

function findById(id: string): User | undefined {
  return store.get(id);
}

function findByEmail(email: string): User | undefined {
  for (const user of store.values()) {
    if (user.email === email) return user;
  }
  return undefined;
}

function create(dto: CreateUserDto): User {
  if (findByEmail(dto.email)) {
    throw new Error(`Email ${dto.email} is already in use`);
  }
  const user: User = {
    id: randomUUID(),
    name: dto.name,
    email: dto.email,
    role: dto.role ?? 'viewer',
    createdAt: new Date(),
    active: true,
  };
  store.set(user.id, user);
  return user;
}

function update(id: string, dto: UpdateUserDto): User {
  const user = findById(id);
  if (!user) throw new Error(`User ${id} not found`);
  if (dto.email && dto.email !== user.email && findByEmail(dto.email)) {
    throw new Error(`Email ${dto.email} is already in use`);
  }
  const updated: User = { ...user, ...dto };
  store.set(id, updated);
  return updated;
}

function deactivate(id: string): User {
  const user = findById(id);
  if (!user) throw new Error(`User ${id} not found`);
  const updated: User = { ...user, active: false };
  store.set(id, updated);
  return updated;
}

function list(options: PaginationOptions, roleFilter?: Role): PagedResult<User> {
  let users = [...store.values()].filter(u => u.active);
  if (roleFilter) {
    users = users.filter(u => u.role === roleFilter);
  }
  const total = users.length;
  const start = (options.page - 1) * options.pageSize;
  const data = users.slice(start, start + options.pageSize);
  return { data, total, page: options.page, pageSize: options.pageSize };
}

function remove(id: string): void {
  if (!store.has(id)) throw new Error(`User ${id} not found`);
  store.delete(id);
}

export const UserService = {
  findById,
  findByEmail,
  create,
  update,
  deactivate,
  list,
  remove,
};
