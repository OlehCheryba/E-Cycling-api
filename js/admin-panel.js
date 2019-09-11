class AdminPanel {
  constructor(productList, div) {
    this.div = div;
    this.productList = productList;
    this.addAutorization();
  }
  addAutorization() {
    this.div.html(
     `<form id="auto" class="auto">
        <input type="text" id="inpLogin" class="form-control input" placeholder="Логін">
        <input type="password" autocomplete="password" id="inpPassword" class="form-control input" placeholder ="Пароль">
        <input type="submit" class="btn btn-primary" value="Увійти">
      </form>`);
    $('#auto').on('submit', e => {
      e.preventDefault();
      fetch('login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          login: $('#inpLogin').prop('value'),
          password: $('#inpPassword').prop('value')
        })
      })
        .then(response => response.text())
        .then(str => str === 'true' ? this.renderAdminPanel() : alert('Не вірний логін або пароль'));
    });
  }
  renderAdminPanel() {
    this.div.html(
     `<form id='ownerFormAdd'>
        <input type='file' name='filetoupload' id='filetoupload'>
        <input id='addBikeName' type='text' class='form-control' placeholder='Назва товару' required>
        <input id='addBikePrice' type='text' class='form-control' placeholder='Ціна товару' required>
        <input id='addBikeDescription' class='form-control' type='text' placeholder='Oпис товару' required>
        <input type='submit' class='btn btn-primary' value='Додати товар'>
      </form>
      <form id='ownerFormRemove'>
        <input id='removeBikeName' class='form-control' type='text' placeholder='Назва товару для видалення' required>
        <input type='submit' class='btn btn-primary' value='Видалити товар'>
      </form>
      <div>
        Замовлення:
        <table id='orders'></table>
        <button id='delOrders' class='btn btn-primary d-block'>Очистити список замовлень</button>
      </div>
      <div>
        Замовлення по імені товару:
        <table id='fast-orders'></table>
        <button id='delFastOrders' class='btn btn-primary d-block'>Очистити список замовлень по імені товару</button>
      </div>
      <div>
        Передзвоніть мені:
        <table id='call-me'></table>
        <button id='delCallMe' class='btn btn-primary d-block'>Очистити список передзвоніть мені</button>
      </div>`);
    this.prepareTable('getOrders', $('#orders'));
    this.prepareTable('getFastOrders', $('#fast-orders'));
    this.prepareTable('getCallMe', $('#call-me'));
    this.addEventListeners();
  }
  async prepareTable(url, table) {
    const ordersResponse = await fetch(url);
    const orders = await ordersResponse.json();
    let result = '';
    orders.forEach(obj => {
      delete obj._id;
      result += '<tr>';
      for (let el in obj) result += `<td>${obj[el]}</td>`;
      result += '</tr>';
    })
    table.append(result);
  }
  addEventListeners() {
    $('#delOrders').on('click', () => this.delData('orders'));
    $('#delFastOrders').on('click', () => this.delData('fast-orders'));
    $('#delCallMe').on('click', () => this.delData('call-me'));
    $('#ownerFormAdd').on('submit', e => {
      e.preventDefault();
      this.addItem();
    });
    $('#ownerFormRemove').on('submit', e => {
      e.preventDefault();
      this.removeItem();
    });
  }
  addItem() {
    const item = {
      name: $('#addBikeName').prop('value'),
      price: $('#addBikePrice').prop('value'),
      description: $('#addBikeDescription').prop('value'),
      fileName: $('#filetoupload').prop('value') ? $('#filetoupload').prop('value').match(/[^\\]+$/)[0] : 'bike-offroad.jpg'
    };
    const form = new FormData(document.querySelector('#ownerFormAdd'));
    form.append('item', JSON.stringify(item));
    fetch('addItem', {
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      body: form
    })
      .then(() => this.productList.renderItem(item));
  }
  removeItem() {
    const nameToRemove = $('#removeBikeName').prop('value')
    fetch('delItem', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({nameToRemove})
    })
      .then($(`#${nameToRemove.replace(/ /g, '-')}`).remove);
  }
  delData(nameToRemove) {
    console.log(nameToRemove)
    fetch('delData', {
      method:'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({nameToRemove})
    })
      .then(() => $(`#${nameToRemove}`).remove());
  }
}