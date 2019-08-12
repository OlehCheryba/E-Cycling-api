const nav = document.querySelector("header nav");
const showHide = elem => elem.style.display = elem.style.display === 'block' ? 'none' : 'block';
const loadItems = () => {
    let id = 1;
    fetch('items.html')
        .then(response => response.text())
        .then(html => html.split('\\"').join('"').split('\\n').join('')/*.split('<div ').join('<div id="' + id++ +'" ')*/)
        .then(html => document.querySelector('#section-our-products').innerHTML = html)
        .then(() => {
            document.querySelectorAll('#section-our-products div').forEach(el => el.id = 'item' + id++);
            for (let i = 1; i < id; i++)
                document.querySelector('#item' + i + ' .section-our-products-see-more').addEventListener('click', () => {
                    showHide(document.querySelector('#item' + i + ' .section-our-products-description'));
                    document.querySelector('#item' + i + ' .section-our-products-see-more').innerHTML =
                        document.querySelector('#item' + i + ' .section-our-products-description').style.display === "none" ? 'більше про товар' : 'приховати деталі';
                });
        });
}
const addAdminPanel = () => {
    document.querySelector('#auto').style.display = 'none';
    document.querySelector('#owner').style.display = 'none';
    document.querySelector('footer').innerHTML +=
       `<form>
            <input id="addBikeName" type="text" placeholder="Ім'я товару">
            <br>
            <input id="addBikePrice" type="text" placeholder="Ціна товару">
            <br>
            <input id="addBikeDescription" type="text" placeholder="Oпис товару">
            <br>
            <input type="submit" id="ownerButtonAdd" value="Додати товар">
        </form>
        <form>
            <input id="removeBikeName" type="text" placeholder="Ім'я товару для видалення">
            <br>
            <input type="submit" id="ownerButtonRemove" value="Видалити товар">
        </form>`;
    document.querySelector('#ownerButtonAdd').addEventListener('click', e => {
        e.preventDefault();
        addItem();
    });
    document.querySelector('#ownerButtonRemove').addEventListener('click', e => {
        e.preventDefault();
        removeItem();
    });
}
const addItem = () => {
    const name = document.querySelector('#addBikeName').value,
        price = document.querySelector('#addBikePrice').value,
        description = document.querySelector('#addBikeDescription').value,
        html =
   `<div class='section-our-products-product' name='${name}'>
        <img src='img/bike-offroad.jpg' alt='Велосипед' class='section-our-products-image'>
        <br>
        ${name}
        <br>
        ${price}$
        <img src='img/bookmark.png' alt='Закладка' class='section-our-products-bookmark'>
        <span class='section-our-products-description'>${description}</span>
        <span class='section-our-products-see-more'>більше про товар</span>
    </div>`;
    fetch('addItem', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            html: html
        })
    })
        .then(res => loadItems());
}
const removeItem = () => {
    let nameToRemove = document.querySelector('#removeBikeName').value,
        remove = document.querySelector(`div[name ='${nameToRemove}']`);
    try {
        document.querySelector('#section-our-products').removeChild(remove);
    } catch (e) { alert('Не знайдено товару з таким іменем')}
    fetch('saveItems', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            html: document.querySelector('#section-our-products').innerHTML
        })
    });
}

loadItems();
document.querySelector("#header-menu-ikon").addEventListener('click', () => showHide(nav));
document.querySelector('#owner').addEventListener("click", () => showHide(document.querySelector('#auto')));
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
    });
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
        .then(response => response.text()).then(str => console.log(str));
});
document.querySelector('#auto').addEventListener("submit", (e) => {
    e.preventDefault();
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
        .then(str => str === 'true' ? addAdminPanel() : alert('Не вірний логін або пароль'));
});
