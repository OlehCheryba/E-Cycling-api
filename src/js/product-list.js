export default class {
  constructor(div, cart) {
    fetch('products')
      .then(response => response.json())
      .then(response => {
        this.productsArr = response;
        response.forEach(el => this.renderItem(el));
      });
    this.div = div;
    this.cart = cart;
    this.addEventListeners();
  }
  renderItem(el) {
    this.div.innerHTML +=
     `<div class="product" id=${el._id}>
        <a class="image-link" href="#"><img src="img/products/${el.fileName}" alt="Фото товару"></a>
        <a href="#">${el.name}</a>
        <b>${el.price}$</b> 
        <section>
          <i class="fas fa-cart-plus buy fa-lg"></i>
        </section>
      </div>`;
  }
  addEventListeners() {
    this.div.on('click', event => {
      if(event.target.classList.contains('buy')) {
        this.cart.addItem(event.target.parentNode.parentNode.id);
      }
    });
  }
}