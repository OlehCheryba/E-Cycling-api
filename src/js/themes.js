function addThemeSwitcher(button) {
  let ok = localStorage.getItem('ok');
  const bodyClassList = $('body').classList;
  const mainClassList = $('main').classList;
  if (ok === 'yes') {
    bodyClassList.add('c-white');
    bodyClassList.add('bg-black');
    mainClassList.add('bg-black');
    button.innerHTML = 'Світла тема';
  }
  button.on('click', () => {
    ok = ok === 'yes' ? 'no' : 'yes';
    bodyClassList.contains('c-white') ? bodyClassList.remove('c-white') : bodyClassList.add('c-white');
    bodyClassList.contains('bg-black') ? bodyClassList.remove('bg-black') : bodyClassList.add('bg-black');
    mainClassList.contains('bg-black') ? mainClassList.remove('bg-black') : mainClassList.add('bg-black');
    button.innerHTML = ok === 'yes' ? 'Світла тема' : 'Темна тема';
    localStorage.setItem('ok', ok);
  });
}
