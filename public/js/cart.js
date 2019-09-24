export default class {
  constructor(div, counterDiv) {
    this.div = div;
    this.counterDiv = counterDiv;
    this.cart = JSON.parse(localStorage['cart'] || '{}');
    this.addEventListeners();
    this.renderCounter();
  }
  renderCart() {
    this.div.hidden = false;
    let table = '';
    for (let item in this.cart) {
      table += `<tr><td>${item}</td><td>${this.cart[item]}</td><tr>`;
    }
    this.div.find('.cart-body').innerHTML = `<table>${table}<table>` 
  }
  addEventListeners() {
    this.div.find('.close').on('click', () => this.div.hidden = true);
    this.div.find('.clear').on('click', () => this.cleanCard());
    this.div.find('.order').on('click', () => {
      fetch('orders', {
        method: 'POST',
        headers:{
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          number: prompt('Ваш номер телефону:'),
          list: this.cart
        })
      })
        .then(() => alert('Замовлення прийнято'), () => alert('Виникла помилка.'));
      this.div.hidden = true;
      this.cleanCard();
    })
  }
  addItem(id) {
    this.cart[id] = (this.cart[id] || 0) + 1;
    this.saveCart();
    this.renderCounter();
    alert('Товар додано в корзину.');
  }
  saveCart() {
    localStorage['cart'] = JSON.stringify(this.cart);
  }
  cleanCard() {
    this.div.find('table').innerHTML = '';
    this.counterDiv.innerHTML = '0';
    this.cart = {};
    localStorage['cart'] = '{}';
  }
  renderCounter() {
    this.counterDiv.innerHTML = Object.keys(this.cart).length;
  }
}