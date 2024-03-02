const Notification = require("../Modules/notificationModule");
const [successResponse, errorResponse] = require("../Controllers/Responser/Wrapper");

async function getNotificationData(req, res) {
    try {
        let notifications = [];
        let query = req.query; 
        let filter = {};
        let sortObj = {};

        if (query.status) {
            filter.status = query.status;
        }

        if (query.for) {
            filter.for = query.for; 
        }

        if (query._sort && (query._order === 'asc' || query._order === 'desc')) {
            sortObj.sort = {
                [query._sort]: query._order === 'asc' ? 1 : -1
            };
        }

        if (query._sort && (query._order === 'asc' || query._order === 'desc')) {
            sortObj.sort = {
                [query._sort]: query._order === 'asc' ? 1 : -1
            };
            notifications = query?.skip && query?.limit ? 
                await Notification.find(filter).sort(sortObj.sort).skip(query.skip).limit(query.limit) : 
                await Notification.find(filter).sort(sortObj.sort);
        } else {
            notifications = query?.skip && query?.limit ? 
                await Notification.find(filter).skip(query.skip).limit(query.limit) : 
                await Notification.find(filter);
        }        
        console.log(sortObj)
        res.json(successResponse(notifications));
    } catch (err) {
        res.status(500).json(errorResponse({ error: err.message }));
    }
}

async function targetNotificationData(req, res) {
    const params = req.params.slug;
    try {
        const targetNotification = await Notification.find({ _id: params });
        res.status(200).json(targetNotification.length > 0 ? targetNotification[0] : {});
    } catch (err) {
        res.status(500).json(errorResponse({ error: err.message }));
    }
}

async function getSearchNotification(req, res) {
    const query = req.query;
    if (query?.q) {
        const keyword = query.q;
        const schemaPaths = Object.keys(Notification.schema.paths).filter(field => {
            const instance = Notification.schema.paths[field].instance;
            return instance === 'String';
        });     
        const regexConditions = schemaPaths.map((field) => (
            { [field]: { $regex: keyword, $options: 'i' } }
        ));
        try {
            const results = await Notification.find({ $or: regexConditions });
            res.json(successResponse(results));
        } catch (error) {
            console.error(error);
            res.json(errorResponse({ error: "Failed to search notifications" }));
        }
    } else {
        try {
            const Notifications = await Notification.find({}).skip(0).limit(10);
            res.json(successResponse(Notifications));
        } catch (error) {
            console.error(error);
            res.json(errorResponse({ error: "Failed to fetch notifications" }));
        }
    }
}

async function postNotificationData(req, res) {
    const notification = new Notification(req.body);

    try {
        const newNotification = await notification.save();
        res.status(201).json(successResponse(newNotification));
    } catch (err) {
        res.status(400).json(errorResponse({ error: err.message }));
    }
}

async function updateNotificationData(req, res) {
    try {
        const updatedNotification = await Notification.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        res.json(successResponse(updatedNotification));
    } catch (err) {
        res.status(400).json(errorResponse({ error: err.message }));
    }
}

async function deleteNotificationData(req, res) {
    try {
        await Notification.findByIdAndDelete(req.params.id);
        res.json(successResponse({ message: "Notification deleted" }));
    } catch (err) {
        res.status(500).json(errorResponse({ error: err.message }));
    }
}

module.exports = [getNotificationData, postNotificationData, updateNotificationData, deleteNotificationData, targetNotificationData, getSearchNotification];
