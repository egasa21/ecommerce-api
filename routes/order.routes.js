const router = require('express').Router();
const orderController = require('../controllers/order.controller');
const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require('../middlewares/verifyToken');

router.post('/', verifyToken, orderController.create);
router.put('/:id', verifyTokenAndAdmin, orderController.update);
router.delete('/:id', verifyTokenAndAdmin, orderController.delete);
router.get('/find/:userId', verifyTokenAndAuthorization, orderController.getOrder);
router.get('/', verifyTokenAndAdmin, orderController.getAllOrders);
router.get('/income', verifyTokenAndAdmin, orderController.getMonthlyIncome);




module.exports = router