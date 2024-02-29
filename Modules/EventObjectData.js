const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const detailsSchema = new Schema({
    itemId: Number,
    itemName: String,
    otherInfo: String
});

const actionSchema = new Schema({
    actionType: String,
    timestamp: Number,
    Time: String,
    details: detailsSchema
});

const eventObjectDataShema= mongoose.Schema({

    actions: [actionSchema],
    id: String

})
const EventObjectData = mongoose.model('EventObjectData', eventObjectDataShema);
module.exports = EventObjectData;