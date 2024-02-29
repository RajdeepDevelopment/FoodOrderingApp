const EventObjectData = require("../Modules/EventObjectData");

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
        res.json(data);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}
async function targetEventObjectData(req, res) {
    const params = req.params.slug;
    try {
        const targetCart = await EventObjectData.find({id: params});
        res.status(200).json(targetCart?.length> 0 ?targetCart[0]: {});
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

async function postEventObjectData(req, res){
    const eventData = new EventObjectData(req.body);

    try {
        const newEventData = await eventData.save();
        res.status(201).json(newEventData);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

async function updateEventObjectData(req, res){
    try {
        const updatedEventData = await EventObjectData.findByIdAndUpdate(req.body._id, req.body, { new: true });
        console.log(updatedEventData)
        res.json(updatedEventData);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

async function deleteEventObjectData(req, res){
    try {
        await EventObjectData.findByIdAndDelete(req.params.id);
        res.json({ message: "Deleted event data" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}


module.exports = [getEventObjectData,postEventObjectData, updateEventObjectData,deleteEventObjectData, targetEventObjectData]