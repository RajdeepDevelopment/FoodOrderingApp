const Notification = require("../Modules/notificationModule");

async function getNotificationData(req, res) {
    try {
        let notifications = [];
        let query =req.query; 
        let filter = {};
        let sortObj = {}
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
            notifications = query?.skip && query?.limit ? await Notification.find(filter).sort(sortObj.sort).skip(query.skip).limit(query.limit) : await Notification.find(filter).sort(sortObj.sort);

        } else {
            notifications = query?.skip && query?.limit ? await Notification.find(filter).skip(query.skip).limit(query.limit) : await Notification.find(filter);
        }        
        console.log(sortObj)
        res.json(notifications);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}
async function targetNotificationData(req, res) {
    const params = req.params.slug;
    try {
        const targetNotification = await Notification.find({_id: params});
        res.status(200).json(targetNotification.lenth>0?targetNotification[0]: {});
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

async function postNotificationData(req, res) {
    const notification = new Notification(req.body);

    try {
        const newNotification = await notification.save();
        res.status(201).json(newNotification);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

async function updateNotificationData(req, res) {
    try {
        const updatedNotification = await Notification.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        res.json(updatedNotification);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

async function deleteNotificationData(req, res) {
    try {
        await Notification.findByIdAndDelete(req.params.id);
        res.json({ message: "Notification deleted" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

module.exports = [getNotificationData, postNotificationData, updateNotificationData, deleteNotificationData, targetNotificationData];
