const express = require("express");
const ProductRouter = require("./Routers/productRouter");
const ReviewRouter = require("./Routers/reviewRouter");
const ApplyRouter = require("./Routers/ApplyJobRouter");
const CartRouter = require("./Routers/cartRouter");
const userRouter = require("./Routers/userRouter");
const orderRouter = require("./Routers/orderRouter");
const restaurantRouter = require("./Routers/restaurantRouter");
const notificationRouter = require("./Routers/notificationRouter");
const eventObjectDataRouter = require("./Routers/eventObjectDataRouter");
const OutForDeliveryRouter = require("./Routers/OutForDeliveryRouter")

const mongoose = require('mongoose');
const cors = require("cors");
const App = express();
async function main() {
    await mongoose.connect('mongodb+srv://RajdeeepsadhuDB:Ws3VSJwMVoYWWLST@cluster0.z1akzwi.mongodb.net/FoodOrderingDB');
}
main().catch(err => console.log("Mongoose connecting Error"));

App.use(express.json());
App.use(cors());

App.use("/productssection",ProductRouter);
App.use("/reviewsection", ReviewRouter);
App.use("/applyjob", ApplyRouter);
App.use("/cartsection", CartRouter);
App.use("/usersection", userRouter);
App.use("/ordersection", orderRouter);
App.use("/restaurantsection", restaurantRouter);
App.use("/notificationsection",notificationRouter)
App.use("/EventObjectSection",eventObjectDataRouter);
App.use("/OutForDeliverySection",OutForDeliveryRouter)




App.listen(8000, () => {
    console.log("Server Started");
});