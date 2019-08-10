const nav = document.querySelector("header nav").style;
document.querySelector("#header-menu-ikon").addEventListener('click', () => {
    nav.display = nav.display === 'block' ? 'none' : 'block';
});
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
    document.querySelector('#auto').style.display = 'block';
});

document.querySelector('#auto').addEventListener("submit", (e) => {
    e.preventDefault();
    fetch('login', {
        method: 'POST',
        headers:{
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            login: document.querySelector('#login').value,
            password: document.querySelector('#login').value
        })
    })
        .then(response => response.text()).then(str => console.log(str))
});