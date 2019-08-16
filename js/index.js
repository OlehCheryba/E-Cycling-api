let ok = localStorage.getItem('ok')
const showHide = elem => elem.classList.contains('visible') ? elem.classList.remove('visible') : elem.classList.add('visible');
const switchTheme = () => {
    ok = ok === 'yes' ? 'no' : 'yes';
    document.querySelector('body').classList.contains('themecol') ? document.querySelector('body').classList.remove('themecol') : document.querySelector('body').classList.add('themecol');
    document.querySelector('main').classList.contains('themebgcol') ? document.querySelector('main').classList.remove('themebgcol') : document.querySelector('main').classList.add('themebgcol');
    document.querySelector('body').classList.contains('themebgcol') ? document.querySelector('body').classList.remove('themebgcol') : document.querySelector('body').classList.add('themebgcol');
    document.querySelector('#switch-theme').innerHTML = ok === 'yes' ? 'Світла тема' : 'Темна тема';
    localStorage.setItem('ok', ok);
}
if (ok === 'yes') {
    document.querySelector("body").classList.add('themecol')
    document.querySelector("main").classList.add('themebgcol')
    document.querySelector("body").classList.add('themebgcol')
    document.querySelector("#switch-theme").innerHTML = 'Світла тема'
}

document.querySelector("#switch-theme").addEventListener('click', switchTheme);
document.querySelector("#header-menu-ikon").addEventListener('click', () => showHide(document.querySelector('#header-div')));
