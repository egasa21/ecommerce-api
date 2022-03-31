const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv  = require('dotenv');
const cors = require('cors')

const userRoute = require('./routes/user.routes');
const authRoute = require('./routes/auth.routes');
const productRoute = require('./routes/product.routes');
const cartRoute = require('./routes/cart.routes');
const orderRoute = require('./routes/order.routes');
const stripeRoute = require('./routes/stripe.routes');

dotenv.config()

mongoose
    .connect(process.env.MONGO_URL)
    .then(()=>console.log('Database connected'))
    .catch(err => console.log(err))

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cors())

app.use('/api/users', userRoute);
app.use('/api/auth', authRoute);
app.use('/api/products', productRoute);
app.use('/api/carts', cartRoute);
app.use('/api/orders', orderRoute);
app.use('/api/checkout', stripeRoute);

const PORT = process.env.PORT || 4000;
app.listen(PORT, ()=>{
    console.log('Server running on port 4000');
})