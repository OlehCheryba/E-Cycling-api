var path = require('path');

const public = path.join(__dirname, '../public/');

module.exports = {
  index: (req, res) => res.sendFile(public + '../public/index.html'),
  login: (req, res) => res.sendFile(public + '../public/login.html'),
  registration: (req, res) => res.sendFile(public + '../public/registration.html'),
  ourOffice: (req, res) => res.sendFile(public + '../public/our-office.html'),
  vacancies: (req, res) => res.sendFile(public + '../public/vacancies.html'),
  clients: (req, res) => res.sendFile(public + 'clients.html')
}