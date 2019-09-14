class AdminPanel {
  constructor(productList, div) {
    this.div = div;
    this.productList = productList;
    this.addAutorize();
  }
  addAutorize() {
    this.div.innerHTML = 
     `<form id="auto" autocomplete="on">
        <input type="text" id="inpLogin" class="form-control input" placeholder="Логін">
        <input type="password" id="inpPassword" class="form-control input" placeholder ="Пароль">
        <input type="submit" class="btn btn-primary" value="Увійти">
      </form>`;
    $('#auto').on('submit', e => {
      e.preventDefault();
      fetch('login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          login: $('#inpLogin').value,
          password: $('#inpPassword').value
        })
      })
        .then(res => res.text())
        .then(str => str === 'true' ? this.renderAdminPanel() : alert('Не вірний логін або пароль'));
    });
  }
  renderAdminPanel() {
    this.div.innerHTML =
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
      Замовлення:
      <table id='orders'></table>
      <button id='delOrders' class='btn btn-primary d-block'>Очистити список замовлень</button>
      Замовлення по імені товару:
      <table id='fast-orders'></table>
      <button id='delFastOrders' class='btn btn-primary d-block'>Очистити список замовлень по імені товару</button>
      Передзвоніть мені:
      <table id='call-me'></table>
      <button id='delCallMe' class='btn btn-primary d-block'>Очистити список передзвоніть мені</button>`;
    this.prepareTable('orders', $('#orders'));
    this.prepareTable('fast-orders', $('#fast-orders'));
    this.prepareTable('call-me', $('#call-me'));
    this.addEventListeners();
  }
  async prepareTable(url, table) {
    const res = await fetch(url);
    const dataArr = await res.json();
    let result = '';
    dataArr.forEach(obj => {
      delete obj._id;
      result += '<tr>';
      for (let el in obj) result += `<td>${obj[el]}</td>`;
      result += '</tr>';
    })
    table.innerHTML += result;
  }
  addEventListeners() {
    $('#delOrders').on('click', () => this.delData('orders'));
    $('#delFastOrders').on('click', () => this.delData('fast-orders'));
    $('#delCallMe').on('click', () => this.delData('call-me'));
    $('#ownerFormAdd').on('submit', e => {
      e.preventDefault();
      const item = {
        name: $('#addBikeName').value,
        price: $('#addBikePrice').value,
        description: $('#addBikeDescription').value,
        fileName: $('#filetoupload').value ? $('#filetoupload').value.match(/[^\\]+$/)[0] : 'bike-offroad.jpg'
      };
      const form = new FormData(e.target);
      form.append('item', JSON.stringify(item));
      fetch('products', {
        method: 'POST',
        body: form
      });
      e.target.reset()
      this.productList.renderItem(item);
    });
    $('#ownerFormRemove').on('submit', e => {
      e.preventDefault();
      const nameToRemove = $('#removeBikeName').value
      fetch('products', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({nameToRemove})
      });
      e.target.reset();
      $(`#${nameToRemove.replace(/ /g, '-')}`).remove();
    });
  }
  delData(nameToRemove) {
    fetch('data', {
      method:'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({nameToRemove})
    });
    $(`#${nameToRemove}`).remove();
  }
}