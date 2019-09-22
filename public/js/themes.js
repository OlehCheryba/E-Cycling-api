export default button => {
  let ok = localStorage.getItem('ok');
  const bodyClassList = $('body').classList;
  if (ok === 'yes') {
    bodyClassList.add('c-white');
    bodyClassList.add('bg-black');
  }
  button.on('click', () => {
    ok = ok === 'yes' ? 'no' : 'yes';
    bodyClassList.contains('c-white') ? bodyClassList.remove('c-white') : bodyClassList.add('c-white');
    bodyClassList.contains('bg-black') ? bodyClassList.remove('bg-black') : bodyClassList.add('bg-black');
    localStorage.setItem('ok', ok);
  });
}