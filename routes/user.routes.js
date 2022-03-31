const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require('../middlewares/verifyToken');
const userController = require('../controllers/user.controller');
const router = require('express').Router();

// update
router.put('/:id', verifyToken, userController.update);
router.delete('/:id', verifyTokenAndAuthorization, userController.delete);
router.get('/find/:id', verifyTokenAndAdmin, userController.getUser);
router.get('/', userController.getAllUsers);
router.get('/stats', verifyTokenAndAdmin, userController.getUserStats);

module.exports = router