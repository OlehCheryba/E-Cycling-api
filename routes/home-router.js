const express = require('express');
const homeController = require('../controllers/home-controller.js');
const homeRouter = express.Router();

homeRouter.get('/', homeController.index);
homeRouter.get('/login', homeController.login);
homeRouter.get('/registration', homeController.registration);
homeRouter.get('/our-office', homeController.ourOffice);
homeRouter.get('/vacancies', homeController.vacancies);
homeRouter.get('/clients', homeController.clients);

module.exports = homeRouter;