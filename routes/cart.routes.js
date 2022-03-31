const router = require('express').Router();
const cartController = require('../controllers/cart.controller');
const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require('../middlewares/verifyToken');

router.post('/', verifyToken, cartController.create );
router.put('/:id', verifyTokenAndAuthorization, cartController.update);
router.delete('/:id', verifyTokenAndAuthorization, cartController.delete);
router.get('/find/:userId', verifyTokenAndAuthorization, cartController.getCart);
router.get('/', verifyTokenAndAdmin, cartController.getAllCarts);


module.exports = router