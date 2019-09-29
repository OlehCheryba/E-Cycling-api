const router     = require('express').Router(),

      homeController = require('../controllers/home');

router.get('/', homeController.index);
router.get('/admin', homeController.admin);
router.get('/login', homeController.login);
router.get('/registration', homeController.registration);
router.get('/our-office', homeController.ourOffice);
router.get('/vacancies', homeController.vacancies);
router.get('/clients', homeController.clients);

module.exports = router;