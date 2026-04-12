const { createCart, addItem, setCoupon, checkout } = require('./cart');

const cart = createCart();

addItem(cart, { id: 1, name: 'Mechanical Keyboard', price: 120 }, 1);
addItem(cart, { id: 2, name: 'USB-C Hub', price: 45 }, 2);
addItem(cart, { id: 3, name: 'Monitor Stand', price: 35 }, 1);

console.log('=== Cart Demo ===\n');
console.log('Items:');
cart.items.forEach(i => {
  console.log(`  ${i.product.name} x${i.quantity} @ $${i.product.price}`);
});

console.log('\n--- Without coupon ---');
console.log(checkout(cart));

setCoupon(cart, { type: 'percent', value: 10 });
console.log('\n--- With 10% coupon ---');
console.log(checkout(cart));

setCoupon(cart, { type: 'fixed', value: 20 });
console.log('\n--- With $20 fixed coupon ---');
console.log(checkout(cart));
