$('#section-constructor-form').on('submit', e => {
  e.preventDefault();
  fetch('addOrder', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: $(`#section-constructor-form #name`).prop('value'),
      number: $(`#section-constructor-form #number`).prop('value'),
      typeMotor: $(`#section-constructor-form #type-motor`).prop('value'),
      typeBattery: $(`#section-constructor-form #type-battery`).prop('value'),
      sizeWheel: $(`input[name='size-wheel']:checked`).prop('value'),
      widthWheel: $(`input[name='width-wheel']:checked`).prop('value'),
      charger: $(`input[name='charger']`).prop('checked'),
      doublePendant: $(`input[name='double-pendant']`).prop('checked'),
      wings: $(`input[name='wings']`).prop('checked'),
      coment: $(`textarea[name='coment']`).prop('value')
    })
  })
    .then(() => alert('Ми вам зателефонуємо'), () => alert('Виникла помилка. Спробуйте пізніше.'))
    $('#section-constructor-form').reset();
});
$('#section-question-form').on('submit', e => {
  e.preventDefault();
  fetch('callMe', {
    method: 'POST',
    headers:{
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      number: $('#CallMeNumber').prop('value')
    })
  })
    .then(() => alert('Ми вам зателефонуємо'), () => alert('Виникла помилка. Спробуйте пізніше.'))
  $('#section-question-form').reset();
});