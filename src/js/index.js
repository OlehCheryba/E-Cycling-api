addThemeSwitcher($('#switch-theme'));
const showHide = elem => elem.prop('classList').contains('hidden') ? elem.prop("classList").remove('hidden') : elem.prop("classList").add('hidden');
const productList = new ProductList($('#section-our-products'));
const adminPanel = new AdminPanel(productList, $('#owner-panel'));
$('#header-menu-ikon').on('click', () => showHide($('#header-div')));
$('#owner').on('click', () => showHide($('#owner-panel')));