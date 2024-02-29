const OutForDelivery = require("../Modules/outForDeliveryModule");
async function getOutForDeliveryData(req, res) {
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
    res.json(outForDeliveryData);
}

async function getTargetOutForDeliveryData(req, res) {
    const id  = req.params.slug;
    try {
        const data = await OutForDelivery.find({ DeliveryId: id });
        if (data?.length>0) {
            res.json(data[0]);
        }
        return res.status(404).json({ message: 'Data not found' });

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

async function postOutForDeliveryData(req, res) {
    const newData = new OutForDelivery(req.body);
    try {
        const savedData = await newData.save();
        res.status(201).json(savedData);
    } catch (err) {
        res.status(400).json({ message: err.message });
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
            return res.status(404).json({ message: 'Data not found' });
        }
        res.json(updatedData);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

async function deleteOutForDeliveryData(req, res) {
    const { id } = req.params.slug;
    try {
        const deletedData = await OutForDelivery.findOneAndDelete({ DeliveryId: id });
        if (!deletedData) {
            return res.status(404).json({ message: 'Data not found' });
        }
        res.json({ message: 'Data deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

   module.exports = [getOutForDeliveryData,getTargetOutForDeliveryData, postOutForDeliveryData, updateOutForDeliveryData,deleteOutForDeliveryData]