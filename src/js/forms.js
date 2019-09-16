/*$('section#constructor form').on('submit', function(e) => {
  e.preventDefault();
  fetch('constructor-orders', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: $(`#section-constructor-form #name`).value,
      number: $(`#section-constructor-form #number`).value,
      typeMotor: $(`#section-constructor-form #type-motor`).value,
      typeBattery: $(`#section-constructor-form #type-battery`).value,
      sizeWheel: $(`input[name='size-wheel']:checked`).value,
      widthWheel: $(`input[name='width-wheel']:checked`).value,
      charger: $(`input[name='charger']`).checked,
      doublePendant: $(`input[name='double-pendant']`).checked,
      wings: $(`input[name='wings']`).checked,
      coment: $(`textarea[name='coment']`).value
    })
  })
    .then(() => alert('Замовлення прийняте.'), () => alert('Виникла помилка. Спробуйте пізніше.'))
  this.reset();
});*/
$('section#question form').on('submit', function(e) {
  e.preventDefault();
  fetch('call-me', {
    method: 'POST',
    headers:{
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      number: this.number.value
    })
  })
    .then(() => alert('Ми вам зателефонуємо.'), () => alert('Виникла помилка.'))
  this.reset();
});