class ProductList {
  constructor(div) {
    this.div = div;
    this.products = {};
    fetch('items.json')
      .then(response => response.json())
      .then(response => {
        this.products = response;
        Object.values(response).forEach(item => this.renderItem(item));
      });
    this.addEventListeners();
  }
  renderItem(el) {
    this.div.innerHTML += 
     `<div class='section-our-products-product' id=${el.name.replace(/ /g, '-')}>
        <img src='img/products/${el.fileName}' alt='Картинка товару' class='section-our-products-image'>
        <br>${el.name}<br>${el.price}$<br>
        <img src='img/bookmark.png' alt='Закладка' class='section-our-products-bookmark'>
        <button class='buy btn-primary'>Замовити</button>
        <p class='description hidden'>${el.description}</p><span class='section-our-products-see-more'>більше про товар ▼</span>
      </div>`;
  }
  addEventListeners() {
    this.div.addEventListener('click', event => {
      if(event.target.nodeName.toLowerCase() === 'button') {
        let number = prompt('Введіть ваш номер телефону і ми вам зателефонуємо:');
        fetch('addOrd', {
          method:'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            productName: event.target.parentNode.id,
            number: number
          })
        });
      }
      if (event.target.classList.contains('section-our-products-see-more')) {
        showHide(event.target.previousSibling);
        event.target.innerHTML = event.target.previousSibling.classList.contains('hidden') 
          ? 'більше про товар ▼' : 'приховати деталі ▲';
      }
    });
  }
}