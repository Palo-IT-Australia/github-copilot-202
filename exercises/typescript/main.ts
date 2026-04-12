import { UserService } from './user-service';

console.log('=== User Service Demo ===\n');

const alice = UserService.create({ name: 'Alice', email: 'alice@example.com', role: 'admin' });
const bob = UserService.create({ name: 'Bob', email: 'bob@example.com' });
const carol = UserService.create({ name: 'Carol', email: 'carol@example.com', role: 'editor' });

console.log('Created users:');
console.log(UserService.list({ page: 1, pageSize: 10 }));

console.log('\nUpdating Bob to editor role:');
console.log(UserService.update(bob.id, { role: 'editor' }));

console.log('\nDeactivating Carol:');
console.log(UserService.deactivate(carol.id));

console.log('\nActive users (after deactivating Carol):');
console.log(UserService.list({ page: 1, pageSize: 10 }));

console.log('\nFiltered to admins only:');
console.log(UserService.list({ page: 1, pageSize: 10 }, 'admin'));
