const User = require("../Modules/userModule")
async function getUserData(req, res) {
    try {
        let userData = [];
        let query = req.query;
        let filter = {};
        let sortObj = {};
        if (query["First-name"]) filter["First-name"] = query["First-name"];
        if (query["Last-name"]) filter["Last-name"] = query["Last-name"];
        if (query?.phone) filter.phone = query.phone;
        if (query["address-1"]) filter["address-1"] = query["address-1"];
        if (query["address-2"]) filter["address-2"] = query["address-2"];
        if (query?.city) filter.city = query.city;
        if (query?.country) filter.country = query.country;
        if (query["pin-code"]) filter["pin-code"] = query["pin-code"];
        if (query?.state) filter.state = query.state;
        if (query?.state2) filter.state2 = query.state2;
        if (query?.userid) filter.userid = query.userid;
        if (query?.longitide) filter.longitide = query.longitide;
        if (query?.latitude) filter.latitude = query.latitude;
        if (query?.ValidEmail) filter.ValidEmail = query.ValidEmail;
        if (query?.logo) filter.logo = query.logo;
        if (query?.id) filter.id = query.id;
        if (query?.EmailBox) filter.EmailBox = query.EmailBox;
        if (query?.Access) filter.Access = query.Access;
        if (query?._sort && (query?._order === 'asc' || query?._order === 'desc')) {
            sortObj.sort = {
                [query._sort]: query._order === 'asc' ? 1 : -1
            };
            userData = query?.skip && query?.limit ? await User.find(filter).sort(sortObj.sort).skip(query.skip).limit(query.limit) : await User.find(filter).sort(sortObj.sort);
        } else {
            userData = await User.find(filter).skip(query?.skip ?? 0).limit(query?.limit ?? 20);
        }

        res.json(userData);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
async function targetUserData(req, res) {
    const params = req.params.slug;
  console.log(params)
    try {
        const targetUser = await User.find({_id: params});
        res.status(200).json(targetUser.length>0? targetUser[0]: {});
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

async function postUserData(req, res) {
    try {
        const newUser = new User(req.body);
        const savedUser = await newUser.save();
        res.json(savedUser);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

async function updateUserData(req, res) {
    try {
        const userId = req.body._id;
        const update = req.body;
        const updatedUser = await User.findByIdAndUpdate(userId, update, { new: true });
        res.json(updatedUser);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

async function deleteUserData(req, res) {
    try {
        const userId = req.params.id;
        const deletedUser = await User.findByIdAndDelete(userId);
        res.json(deletedUser);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}



module.exports = [getUserData, postUserData, updateUserData, deleteUserData, targetUserData]