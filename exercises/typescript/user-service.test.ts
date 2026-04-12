import { UserService } from './user-service';

describe('UserService', () => {
  beforeEach(() => {
    // each test gets a fresh service via module re-import isn't straightforward
    // with the in-memory store; clear by creating unique emails per test
  });

  test('creates a user with default role of viewer', () => {
    const user = UserService.create({ name: 'Alice', email: 'alice@example.com' });
    expect(user.role).toBe('viewer');
    expect(user.active).toBe(true);
  });

  test('finds a user by id', () => {
    const created = UserService.create({ name: 'Bob', email: 'bob@example.com' });
    const found = UserService.findById(created.id);
    expect(found).toEqual(created);
  });

  test('returns undefined for unknown id', () => {
    expect(UserService.findById('non-existent')).toBeUndefined();
  });

  test('throws when creating a duplicate email', () => {
    UserService.create({ name: 'Carol', email: 'carol@example.com' });
    expect(() =>
      UserService.create({ name: 'Carol 2', email: 'carol@example.com' })
    ).toThrow('already in use');
  });

  // TODO: test update changes name/email/role
  // TODO: test update throws for unknown id
  // TODO: test update throws when new email is already taken
  // TODO: test deactivate sets active to false
  // TODO: test list returns only active users
  // TODO: test list filters by role
  // TODO: test list paginates correctly
  // TODO: test remove deletes a user
  // TODO: test remove throws for unknown id
});
