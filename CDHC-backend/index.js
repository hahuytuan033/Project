const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const userRouter = require('./routes/userRoutes');
const productRouter = require('./routes/productRoutes');
const orderRouter = require('./routes/orderRoutes');
const customerRouter = require('./routes/customerRoutes');

dotenv.config();
const app = express();
const port = process.env.PORT || 5000;


app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/users', userRouter);
app.use('/api/products', productRouter);
app.use('/api/orders', orderRouter);
app.use('/api/customers', customerRouter);
mongoose.connect(`mongodb+srv://tuan03:CahMy5oobfAsJtXX@cluster-1.e4bcl8o.mongodb.net/?retryWrites=true&w=majority&appName=Cluster-1`)
  .then(() => {
    console.log("Connect Db success!")
  })
  .catch((err) => {
    console.log(err)
  })

app.listen(port, () => {
  console.log("Server is running in port: " + port);
});
