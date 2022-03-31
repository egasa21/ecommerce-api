const Product = require('../models/Product');

module.exports = {
    // create a new product
    create: async (req, res) =>{
        try {
            const newProduct = new Product(req.body);
            const savedProduct = await newProduct.save();

            res.status(200).json(savedProduct);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    // update a product
    updateProduct : async (req, res) =>{
        try {
            const updatedProduct = await Product.findByIdAndUpdate(
                req.params.id,
                {
                    $set: req.body,
                },
                {new: true}
            );
            res.status(200).json(updatedProduct);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    
    // delete a product
    deleteProduct: async (req, res) =>{
        try {
            await Product.findByIdAndDelete(req.params.id);
            res.status(200).json("Product has been deleted");
        } catch (err) {
            
        }
    },

    // get product by id
    getProduct: async (req, res)=>{
        try {
            const product = await Product.findById(req.params.id);
            res.status(200).json(product);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    // get all products
    getAllProducts : async (req, res) =>{
        try {
            const qNew = req.query.new;
            const qCategory = req.query.category;

            let products;
            if(qNew){
                products = await Product.find().sort({createdAt: -1}).limit(1)
            }else if(qCategory){
                products = await Product.find({
                    categories: {
                        $in: [qCategory],
                    },
                });
            }else{
                products = await Product.find()
            }

            res.status(200).json(products);
        } catch (err) {
            res.status(500);
        }
    }
}