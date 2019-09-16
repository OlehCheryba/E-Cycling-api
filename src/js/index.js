const show = elem => elem.classList.remove('d-none');
const hide = elem => elem.classList.add('d-none');
const showHide = elem => {
  if (elem instanceof Node) elem.classList.contains('d-none') ? elem.classList.remove('d-none') : elem.classList.add('d-none');
  else Array.from(elem).forEach(elem => showHide(el));
};

addThemeSwitcher($('.switch-theme'));
const cart = new Cart($('#cart-container'));
const productList = new ProductList($('#product-list'), cart);
const adminPanel = new AdminPanel($('#owner-panel'), productList);

$('.open-cart').on('click', () => cart.renderCart());
$('#cart-container').on('click', function(event) {
  if (this === event.target) hide(this);
});
$('#cart-container .close').on('click', () => hide($('#cart-container')));
$('#owner').on('click', () => showHide($('#owner-panel')));
$('header img.menu').on('click', () => showHide($('header div')));