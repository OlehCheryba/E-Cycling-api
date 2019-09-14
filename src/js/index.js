addThemeSwitcher($('.switch-theme'));
const showHide = elem => {
  if (elem instanceof Node) elem.classList.contains('d-none') ? elem.classList.remove('d-none') : elem.classList.add('d-none');
  else Array.from(elem).forEach(el => showHide(el));
};
const productList = new ProductList($('#product-list'));
const adminPanel = new AdminPanel(productList, $('#owner-panel'));
$('#owner').on('click', () => showHide($('#owner-panel')));

$('header img.menu').on('click', () => showHide($('header div')))