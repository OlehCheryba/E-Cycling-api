var path = require('path');

const public = path.join(__dirname, '../../public/');

module.exports = {
  index: (req, res) => res.sendFile(public + 'index.html'),
  login: (req, res) => res.sendFile(public + 'login.html'),
  registration: (req, res) => res.sendFile(public + 'registration.html'),
  ourOffice: (req, res) => res.sendFile(public + 'our-office.html'),
  vacancies: (req, res) => res.sendFile(public + 'vacancies.html'),
  clients: (req, res) => res.sendFile(public + 'clients.html')
}