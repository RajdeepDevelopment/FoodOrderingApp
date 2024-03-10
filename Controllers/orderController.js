const Order = require('../Modules/orderModule'); // Import the Order model
const [successResponse, errorResponse] = require("../Controllers/Responser/Wrapper")
exports.getOrderData =  async(req, res)=> {
      /* #swagger.tags = ['Orders']
       #swagger.description = 'This route is used for getting order data'
       #swagger.parameters['status'] = {
           in: 'query',
           type: 'string',
           description: 'Filter by order status'
       }
       #swagger.parameters['belngto'] = {
           in: 'query',
           type: 'string',
           description: 'Filter by owner of the order'
       }
       #swagger.parameters['name'] = {
           in: 'query',
           type: 'string',
           description: 'Filter by name'
       }
       #swagger.parameters['id'] = {
           in: 'query',
           type: 'string',
           description: 'Filter by order ID'
       }
       #swagger.parameters['DeliveryReq'] = {
           in: 'query',
           type: 'string',
           description: 'Filter by delivery requirement'
       }
       #swagger.parameters['totalAmount'] = {
           in: 'query',
           type: 'number',
           description: 'Filter by total amount'
       }
       #swagger.parameters['_sort'] = {
           in: 'query',
           type: 'string',
           description: 'Sort by field'
       }
       #swagger.parameters['_order'] = {
           in: 'query',
           type: 'string',
           description: 'Sort order (\'asc\' or \'desc\')'
       }
       #swagger.parameters['skip'] = {
           in: 'query',
           type: 'integer',
           description: 'Number of items to skip'
       }
       #swagger.parameters['limit'] = {
           in: 'query',
           type: 'integer',
           description: 'Maximum number of items to return'
       }
    */
    try {
        let orderData = [];
        let query = req?.query;
        let filter = {};
        let sortObj = {};
        if (query?.status) filter.status = query.status;
        if (query?.belngto) filter.belngto = query.belngto;
        if (query?.name) filter.name = query.name;
        if (query?.id) filter.id = query.id;
        if (query?.DeliveryReq) filter.DeliveryReq = query?.DeliveryReq ?? "";
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
        res.json(successResponse(orderData));
    } catch (error) {
        console.error(error);
        res.json(errorResponse({ error: "Failed to retrieve order data" }));
    }
    console.log("getOrder");
}
exports.targetOrderData =  async(req, res)=> {
     /* #swagger.tags = ['Orders']
       #swagger.description = 'This route is used for getting a specific order by its ID'
       #swagger.parameters['slug'] = {
           in: 'path',
           type: 'string',
           description: 'ID of the order to retrieve'
       }
    */
    const params = req.params.slug;
    try {
        const targetOrder = await Order.find({ _id: params });
        res.status(200).json(targetOrder.length > 0 ? targetOrder[0] : {});
    } catch (err) {
        res.status(500).json(errorResponse({ error: err.message }));
    }
}
exports.getSearchOrders =  async(req, res)=> {
       /* #swagger.tags = ['Orders']
       #swagger.description = 'This route is used for searching orders'
       #swagger.parameters['q'] = {
           in: 'query',
           type: 'string',
           description: 'Search keyword'
       }
    */
    const query = req.query;
    if (query?.q) {
        const keyword = query.q;
        const schemaPaths = Object.keys(Order.schema.paths).filter(field => {
            const instance = Order.schema.paths[field].instance;
            return instance === 'String';
        });
        const regexConditions = schemaPaths.map((field) => (
            { [field]: { $regex: keyword, $options: 'i' } }
        ));
        try {
            const results = await Order.find({ $or: regexConditions });
            res.json(results);
        } catch (error) {
            console.error(error);
            res.json([]);
        }
    } else {
        try {
            const products = await Order.find({}).skip(0).limit(10);
            res.json(products);
        } catch (error) {
            console.error(error);
            res.json([]);
        }
    }
}
exports.postOrderData =  async(req, res)=> {
    /* #swagger.tags = ['Orders']
       #swagger.description = 'This route is used for creating a new order'
       #swagger.parameters['body'] = {
           in: 'body',
           description: 'Order data',
           required: true,
           schema: {
               "$ref": "#/definitions/OrderData"
           }
       }
       #swagger.responses[201] = {
           description: 'Order successfully created',
           schema: {
               "$ref": "#/definitions/OrderData"
           }
       }
       #swagger.responses[500] = {
           description: 'Error saving order',
           schema: {
               "$ref": "#/definitions/Error"
           }
       }
    */

    try {
        const newOrder = new Order(req.body);
        const savedOrder = await newOrder.save();
        res.status(201).json(successResponse(savedOrder));
    } catch (error) {
        console.error("Error saving order:", error);
        res.status(500).json(errorResponse({ error: "Error saving order" }));
    }
   
}
exports.updateOrderData =  async(req, res)=> {
    try {
        const orderId = req.params.id;
        const updatedOrderData = req.body;
        const updatedOrder = await Order.findByIdAndUpdate(orderId, updatedOrderData, { new: true });
        res.json(successResponse(updatedOrder));
    } catch (error) {
        console.error("Error updating order:", error);
        res.status(500).json(errorResponse({ error: "Error updating order" }));
    }
}
exports.deleteOrderData =  async(req, res)=> {
    try {
        const orderId = req.params.id;
        await Order.findByIdAndDelete(orderId);
        res.json(successResponse({ message: "Order deleted successfully" }));
    } catch (error) {
        console.error("Error deleting order:", error);
        res.status(500).json(errorResponse({ error: "Error deleting order" }));
    }
}

