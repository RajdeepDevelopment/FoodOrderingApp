const Order = require("../Modules/outForDeliveryModule");
const OutForDelivery = require("../Modules/outForDeliveryModule");
const [successResponse, errorResponse] = require("../Controllers/Responser/Wrapper");
async function getOutForDeliveryData(req, res) {
    try {
        let outForDeliveryData = [];
        let query = req?.query;
        let filter = {};
        let sortObj = {};
        if (query?.for) filter.for = query.for;
        if (query?.DeliveryId) filter.DeliveryId = query.DeliveryId;
        if (query?.totalAmount) filter.totalAmount = query.totalAmount;
        if (query?.OrderPlacedTime) filter.OrderPlacedTime = query.OrderPlacedTime;
        if (query?.customerName) filter.customerName = query.customerName;
        if (query?.currentDelivery) filter.currentDelivery = query.currentDelivery;
        if (query?._sort && (query?._order === 'asc' || query?._order === 'desc')) {
            sortObj.sort = {
                [query._sort]: query._order === 'asc' ? 1 : -1
            };
            outForDeliveryData = query?.skip && query?.limit ?
                await OutForDelivery.find(filter).sort(sortObj.sort).skip(query.skip).limit(query.limit) :
                await OutForDelivery.find(filter).sort(sortObj.sort);
        } else {
            outForDeliveryData = await OutForDelivery.find(filter).skip(query?.skip ?? 0).limit(query?.limit ?? 20);
        }
        res.json(successResponse(outForDeliveryData));
    } catch (error) {
        console.error(error);
        res.json(errorResponse({ error: "Failed to retrieve out for delivery data" }));
    }
}

async function getTargetOutForDeliveryData(req, res) {
    const id = req.params.slug;
    try {
        const data = await OutForDelivery.find({ DeliveryId: id });
        if (data?.length > 0) {
            res.json(successResponse(data[0]));
        } else {
            res.status(404).json(errorResponse({ error: 'Data not found' }));
        }
    } catch (err) {
        res.status(500).json(errorResponse({ error: err.message }));
    }
}

async function getSearchOrders(req, res) {
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
            res.json(successResponse(results));
        } catch (error) {
            console.error(error);
            res.status(400).json(errorResponse({ error: error.message }));
        }
    } else {
        try {
            const Orders = await Order.find({}).skip(0).limit(10);
            res.json(successResponse(Orders));
        } catch (error) {
            console.error(error);
            res.status(400).json(errorResponse({ error: error.message }));
        }
    }
}

async function postOutForDeliveryData(req, res) {
    const newData = new OutForDelivery(req.body);
    try {
        const savedData = await newData.save();
        res.status(201).json(successResponse(savedData));
    } catch (err) {
        res.status(400).json(errorResponse({ error: err.message }));
    }
}

async function updateOutForDeliveryData(req, res) {
    const { id } = req.params;
    try {
        const updatedData = await OutForDelivery.findOneAndUpdate(
            { DeliveryId: id },
            req.body,
            { new: true }
        );
        if (!updatedData) {
            return res.status(404).json(errorResponse({ error: 'Data not found' }));
        }
        res.json(successResponse(updatedData));
    } catch (err) {
        res.status(400).json(errorResponse({ error: err.message }));
    }
}

async function deleteOutForDeliveryData(req, res) {
    const { id } = req.params.slug;
    try {
        const deletedData = await OutForDelivery.findOneAndDelete({ DeliveryId: id });
        if (!deletedData) {
            return res.status(404).json(errorResponse({ error: 'Data not found' }));
        }
        res.json(successResponse({ message: 'Data deleted' }));
    } catch (err) {
        res.status(500).json(errorResponse({ error: err.message }));
    }
}

   module.exports = [getOutForDeliveryData,getTargetOutForDeliveryData, postOutForDeliveryData, updateOutForDeliveryData,deleteOutForDeliveryData, getSearchOrders]