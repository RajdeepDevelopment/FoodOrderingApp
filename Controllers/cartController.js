const Cart = require('../Modules/cartModule');

async function getCart(req, res) {
    try {
        let cart = [];
        let query = req.query;
        let filter = {};
        let sortObj = {};
        if (query?.Size) filter.Size = query.Size;
        if (query?.userid) filter.userid = query.userid;
        if (query?.spic) filter.spic = query.spic;
        if (query?.Cheese) filter.Cheese = query.Cheese;
        if (query?.quantity) filter.quantity = query.quantity;
        if (query?.item?.name) {
            if (query?.item?.id) filter.item.id = query?.item?.id;
            if (query?.item?.name) filter.item.name = query?.item.name;
            if (query?.item?.description) filter.item.description = query.item.description;
            if (query?.item?.price) filter.item.price = query.item.price;
            if (query.item.discountPercentage) filter.item.discountPercentage = query.item.discountPercentage;
            if (query.item.rating) filter.item.rating = query.item.rating;
            if (query.item.ingredients) filter.item.ingredients = query.item.ingredients;
            if (query.item.uid) filter.item.uid = query.item.uid;
            if (query.item.restaurantName) filter.item.restaurantName = query.item.restaurantName;
            if (query.item.thumbnail) filter.item.thumbnail = query.item.thumbnail;
            if (query.item.images) filter.item.images = query.item.images;
            if (query.item.highlights) filter.item.highlights = query.item.highlights;
            if (query.item.city) filter.item.city = query.item.city;
            if (query.item.cuisine) filter.item.cuisine = query.item.cuisine;
            if (query.item.category) filter.item.category = query.item.category;
            if (query.item.priceRange) filter.item.priceRange = query.item.priceRange;
            if (query.item.VisibleStatus) filter.item.VisibleStatus = query.item.VisibleStatus;
            if (query.item.index) filter.item.index = query.item.index;
        }
        if (query?.time) filter.time = query?.time;
        if (query?.id) filter.id = query?.id;
        if (query._sort && (query._order === 'asc' || query._order === 'desc')) {

            sortObj.sort = {
                [query._sort]: query._order === 'asc' ? 1 : -1
            };
            cart = query?.skip && query?.limit ? await Cart.find(filter).sort(sortObj.sort).skip(query.skip).limit(query.limit) : await Cart.find(filter).sort(sortObj.sort);

        } else {
            cart = await Cart.find(filter).skip(query?.skip ?? 0).limit(query?.limit ?? 20)
        }
        res.json(cart);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
async function targetCart(req, res) {
    const params = req.params.slug;
    try {
        const targetCart = await Cart.find({_id: params});
        res.status(200).json(targetCart.length>0 ?targetCart[0]: {});
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

async function postCart(req, res) {
    try {
        console.log(req.body)
        const newCart = new Cart(req.body);
        const savedCart = await newCart.save();
        res.json(savedCart);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

async function updateCart(req, res) {
    try {
        const cartId = req.body._id;
        const update = req.body;
        const updatedCart = await Cart.findByIdAndUpdate(cartId, update, { new: true });
        res.json(updatedCart);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

async function deleteCart(req, res) {
    try {
        const cartId = req.params.id;
        const deletedCart = await Cart.findByIdAndDelete(cartId);
        res.json(deletedCart);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

module.exports = [getCart, postCart, updateCart, deleteCart,targetCart];