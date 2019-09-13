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

class ProductList {
  constructor(div) {
    fetch('products')
      .then(response => response.json())
      .then(response => response.forEach(el => this.renderItem(el)));
    this.div = div;
    this.addEventListeners();
  }
  renderItem(el) {
    this.div.append(
     `<div class='section-our-products-product' id=${el.name.replace(/ /g, '-')}>
        <img src='img/products/${el.fileName}' alt='Картинка товару' class='section-our-products-image'>
        ${el.name}<br>${el.price}$
        <div class='description hidden'>${el.description}</div>
        <button class='buy btn-primary'>Замовити</button>
        <img src='img/bookmark.png' alt='Закладка' class='section-our-products-bookmark'>
        <span class='section-our-products-see-more'>більше про товар ▼</span>
      </div>`);
  }
  addEventListeners() {
    this.div.on('click', event => {
      if(event.target.classList.contains('buy')) {
        fetch('addOrd', {
          method:'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            productName: event.target.parentNode.id,
            number: prompt('Введіть ваш номер телефону і ми вам зателефонуємо:')
          })
        });
      }
      if (event.target.classList.contains('section-our-products-see-more')) {
        showHide($(`#${event.target.parentNode.id} .description`));
        event.target.innerHTML = $(`#${event.target.parentNode.id} .description`).prop("classList").contains('hidden') 
          ? 'більше про товар ▼' : 'приховати деталі ▲';
      }
    });
  }
}
class AdminPanel {
  constructor(productList, div) {
    this.div = div;
    this.productList = productList;
    this.renderAdminPanel();
  }
  addAutorize() {
    this.div.html(
     `<form id="auto" autocomplete="on">
        <input type="text" id="inpLogin" class="form-control input" placeholder="Логін">
        <input type="password" id="inpPassword" class="form-control input" placeholder ="Пароль">
        <input type="submit" class="btn btn-primary" value="Увійти">
      </form>`);
    $('#auto').on('submit', e => {
      e.preventDefault();
      fetch('login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          login: $('#inpLogin').prop('value'),
          password: $('#inpPassword').prop('value')
        })
      })
        .then(res => res.text())
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
      Замовлення:
      <table id='orders'></table>
      <button id='delOrders' class='btn btn-primary d-block'>Очистити список замовлень</button>
      Замовлення по імені товару:
      <table id='fast-orders'></table>
      <button id='delFastOrders' class='btn btn-primary d-block'>Очистити список замовлень по імені товару</button>
      Передзвоніть мені:
      <table id='call-me'></table>
      <button id='delCallMe' class='btn btn-primary d-block'>Очистити список передзвоніть мені</button>`);
    this.prepareTable('orders', $('#orders'));
    this.prepareTable('fast-orders', $('#fast-orders'));
    this.prepareTable('call-me', $('#call-me'));
    this.addEventListeners();
  }
  async prepareTable(url, table) {
    const res = await fetch(url);
    const dataArr = await res.json();
    let result;
    dataArr.forEach(obj => {
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
      const item = {
        name: $('#addBikeName').prop('value'),
        price: $('#addBikePrice').prop('value'),
        description: $('#addBikeDescription').prop('value'),
        fileName: $('#filetoupload').prop('value') ? $('#filetoupload').prop('value').match(/[^\\]+$/)[0] : 'bike-offroad.jpg'
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
      const nameToRemove = $('#removeBikeName').prop('value')
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
    $(`#${nameToRemove}`)[0].remove();
  }
}
addThemeSwitcher($('#switch-theme'));
const showHide = elem => elem.prop('classList').contains('hidden') ? elem.prop("classList").remove('hidden') : elem.prop("classList").add('hidden');
const productList = new ProductList($('#section-our-products'));
const adminPanel = new AdminPanel(productList, $('#owner-panel'));
$('#header-menu-ikon').on('click', () => showHide($('#header-div')));
$('#owner').on('click', () => showHide($('#owner-panel')));
$('#section-constructor-form').on('submit', e => {
  e.preventDefault();
  fetch('addOrder', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: $(`#section-constructor-form #name`).prop('value'),
      number: $(`#section-constructor-form #number`).prop('value'),
      typeMotor: $(`#section-constructor-form #type-motor`).prop('value'),
      typeBattery: $(`#section-constructor-form #type-battery`).prop('value'),
      sizeWheel: $(`input[name='size-wheel']:checked`).prop('value'),
      widthWheel: $(`input[name='width-wheel']:checked`).prop('value'),
      charger: $(`input[name='charger']`).prop('checked'),
      doublePendant: $(`input[name='double-pendant']`).prop('checked'),
      wings: $(`input[name='wings']`).prop('checked'),
      coment: $(`textarea[name='coment']`).prop('value')
    })
  })
    .then(() => alert('Ми вам зателефонуємо'), () => alert('Виникла помилка. Спробуйте пізніше.'))
    $('#section-constructor-form')[0].reset();
});
$('#section-question-form').on('submit', e => {
  e.preventDefault();
  fetch('callMe', {
    method: 'POST',
    headers:{
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      number: $('#CallMeNumber').prop('value')
    })
  })
    .then(() => alert('Ми вам зателефонуємо'), () => alert('Виникла помилка. Спробуйте пізніше.'))
  $('#section-question-form')[0].reset();
});