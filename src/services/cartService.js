const CART_KEY = "swiftcart_cart";

function getCart() {
  const cart = localStorage.getItem(CART_KEY);
  return cart ? JSON.parse(cart) : [];
}

function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

function addItem(product) {
  const cart = getCart();
  const existing = cart.find((item) => item.id === product.id);
  let newCart;
  if (existing) {
    newCart = cart.map((item) =>
      item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
    );
  } else {
    newCart = [...cart, { ...product, quantity: 1 }];
  }
  saveCart(newCart);
  return newCart;
}

function removeItem(id) {
  const cart = getCart();
  const newCart = cart.filter((item) => item.id !== id);
  saveCart(newCart);
  return newCart;
}

function updateQuantity(id, quantity) {
  const cart = getCart();
  const newCart = cart
    .map((item) =>
      item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item
    )
    .filter((item) => item.quantity > 0);
  saveCart(newCart);
  return newCart;
}

function clearCart() {
  saveCart([]);
  return [];
}

function getTotal() {
  const cart = getCart();
  return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
}

export default {
  getCart,
  addItem,
  removeItem,
  updateQuantity,
  clearCart,
  getTotal,
};
