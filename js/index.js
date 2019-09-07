addThemeSwitcher(document.querySelector('#switch-theme'));
const showHide = elem => elem.classList.contains('hidden') ? elem.classList.remove('hidden') : elem.classList.add('hidden');
const productList = new ProductList();
const adminPanel = new AdminPanel(productList, document.querySelector('#owner-panel'));
document.querySelector('#header-menu-ikon').addEventListener('click', () => showHide(document.querySelector('#header-div')));
document.querySelector('#owner').addEventListener('click', () => showHide(document.querySelector('#owner-panel')));