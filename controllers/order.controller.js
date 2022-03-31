const Order = require('../models/Order');

module.exports = {
    // create 
    create: async (req, res) =>{
        try {
            const newOrder = new Order(req.body)
            const savedOrder = await newOrder.save();
            res.status(200).json(savedOrder);
        } catch (err) {
            res.status(500).json(err)
        }
    },
    update: async (req, res) =>{
        try {
            const updateOrder = await Order.findByIdAndUpdate(
                req.params.id,
                {
                    $set: req.body,
                },
                {new: true}
            )
            res.status(200).json(updateOrder);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    delete: async (req, res) =>{
        try {
            await Order.findByIdAndDelete(req.params.id);
            res.status(200).json('Order has been deleted');
        } catch (err) {
            res.status(500).json(err)
        }
    },
    // get user order
    getOrder: async (req, res) =>{
        try {
            const orders = await Order.find({userId: req.params.userId})
            res.status(200).json(orders);
        } catch (error) {
            res.status(500).json(err)
        }
    },
    // get all orders
    getAllOrders: async (req, res) =>{
        try {
            const orders = await Order.find();
            res.status(200).json(orders);
        } catch (err) {
           res.status(500).json(err)
        }
    },
    getMonthlyIncome: async (req, res) =>{
        try {
            const date = new Date();
            const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
            const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));

            const income = await Order.aggregate([
                { $match: { createdAt: { $gte: previousMonth} } },
                {
                    $project: {
                        month: { $month: "$createdAt"},
                        sales: "$amount",
                    },
                },
                {
                    $group: {
                        _id: "$month",
                        total: {$sum: "$sales"},
                    },
                },
            ]);
            res.status(200).json(income);
            
        } catch (err) {
            res.status(500).json(err)
        }
    }
}