const { Router } = require('express');
const cartController = require('../controllers/cartController');
const router = Router();


//The id param is the user id
router.get('/cart/:id', cartController.getCartItems);
router.post('/cart', cartController.addCartItem);
router.delete('/cart/:id', cartController.deleteItem);


module.exports = router;