const Restaurant = require('../Modules/restaurantsModule');

async function getRestaurantsData(req, res) {
    try {
        let restaurants = [];
        let query = req.query;
        let filter = {};
        let sortObj = {}
        if (query.for) filter.for = query.for;
        if (query.uid) filter.uid = query.uid;
        if (query.name) filter.name = query.name;
        if (query.logo) filter.logo = query.logo;
        if (query.time) filter.time = query.time;
        if (query.dbAdd) filter.dbAdd = query.dbAdd;
        if (query.id) filter.id = query.id;
        if (query._sort && (query._order === 'asc' || query._order === 'desc')) {
            sortObj.sort = {
                [query._sort]: query._order === 'asc' ? 1 : -1
            };
        }
        if (query._sort && (query._order === 'asc' || query._order === 'desc')) {
            sortObj.sort = {
                [query._sort]: query._order === 'asc' ? 1 : -1
            };
            restaurants = query?.skip && query?.limit ? await Restaurant.find(filter).sort(sortObj.sort).skip(query.skip).limit(query.limit) : await Restaurant.find(filter).sort(sortObj.sort);

        } else {
            restaurants = query?.skip && query?.limit ? await Restaurant.find(filter).skip(query.skip).limit(query.limit) : await Restaurant.find(filter);
        }
        res.json(restaurants);
        console.log("getRestaurantData");
    } catch (err) {
        console.error('Error getting restaurants:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
async function targetRestaurantData(req, res) {
    const params = req.params.slug;
    try {
        const targetRestaurant = await Restaurant.find({_id: params});
        res.status(200).json(targetRestaurant.length >0?targetRestaurant[0]: {});
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

async function postRestaurantData(req, res) {
    try {
        const newRestaurant = req.body;
        const restaurant = new Restaurant(newRestaurant);
        await restaurant.save();
        res.json(restaurant);
        console.log("postRestaurantData");
    } catch (err) {
        console.error('Error adding restaurant:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

async function updateRestaurantData(req, res) {
    try {
        const id = req.body._id;
        const updatedRestaurant = req.body;
        const restaurant = await Restaurant.findByIdAndUpdate(id, updatedRestaurant, { new: true });
        res.json(restaurant);
        console.log("updateRestaurantData");
    } catch (err) {
        console.error('Error updating restaurant:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

async function deleteRestaurantData(req, res) {
    try {
        const id = req.body._id;
        await Restaurant.findByIdAndDelete(id);
        res.json({ message: 'Restaurant deleted successfully' });
        console.log("deleteRestaurantData");
    } catch (err) {
        console.error('Error deleting restaurant:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

module.exports = [getRestaurantsData, postRestaurantData, updateRestaurantData, deleteRestaurantData, targetRestaurantData];
