const nav = document.querySelector("header nav");
const showHide = elem => elem.style.display = elem.style.display === 'block' ? 'none' : 'block';
function loadItems() {
    fetch('items.html')
        .then(response => response.text())
        .then(html => html.split('\\"').join('"'))
        .then(html => document.querySelector('#section-our-products').innerHTML = html)
}
loadItems();
document.querySelector("#header-menu-ikon").addEventListener('click', () => showHide(nav));
document.querySelector("#section-constructor-form").addEventListener('submit', (e) => {
    e.preventDefault();
    fetch('add-order', {
        method: 'POST',
        headers:{
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            name: document.querySelector('#section-constructor-form #name').value,
            number: document.querySelector('#section-constructor-form #number').value,
            typeBike: document.querySelector('#section-constructor-form #type-bike').value,
            typeMotor: document.querySelector('#section-constructor-form #type-motor').value,
            typeBattery: document.querySelector('#section-constructor-form #type-battery').value,
            sizeWheel: document.querySelector('#section-constructor-form input[name="size-wheel"]').value,
            widthWheel: document.querySelector('#section-constructor-form input[name="width-wheel"]').value,
            charger: document.querySelector('#section-constructor-form input[name="charger"]').value,
            doublePendant: document.querySelector('#section-constructor-form input[name="double-pendant"]').value,
            wings: document.querySelector('#section-constructor-form input[name="wings"]').value,
            coment: document.querySelector('#section-constructor-form textarea[name="coment"]').value
        })
    })
});
document.querySelector('#section-question-form').addEventListener('submit', (e) => {
    e.preventDefault();
    fetch('call-me', {
        method: 'POST',
        headers:{
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            number: document.querySelector('#CallMeNumber').value
        })
    })
        .then(response => response.text()).then(str => console.log(str))
});
document.querySelector('#owner').addEventListener("click", () => {
    showHide(document.querySelector('#auto'));
});
document.querySelector('#auto').addEventListener("submit", (e) => {
    e.preventDefault();
    document.querySelector('#auto').style.display = 'none';
    fetch('login', {
        method: 'POST',
        headers:{
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            login: document.querySelector('#inpLogin').value,
            password: document.querySelector('#inpPassword').value
        })
    })
        .then(response => response.text())
        .then(str => {
            if (str == 'true') addAdminPanel();
        })
});
function addAdminPanel() {
    document.querySelector('footer').innerHTML +=
        `<input id="addBikeName" type="text" placeholder="Ім'я товару">
        <br>
        <input id="addBikePrice" type="text" placeholder="Ціна товару">
        <br>
        <button id="ownerButtonAdd">Додати товар</button>
        <br>
        <input id="removeBikeName" type="text" placeholder="Ім'я товару для видалення">
        <br>
        <button id="ownerButtonRemove">Видалити товар</button>`;
    document.querySelector('#ownerButtonAdd').addEventListener('click', () => {
        const name = document.querySelector('#addBikeName').value;
        const price = document.querySelector('#addBikePrice').value;
        const html = "<div class='section-our-products-product' name='" + name + "'><img src='img/bike-offroad.jpg' alt='Велосипед' class='section-our-products-image' name='" + name + "'><br>" + name + "<br>" + price + "$<img src='img/bookmark.png' alt='Закладка' class='section-our-products-bookmark'><a href='#' class='section-our-products-see-more'>більше про товар</a></div>";
        fetch('addItem', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                html: html
            })
        })
            .then(res => {
                loadItems()
            })
    });
    document.querySelector('#ownerButtonRemove').addEventListener('click', () => {
        let nameToRemove = document.querySelector('#removeBikeName').value;
        let remove = document.querySelector(`div[name ='${nameToRemove}']`)
        document.querySelector('#section-our-products').removeChild(remove);
        fetch('saveItems', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                htm: document.querySelector('#section-our-products').innerHTML
            })
        })
    });
}