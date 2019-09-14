class ProductList {
  constructor(div) {
    fetch('products')
      .then(response => response.json())
      .then(response => response.forEach(el => this.renderItem(el)));
    this.div = div;
    this.addEventListeners();
  }
  renderItem(el) {
    this.div.innerHTML +=
     `<div class="product" id=${el.name.replace(/ /g, '-')}>
        <a class="image-link" herf="#"><img src="img/products/${el.fileName}" alt="Фото товару"></a>
        <a href="#">${el.name}</a>
        <b>${el.price}$</b> 
        <div class='description d-none'>${el.description}</div>
        <span class='section-our-products-see-more'>більше про товар ▼</span> 
        <section>
          <i class="fas fa-cart-plus buy fa-lg"></i>
        </section>
      </div>`;
  }
  addEventListeners() {
    this.div.on('click', event => {
      if(event.target.classList.contains('buy')) {
        fetch('fast-orders', {
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
        event.target.innerHTML = $(`#${event.target.parentNode.id} .description`).classList.contains('hidden') 
          ? 'більше про товар ▼' : 'приховати деталі ▲';
      }
    });
  }
}