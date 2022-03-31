const router = require('express').Router();
const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require('../middlewares/verifyToken');
const productController = require('../controllers/product.controller');

router.post('/', verifyTokenAndAdmin, productController.create);
router.put('/:id', verifyTokenAndAdmin, productController.updateProduct);
router.delete('/:/id', verifyTokenAndAdmin, productController.deleteProduct);
router.get('/find/:/id', productController.getProduct)
router.get('/', productController.getAllProducts)

module.exports = router