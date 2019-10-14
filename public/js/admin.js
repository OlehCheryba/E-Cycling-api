const renderAdminPanel = () => {
  adminPanel.innerHTML =
    `<div class="column">
      <form id='ownerFormAdd'>
        <input type='file' name='filetoupload' id='filetoupload'>
        <input id='addBikeName' type='text' placeholder='Назва товару'>
        <input id='addBikePrice' type='text' placeholder='Ціна товару'>
        <input id='addBikeDescription' type='text' placeholder='Oпис товару'>
        <input type='submit' value='Додати товар'>
      </form>
      <form id='ownerFormRemove'>
        <input id='removeBikeName' type='text' placeholder='Назва товару для видалення' required>
        <input type='submit' value='Видалити товар'>
      </form>
    </div>
    <div class="column">
      Замовлення:
      <table id='orders'></table>
      <button id='del-orders'>Очистити список</button>
      Замовлення з конструкторa:
      <table id='selected-orders'></table>
      <button id='del-selected-orders'>Очистити список</button>
      Передзвоніть мені:
      <table id='call-me'></table>
      <button id='del-call-me'>Очистити список</button>
    <div>`;
  prepareTable('orders', $('#orders'));
  prepareTable('selected-orders', $('#selected-orders'));
  prepareTable('call-me', $('#call-me'));
  addEventListeners();
};
const prepareTable =  (url, table) => {
  fetch(url, {
    method: 'GET',
    headers: {
      "Authorization": localStorage.getItem('accessToken')
    }
  })
    .then(res => res.json())
    .then(dataArr => {
      let result = '';
      dataArr.forEach(obj => {
        result += '<tr>';
        for (let el in obj) result += `<td>${obj[el]}</td>`;
        result += '</tr>';
      })
      table.innerHTML += result;
    });
};
const addEventListeners = () => {
  $('#del-orders').on('click', () => delData('orders'));
  $('#del-selected-orders').on('click', () => delData('selected-orders'));
  $('#del-call-me').on('click', () => delData('call-me'));
  $('#ownerFormAdd').on('submit', e => {
    e.preventDefault();
    const item = {
      name: $('#addBikeName').value,
      price: $('#addBikePrice').value,
      description: $('#addBikeDescription').value,
      fileName: $('#filetoupload').value ? $('#filetoupload').value.match(/[^\\]+$/)[0] : 'bike-offroad.jpg'
    };
    const form = new FormData(e.target)
    form.append('name', item.name)
    form.append('price', item.price)
    form.append('description', item.description)
    form.append('fileName', item.fileName);
    fetch('products', {
      method: 'POST',
      headers: {
        "Authorization": localStorage.getItem('accessToken')
      },
      body: form
    });
    e.target.reset();
  });
  $('#ownerFormRemove').on('submit', e => {
    e.preventDefault();
    //const id = this.productList.productsArr.find(el => el.name === $('#removeBikeName').value)._id;
    fetch('products/' + id, {
      method: 'DELETE',
      headers: {
        "Authorization": localStorage.getItem('accessToken')
      }
    });
    e.target.reset();
  });
};
const delData = nameToRemove => {
  fetch(nameToRemove, {
    method: 'DELETE'
  });
  $(`#${nameToRemove}`).innerHTML = '';
};

const adminPanel = $('#admin-panel');
$('#auto').on('submit', e => {
  e.preventDefault();
  fetch('auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email: $('#inpLogin').value,
      password: $('#inpPassword').value
    })
  })
    .then(res => {
      if (res.status !== 200) throw new Error;
      return res.json();
    })
    .then(res => {
      localStorage.setItem('accessToken', res.accessToken);
      localStorage.setItem('refreshToken', res.refreshToken);
      renderAdminPanel();
    })
    .catch(() => {
      alert('Не вірний логін або пароль');
    });
});