import addThemeSwitcher from './themes.js';
import Cart from './cart.js';
import ProductList from './product-list.js';
import AdminPanel from './admin-panel.js';
import './forms.js';

addThemeSwitcher($('.switch-theme'));
const cart = new Cart($('#cart-container'), $('.cart-counter'));
const productList = new ProductList($('#product-list'), cart);
const adminPanel = new AdminPanel($('#owner-panel'), productList);

$('.open-cart').on('click', () => cart.renderCart());
$('#cart-container').on('click', function(event) {
  if (this === event.target) this.hidden = true;
});
$('#owner').on('click', () => $('#owner-panel').hidden = false);