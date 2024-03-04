const Product = require("../Modules/ProductsModule")
const mongoose = require("mongoose");
const [successResponse, errorResponse] = require("../Controllers/Responser/Wrapper")
function formatUnique(data) {
    const arrayFrom = data.map(item => ({
        value: item.toLowerCase(),
        label: item.toUpperCase(),
        checked: false
    }));
    return arrayFrom;
}
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
        res.json(successResponse(productData, "", "", (await Product.find(filter)).length));

    } catch (error) {
        console.error("Error:", error);
        res.status(500).json(errorResponse({ error: "Internal Server Error" }));
    }
}
async function targetProduct(req, res) {
    const params = req.params.slug;
    try {
        const targetProducts = await Product.find({_id: params});
        res.status(200).json(successResponse(targetProducts?.length?targetProducts[0]: {}));
    } catch (err) {
        res.status(500).json(errorResponse({ message: err.message }));
    }
}
async function getSearchProducts(req, res) {
    const query = req.query;
    if (query?.q) {
        const keyword = query.q;
        const schemaPaths = Object.keys(Product.schema.paths).filter(field => {
            const instance = Product.schema.paths[field].instance;
            return instance === 'String';
        });     
        const regexConditions = schemaPaths.map((field)=>(
            { [field]: { $regex: keyword, $options: 'i' } }
        ));
        try {
            const results = await Product.find({ $or: regexConditions });
            res.json(successResponse(results));
        } catch (error) {
            console.error(error);
            res.json(successResponse([]));
        }
    } else {
        try {
            const products = await Product.find({}).skip(0).limit(10);
            res.json(successResponse(products));
        } catch (error) {
            console.error(error);
            res.json(errorResponse([]));
        }
    }
}
async function getUniqueCategory(req, res) {
    try {
        const categories = await Product.distinct('category').exec();
        res.status(200).json(successResponse( await formatUnique(categories)));
    } catch (error) {
        res.status(500).json(errorResponse({ message: error.message }));
    }
}
async function getUniqueCuisine(req, res) {
    try {
        const cuisines = await Product.distinct('cuisine').exec();
        res.status(200).json(successResponse( await formatUnique(cuisines)));
    } catch (error) {
        res.status(500).json(errorResponse({ message: error.message }));
    }
}
async function getUniquepriceRange(req, res) {
    try {
        const priceRanges = await Product.distinct('priceRange').exec();
        const priceRangesformat = await formatUnique(priceRanges)
        res.status(200).json(successResponse( priceRangesformat));
    } catch (error) {
        res.status(500).json(errorResponse({ message: error.message }));
    }
}


function PostProducts(req, res) {
    const product = new Product(req.body);
    product.save()
        .then(savedProduct => {
            console.log("Product saved successfully:"+ savedProduct._id, savedProduct);
            res.json(successResponse(savedProduct));
        })
        .catch(error => {
            console.error("Error saving product:", error);
            res.status(500).json(errorResponse({ error: "Failed to save product" }));
        });
}

async function updateProduct(req, res) {
    try {
        const productId = req.body._id;
        const updateData = req.body;
        const updatedProduct = await Product.findByIdAndUpdate(productId, updateData, { new: true });

        if (!updatedProduct) {
            return res.status(404).json(errorResponse({ error: "Product not found" }));
        }

        res.json(successResponse(updatedProduct));
    }   catch (error) {
        console.error("Error updating product:", error);
        res.status(500).json(errorResponse({ error: "Failed to update product" }));
    }
}

function deleteProducts(req, res) {
    res.json({ "title": "deleteProducts name" }); // pendding work
}

module.exports = [getProducts, PostProducts, updateProduct, deleteProducts, targetProduct,getSearchProducts,getUniqueCategory, getUniquepriceRange, getUniqueCuisine]