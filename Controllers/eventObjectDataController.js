const EventObjectData = require("../Modules/EventObjectData");
const [successResponse, errorResponse] = require("../Controllers/Responser/Wrapper")

async function getEventObjectData(req, res){
    try {
        let filter = {}
        if(req.query.id){
            filter.id=req.query.id
        }
        if(req.query._id){
            filter._id=req.query._id
        }
        const data = await EventObjectData.find(filter);
        console.log(data)
        res.json(successResponse(data));
    } catch (err) {
        res.status(500).json(errorResponse({ error: err.message }));
    }
}

async function targetEventObjectData(req, res) {
    const params = req.params.slug;
    try {
        const targetCart = await EventObjectData.find({id: params});
        res.status(200).json(successResponse(targetCart?.length> 0 ?targetCart[0]: {}));
    } catch (err) {
        res.status(500).json(errorResponse({ error: err.message }));
    }
}

async function getSearchEventObject(req, res) {
    const query = req.query;
    if (query?.q) {
        const keyword = query.q;
        const schemaPaths = Object.keys(EventObjectData.schema.paths).filter(field => {
            const instance = EventObjectData.schema.paths[field].instance;
            return instance === 'String';
        });     
        const regexConditions = schemaPaths.map((field)=>(
            { [field]: { $regex: keyword, $options: 'i' } }
        ));
        try {
            const results = await EventObjectData.find({ $or: regexConditions });
            res.json(successResponse(results));
        } catch (error) {
            console.error(error);
            res.json(errorResponse([]));
        }
    } else {
        try {
            const EventObjectDatas = await EventObjectData.find({}).skip(0).limit(10);
            res.json(successResponse(EventObjectDatas));
        } catch (error) {
            console.error(error);
            res.json(errorResponse([]));
        }
    }
}

async function postEventObjectData(req, res){
    const eventData = new EventObjectData(req.body);

    try {
        const newEventData = await eventData.save();
        res.status(201).json(successResponse(newEventData));
    } catch (err) {
        res.status(400).json(errorResponse({ error: err.message }));
    }
}

async function updateEventObjectData(req, res){
    try {
        const updatedEventData = await EventObjectData.findByIdAndUpdate(req.body._id, req.body, { new: true });
        console.log(updatedEventData)
        res.json(successResponse(updatedEventData));
    } catch (err) {
        res.status(400).json(errorResponse({ error: err.message }));
    }
}

async function deleteEventObjectData(req, res){
    try {
        await EventObjectData.findByIdAndDelete(req.params.id);
        res.json(successResponse({ message: "Deleted event data" }));
    } catch (err) {
        res.status(500).json(errorResponse({ message: err.message }));
    }
}


module.exports = [getEventObjectData,postEventObjectData, updateEventObjectData,deleteEventObjectData, targetEventObjectData,getSearchEventObject]