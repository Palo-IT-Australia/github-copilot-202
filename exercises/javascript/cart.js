const TAX_RATE = 0.1;

const DISCOUNT_TIERS = [
  { min: 100, discount: 0.05 },
  { min: 200, discount: 0.10 },
  { min: 500, discount: 0.20 },
];

function createCart() {
  return { items: [], coupon: null };
}

function addItem(cart, product, quantity) {
  const existing = cart.items.find(i => i.product.id === product.id);
  if (existing) {
    existing.quantity += quantity;
  } else {
    cart.items.push({ product, quantity });
  }
  return cart;
}

function removeItem(cart, productId) {
  cart.items = cart.items.filter(i => i.product.id !== productId);
  return cart;
}

function subtotal(cart) {
  return cart.items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );
}

function applyVolumneDiscount(amount) {
  const tier = [...DISCOUNT_TIERS].reverse().find(t => amount >= t.min);
  return tier ? amount * (1 - tier.discount) : amount;
}

function applyCoupon(amount, coupon) {
  if (!coupon) return amount;
  if (coupon.type === 'percent') return amount * (1 - coupon.value / 100);
  if (coupon.type === 'fixed') return Math.max(0, amount - coupon.value);
  return amount;
}

function calculateTax(amount) {
  return parseFloat((amount * TAX_RATE).toFixed(2));
}

function checkout(cart) {
  let amount = subtotal(cart);
  amount = applyVolumneDiscount(amount);
  amount = applyCoupon(amount, cart.coupon);
  const tax = calculateTax(amount);
  const total = parseFloat((amount + tax).toFixed(2));

  return {
    subtotal: subtotal(cart),
    discountedSubtotal: amount,
    tax,
    total,
    itemCount: cart.items.reduce((n, i) => n + i.quantity, 0),
  };
}

function setCoupon(cart, coupon) {
  cart.coupon = coupon;
  return cart;
}

module.exports = {
  createCart,
  addItem,
  removeItem,
  subtotal,
  checkout,
  setCoupon,
};
