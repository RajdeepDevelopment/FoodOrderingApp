const Order = require('../Modules/orderModule'); // Import the Order model

async function getOrderData(req, res) {
    let orderData = [];
    let query = req?.query;
    let filter = {};
    let sortObj = {};
    if (query?.status) filter.status = query.status;
    if (query?.belngto) filter.belngto = query.belngto;
    if (query?.name) filter.name = query.name;
    if (query?.id) filter.id = query.id;
    if (query?.DeliveryReq) filter.DeliveryReq = query?.DeliveryReq?? "";
    if (query?.totalAmount) filter.totalAmount = query.totalAmount;
    if (query._sort && (query._order === 'asc' || query._order === 'desc')) {
        sortObj.sort = {
            [query._sort]: query._order === 'asc' ? 1 : -1
        };
        orderData = query?.skip && query?.limit ?
            await Order.find(filter).sort(sortObj.sort).skip(query.skip).limit(query.limit) :
            await Order.find(filter).sort(sortObj.sort);
    } else {
        orderData = await Order.find(filter).skip(query?.skip ?? 0).limit(query?.limit ?? 20);
    }
    res.json(orderData);
    console.log("getOrder");
}
async function targetOrderData(req, res) {
    const params = req.params.slug;
    try {
        const targetOrder = await Order.find({_id: params});
        res.status(200).json(targetOrder.length>0?targetOrder[0]:{});
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

async function postOrderData(req, res) {
    try {
        const newOrder = new Order(req.body);
        const savedOrder = await newOrder.save();
        res.status(201).json(savedOrder);
    } catch (error) {
        console.error("Error saving order:", error);
        res.status(500).json({ error: "Error saving order" });
    }
}

 async function updateOrderData(req, res) {
    try {
        const orderId = req.params.id;
        const updatedOrderData = req.body;
        const updatedOrder = await Order.findByIdAndUpdate(orderId, updatedOrderData, { new: true });
        res.json(updatedOrder);
    } catch (error) {
        console.error("Error updating order:", error);
        res.status(500).json({ error: "Error updating order" });
    }
}
 
 async function deleteOrderData(req, res) {
    try {
        const orderId = req.params.id;
        await Order.findByIdAndDelete(orderId);
        res.json({ message: "Order deleted successfully" });
    } catch (error) {
        console.error("Error deleting order:", error);
        res.status(500).json({ error: "Error deleting order" });
    }
}

module.exports = [getOrderData, postOrderData, updateOrderData, deleteOrderData,targetOrderData];
