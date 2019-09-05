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
		});
}

loadItems();
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
		showHide(document.querySelector('#' + event.target.parentNode.id + ' .description'));
		document.querySelector('#' + event.target.parentNode.id + ' .section-our-products-see-more').innerHTML = 
			document.querySelector('#' + event.target.parentNode.id + ' .description').classList.contains('visible') ? 'приховати деталі ▲' : 'більше про товар ▼';
	}
});