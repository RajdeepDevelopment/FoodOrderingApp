const Product = require("../Modules/ProductsModule")
const mongoose = require("mongoose");
async function getProducts(req, res) {
    try {
        let productData = []
        let query = req.query;
        let filter = {};
        let sortObj = {}
        if (query.name) filter.name = query.name;
        if (query.description) filter.description = query.description;
        if (query.price) filter.price = query.price;
        if (query.discountPercentage) filter.discountPercentage = query.discountPercentage;
        if (query.rating) filter.rating = query.rating;
        if (query.uid) filter.uid = query.uid;
        if (query.restaurantName) filter.restaurantName = query.restaurantName;
        if (query.ingredients) filter.ingredients = query.ingredients;
        if (query.thumbnail) filter.thumbnail = query.thumbnail;
        if (query.images) filter.images = query.images;
        if (query.highlights) filter.highlights = query.highlights;
        if (query.cuisine) filter.cuisine = query.cuisine;
        if (query.city) filter.city = query.city;
        if (query.category) filter.category = query.category;
        if (query.priceRange) filter.priceRange = query.priceRange;
        if (query.visibleStatus) filter.visibleStatus = Boolean(query.visibleStatus);
        if (query._sort && (query._order === 'asc' || query._order === 'desc')) {
            sortObj.sort = {
                [query._sort]: query._order === 'asc' ? 1 : -1
            };
        }

        if (query._sort && (query._order === 'asc' || query._order === 'desc')) {
            sortObj.sort = {
                [query._sort]: query._order === 'asc' ? 1 : -1
            };
            productData = query?.skip && query?.limit ? await Product.find(filter).sort(sortObj.sort).skip(query.skip).limit(query.limit) : await Product.find(filter).sort(sortObj.sort);

        } else {
            productData = query?.skip && query?.limit ? await Product.find(filter).skip(query.skip).limit(query.limit) : await Product.find(filter);
        }
        res.json(productData);

    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}
async function targetProduct(req, res) {
    const params = req.params.slug;
  console.log(params)
    try {
        const targetProducts = await Product.find({_id: params});

        res.status(200).json(targetProducts.length?targetProducts[0]: {});
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

function PostProducts(req, res) {
    const product = new Product(req.body);
    product.save()
        .then(savedProduct => {
            console.log("Product saved successfully:", savedProduct);
            res.json(savedProduct);
        })
        .catch(error => {
            console.error("Error saving product:", error);
            res.status(500).json({ error: "Failed to save product" });
        });
}

async function updateProduct(req, res) {
    try {
        const productId = req.body._id;
        const updateData = req.body;
        const updatedProduct = await Product.findByIdAndUpdate(productId, updateData, { new: true });

        if (!updatedProduct) {
            return res.status(404).json({ error: "Product not found" });
        }

        console.log("updateProduct");
        res.json(updatedProduct);
    } catch (error) {
        console.error("Error updating product:", error);
        res.status(500).json({ error: "Failed to update product" });
    }
}

function deleteProducts(req, res) {
    console.log("deleteProducts");
    res.json({ "title": "deleteProducts name" });
}

module.exports = [getProducts, PostProducts, updateProduct, deleteProducts, targetProduct]