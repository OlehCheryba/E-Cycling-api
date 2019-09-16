addThemeSwitcher($('.switch-theme'));
const showHide = elem => {
  if (elem instanceof Node) elem.classList.contains('d-none') ? elem.classList.remove('d-none') : elem.classList.add('d-none');
  else Array.from(elem).forEach(el => showHide(el));
};
const cart = new Cart($('#cart-container'));
const productList = new ProductList($('#product-list'), cart);
const adminPanel = new AdminPanel($('#owner-panel'), productList);
$('.open-cart').on('click', () => cart.renderCart());
$('#cart-container').on('click', function(event) {
  if (this === event.target) this.classList.add('d-none');
});
$('#cart-container i').on('click', () => $('#cart-container').classList.add('d-none'));
$('#owner').on('click', () => showHide($('#owner-panel')));
$('header img.menu').on('click', () => showHide($('header div')));