function addThemeSwitcher(button) {
  let ok = localStorage.getItem('ok');
  const bodyClassList = $('body').prop("classList");
  const mainClassList = $('main').prop("classList");
  if (ok === 'yes') {
    bodyClassList.add('themecol');
    bodyClassList.add('themebgcol');
    mainClassList.add('themebgcol');
    button.html('Світла тема');
  }
  button.on('click', () => {
    ok = ok === 'yes' ? 'no' : 'yes';
    bodyClassList.contains('themecol') ? bodyClassList.remove('themecol') : bodyClassList.add('themecol');
    bodyClassList.contains('themebgcol') ? bodyClassList.remove('themebgcol') : bodyClassList.add('themebgcol');
    mainClassList.contains('themebgcol') ? mainClassList.remove('themebgcol') : mainClassList.add('themebgcol');
    button.html(ok === 'yes' ? 'Світла тема' : 'Темна тема');
    localStorage.setItem('ok', ok);
  });
}
