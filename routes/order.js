const { Router } = require('express');
const orderController = require('../controllers/orderController');
const router = Router();


//The id param is the user id
router.get('/order/:id', orderController.getOrders);
router.post('/order/:id', orderController.checkout);

module.exports = router;