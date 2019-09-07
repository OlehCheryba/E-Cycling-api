addThemeSwitcher(document.querySelector('#switch-theme'));
const showHide = elem => elem.classList.contains('visible') ? elem.classList.remove('visible') : elem.classList.add('visible');
const productList = new ProductList();
const adminPanel = new AdminPanel(productList);
document.querySelector("#header-menu-ikon").addEventListener('click', () => showHide(document.querySelector('#header-div')));