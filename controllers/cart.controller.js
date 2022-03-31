const Cart = require('../models/Cart');

module.exports = {
    // create 
    create: async (req, res) =>{
        try {
            const newCart = new Cart(req.body)
            const savedCart = await newCart.save();
            res.status(200).json(savedCart)
        } catch (err) {
            res.status(500).json(err)
        }
    },
    update: async (req, res) =>{
        try {
            const updateCart = await Cart.findByIdAndUpdate(
                req.params.id,
                {
                    $set: req.body,
                },
                {new: true}
            )
            res.status(200).json(updateCart);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    delete: async (req, res) =>{
        try {
            await Cart.findByIdAndDelete(req.params.id);
            res.status(200).json('Cart has been deleted');
        } catch (err) {
            res.status(500).json(err)
        }
    },
    // get user cart
    getCart: async (req, res) =>{
        try {
            const cart = await Cart.findOne({userId: req.params.userId})
            res.status(200).json(cart);
        } catch (error) {
            res.status(500).json(err)
        }
    },
    // get all carts
    getAllCarts: async (req, res) =>{
        try {
            const carts = await Cart.find();
            res.status(200).json(carts);
        } catch (err) {
           res.status(500).json(err)
        }
    }
}