class ProductList {
  constructor() {
    this.products = {};
    this.loadItems();
    this.addEventListeners();
  }
  loadItems() {
    fetch('items.json')
      .then(response =>  response.json())
      .then(response => {
        this.products = response;
        document.querySelector('#section-our-products').innerHTML = '';
        for (let i in response) {
          let el = response[i];
          document.querySelector('#section-our-products').innerHTML += 
          `<div class='section-our-products-product' id=${el.name.replace(/ /g, '-')}>
              <img src=${el.imgSrc} alt='Картинка товару' class='section-our-products-image'>
              <br>
              ${el.name}
              <br>
              ${el.price}$
              <br>
              <img src='img/bookmark.png' alt='Закладка' class='section-our-products-bookmark'>
              <button class='buy btn-primary'>Замовити</button>
              <span class='description'>${el.description}</span><span class='section-our-products-see-more'>більше про товар ▼</span>
            </div>`;
        }
      });
  }
  addEventListeners() {
    document.querySelector('#section-our-products').addEventListener('click', event => {
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
        event.target.innerHTML = event.target.previousSibling.classList.contains('visible') 
          ? 'приховати деталі ▲' : 'більше про товар ▼';
      }
    });
  }
}