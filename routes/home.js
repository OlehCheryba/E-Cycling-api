const homeRouter     = require('express').Router();
const homeController = require('../controllers/home');

homeRouter.get('/', homeController.index);
homeRouter.get('/login', homeController.login);
homeRouter.get('/registration', homeController.registration);
homeRouter.get('/our-office', homeController.ourOffice);
homeRouter.get('/vacancies', homeController.vacancies);
homeRouter.get('/clients', homeController.clients);

module.exports = homeRouter;