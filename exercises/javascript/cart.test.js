const { createCart, addItem, removeItem, subtotal, checkout, setCoupon } = require('./cart');

describe('cart', () => {
  test('creates an empty cart', () => {
    const cart = createCart();
    expect(cart.items).toHaveLength(0);
    expect(cart.coupon).toBeNull();
  });

  test('adds a new item to the cart', () => {
    const cart = createCart();
    addItem(cart, { id: 1, name: 'Widget', price: 10 }, 2);
    expect(cart.items).toHaveLength(1);
    expect(cart.items[0].quantity).toBe(2);
  });

  test('increments quantity when adding an existing item', () => {
    const cart = createCart();
    const product = { id: 1, name: 'Widget', price: 10 };
    addItem(cart, product, 2);
    addItem(cart, product, 3);
    expect(cart.items).toHaveLength(1);
    expect(cart.items[0].quantity).toBe(5);
  });

  test('calculates subtotal', () => {
    const cart = createCart();
    addItem(cart, { id: 1, name: 'Widget', price: 25 }, 3);
    expect(subtotal(cart)).toBe(75);
  });

  // TODO: test removeItem
  // TODO: test volume discount tiers (no discount, 5%, 10%, 20%)
  // TODO: test percent coupon
  // TODO: test fixed coupon
  // TODO: test fixed coupon larger than subtotal (should not go negative)
  // TODO: test tax calculation
  // TODO: test checkout total combines discount + coupon + tax correctly
  // TODO: test empty cart checkout
});
