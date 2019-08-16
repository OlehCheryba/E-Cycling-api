let products;
const loadItems = () => {
    fetch('items.json')
        .then(response =>  response.json())
        .then(response => {
            products = response;
            document.querySelector('#section-our-products').innerHTML = '';
            for (let i in response) {
                let el = response[i];
                document.querySelector('#section-our-products').innerHTML += 
                   `<div class='section-our-products-product' id= ${el.name.split(' ').join('')} >
                        <img src=${el.imgSrc} alt='Картинка товару' class='section-our-products-image'>
                        <br>
                        ${el.name}
                        <br>
                        ${el.price}$
                        <br>
                        <button class='buy btn-primary'>Замовити</button>
                        <img src='img/bookmark.png' alt='Закладка' class='section-our-products-bookmark'>
                        <span class='description'>${el.description}</span>
                        <span class='section-our-products-see-more'>більше про товар ▼</span>
                    </div>`;
            }
            for (let i in response) {
                document.querySelector(`#${i.split(' ').join('')} .buy`).addEventListener('click', () => {
                    let number = prompt('Введіть ваш номер телефону і ми вам зателефонуємо:');
                    fetch('addOrd', {
                        method:'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            productName: i,
                            number: number
                        })
                    });
                });
                document.querySelector(`#${i.split(' ').join('')} .section-our-products-see-more`).addEventListener('click', () => {
                    showHide(document.querySelector(`#${i.split(' ').join('')} .description`));
                    document.querySelector(`#${i.split(' ').join('')} .section-our-products-see-more`).innerHTML =
                        document.querySelector(`#${i.split(' ').join('')} .description`).classList.contains('visible') ? 'приховати деталі ▲' : 'більше про товар ▼';
                });
            }
        });
}
loadItems();