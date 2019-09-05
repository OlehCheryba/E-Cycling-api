const footer = document.querySelector('#footer');
async function prepareAdminPanel() {
  let results = [];
  const ordersResponse = await fetch('../orders.txt');
  const orders = await ordersResponse.text();
  results.push(orders);
  const fastordersResponse = await fetch('../fastorders.txt');
  const fastorders = await fastordersResponse.text();
  results.push(fastorders);
  const callmeResponse = await fetch('../callme.txt');
  const callme = await callmeResponse.text();
  results.push(callme);
  renderAdminPanel(results);
}
const renderAdminPanel = results => {
  document.querySelector('#adminPanel').innerHTML =
    `<form id='form-files'>
      <input type='file' name='filetoupload' id='filetoupload'>
    </form>
    <form id='ownerFormAdd'>
      <input id='addBikeName' type='text' class='form-control' placeholder='Назва товару'>
      <input id='addBikePrice' type='text' class='form-control' placeholder='Ціна товару'>
      <input id='addBikeDescription' class='form-control' type='text' placeholder='Oпис товару'>
      <br>
      <input type='submit' class='btn btn-primary' id='ownerButtonAdd' value='Додати товар'>
    </form>
    <form>
      <input id='removeBikeName' class='form-control' type='text' placeholder='Назва товару для видалення'>
      <br>
      <input type='submit' class='btn btn-primary' id='ownerButtonRemove' value='Видалити товар'>
    </form>
    Замовлення:
    <br>
    ${results[0].split('\"').join('').split(',').join(' ').split('{').join('<hr>').split('}').join('').split(':').join(' = ')}
    <hr>
    <button id='delOrders' class='btn btn-primary'>Очистити список замовлень</button>
    <br>
    Замовлення по імені товару:
    <br>
    ${results[1].split('\"').join('').split(',').join(' ').split('{').join('<hr>').split('}').join('').split(':').join(' = ')}
    <hr>
    <button id='delFastOrders' class='btn btn-primary'>Очистити список замовлень по імені товару</button>
    <br>
    Передзвоніть мені:
    <br>
    ${results[2].split('\"').join('').split(',').join(' ').split('{').join('<hr>').split('}').join('').split(':').join(' = ')}
    <hr>
    <button id='delCallMe' class='btn btn-primary'>Очистити список передзвоніть мені</button>`;
  document.querySelector('#delOrders').addEventListener('click', () => delSomething('orders.txt'));
  document.querySelector('#delFastOrders').addEventListener('click', () => delSomething('fastorders.txt'));
  document.querySelector('#delCallMe').addEventListener('click', () => delSomething('callme.txt'));
  document.querySelector('#ownerFormAdd').addEventListener('submit', e => e.preventDefault());
  document.querySelector('#ownerFormAdd').addEventListener('submit', e => {
    e.preventDefault();
    addItem();
  });
  document.querySelector('#ownerButtonRemove').addEventListener('click', e => {
    e.preventDefault();
    removeItem();
  });
}
const addItem = () => {
  const name = document.querySelector('#addBikeName').value;
  const price = document.querySelector('#addBikePrice').value;
  const description = document.querySelector('#addBikeDescription').value;
  const fileSrc = document.querySelector('#filetoupload').value;
  let imgSrc = fileSrc.split('\\');
  imgSrc = imgSrc[imgSrc.length - 1];
  if (imgSrc === '') imgSrc = 'bike-offroad.jpg';
  imgSrc = 'img/' + imgSrc;
  products[name] = {
    name: name,
    price: price,
    description: description,
    imgSrc: imgSrc
  };
  fetch('addItem', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      products: products
    })
  })
    .then(_ => {
      fetch('fileupload', {
        method: 'POST',
        body: new FormData(document.querySelector('#form-files'))
      }).then(_ => loadItems());
    });
}
const removeItem = () => {
  let nameToRemove = document.querySelector('#removeBikeName').value;
  delete products[nameToRemove];
  fetch('removeItems', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      products: products
    })
  })
    .then(() => loadItems());
}
const delSomething = file => {
  fetch('delSomething', {
    method:'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      file: file
    })
  })
    .then(_ => prepareAdminPanel());
}

document.querySelector('#owner').addEventListener('click', () => showHide(document.querySelector('#auto')));
document.querySelector('#auto').addEventListener('submit', e => {
  e.preventDefault();
  fetch('login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      login: document.querySelector('#inpLogin').value,
      password: document.querySelector('#inpPassword').value
    })
  })
    .then(response => response.text())
    .then(str => {
      if (str === 'true') {
        footer.removeChild(document.querySelector('#auto'));
        footer.removeChild(document.querySelector('#owner'));
        document.querySelector('#footer').innerHTML += `<div id='adminPanel'></div>`
        prepareAdminPanel();
      } else document.querySelector('#auto').reset();
      alert(str === 'true' ? 'Доброго дня, адміністратор сайту': 'Не вірний логін або пароль');
    });
});