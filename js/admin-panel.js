class AdminPanel {
  constructor(productList, div) {
    this.div = div;
    this.productList = productList
    this.addAutorization();
  }
  async prepareAdminPanel() {
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
    this.renderAdminPanel(results);
  }
  renderAdminPanel(results) {
    this.div.innerHTML =
      `<form id='ownerFormAdd'>
        <input type='file' name='filetoupload' id='filetoupload'>
        <input id='addBikeName' type='text' class='form-control' placeholder='Назва товару' required>
        <input id='addBikePrice' type='text' class='form-control' placeholder='Ціна товару' required>
        <input id='addBikeDescription' class='form-control' type='text' placeholder='Oпис товару' required>
        <br>
        <input type='submit' class='btn btn-primary' id='ownerButtonAdd' value='Додати товар'>
      </form>
      <form>
        <input id='removeBikeName' class='form-control' type='text' placeholder='Назва товару для видалення' required>
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
    document.querySelector('#delOrders').addEventListener('click', () => this.delSomething('orders.txt'));
    document.querySelector('#delFastOrders').addEventListener('click', () => this.delSomething('fastorders.txt'));
    document.querySelector('#delCallMe').addEventListener('click', () => this.delSomething('callme.txt'));
    document.querySelector('#ownerFormAdd').addEventListener('submit', e => {
      e.preventDefault();
      this.addItem();
    });
    document.querySelector('#ownerButtonRemove').addEventListener('click', e => {
      e.preventDefault();
      this.removeItem();
    });
  }
  addItem() {
    document.querySelector('#ownerFormAdd').append('name', document.querySelector('#addBikeName').value);
    const name = document.querySelector('#addBikeName').value;
    const price = document.querySelector('#addBikePrice').value;
    const description = document.querySelector('#addBikeDescription').value;
    let fileName = document.querySelector('#filetoupload').value.match(/[^\\]+$/);
    const item = {
      name, price, description,
      fileName: fileName ? [0] : 'bike-offroad.jpg'
    };
    this.productList.products[name] = item;

    const form = new FormData(document.querySelector('#ownerFormAdd'))
    form.append('item', JSON.stringify(item))
    /*form.append('name', document.querySelector('#addBikeName').value);
    form.append('price', document.querySelector('#addBikePrice').value);
    form.append('description', document.querySelector('#addBikeDescription').value);
    form.append('fileName', fileName ? [0] : 'bike-offroad.jpg');*/
    fetch('addItem', {
      method: 'POST',
      body: form
    })
      .then(() => this.productList.renderItem(item));
  }
  removeItem() {
    let nameToRemove = document.querySelector('#removeBikeName').value;
    delete this.productList.products[nameToRemove];
    fetch('changeItemList', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        products: this.productList.products
      })
    })
      .then(() => {
        this.productList.div.removeChild(document.getElementById(nameToRemove.replace(/ /g, '-')))
      });
  }
  delSomething(fileName) {
    fetch('delSomething', {
      method:'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        fileName: fileName
      })
    })
      .then(() => this.prepareAdminPanel());
  }
  addAutorization() {
    this.div.innerHTML = 
     `<form id="auto" class="auto">
        <input type="text" id="inpLogin" class="form-control input" placeholder="Логін">
        <input type="password" autocomplete="password" id="inpPassword" class="form-control input" placeholder ="Пароль">
        <input type="submit" class="btn btn-primary" value="Увійти">
      </form>`;
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
        .then(str => str === 'true' ? this.prepareAdminPanel() : alert('Не вірний логін або пароль'));
    });
  }
}