class ProductList {
  constructor(div) {
    fetch('getProducts')
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