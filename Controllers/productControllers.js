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

 exports.getProducts =async(req, res)=>{
    /* #swagger.tags = ['Products']
       #swagger.description = 'This route is used for getting products'
       #swagger.parameters['name'] = {
           in: 'query',
           type: 'string',
           description: 'Filter by name'
       }
       #swagger.parameters['description'] = {
           in: 'query',
           type: 'string',
           description: 'Filter by description'
       }
       #swagger.parameters['price'] = {
           in: 'query',
           type: 'number',
           description: 'Filter by price'
       }
       #swagger.parameters['discountPercentage'] = {
           in: 'query',
           type: 'number',
           description: 'Filter by discount percentage'
       }
       #swagger.parameters['rating'] = {
           in: 'query',
           type: 'number',
           description: 'Filter by rating'
       }
       #swagger.parameters['uid'] = {
           in: 'query',
           type: 'string',
           description: 'Filter by user ID'
       }
       #swagger.parameters['restaurantName'] = {
           in: 'query',
           type: 'string',
           description: 'Filter by restaurant name'
       }
       #swagger.parameters['ingredients'] = {
           in: 'query',
           type: 'string',
           description: 'Filter by ingredients'
       }
       #swagger.parameters['thumbnail'] = {
           in: 'query',
           type: 'string',
           description: 'Filter by thumbnail'
       }
       #swagger.parameters['images'] = {
           in: 'query',
           type: 'string',
           description: 'Filter by images'
       }
       #swagger.parameters['highlights'] = {
           in: 'query',
           type: 'string',
           description: 'Filter by highlights'
       }
       #swagger.parameters['cuisine'] = {
           in: 'query',
           type: 'string',
           description: 'Filter by cuisine'
       }
       #swagger.parameters['city'] = {
           in: 'query',
           type: 'string',
           description: 'Filter by city'
       }
       #swagger.parameters['category'] = {
           in: 'query',
           type: 'string',
           description: 'Filter by category'
       }
       #swagger.parameters['priceRange'] = {
           in: 'query',
           type: 'string',
           description: 'Filter by price range'
       }
       #swagger.parameters['visibleStatus'] = {
           in: 'query',
           type: 'boolean',
           description: 'Filter by visible status'
       }
       #swagger.parameters['_sort'] = {
           in: 'query',
           type: 'string',
           description: 'Sort by field'
       }
       #swagger.parameters['_order'] = {
           in: 'query',
           type: 'string',
           description: 'Sort order (\'asc\' or \'desc\')'
       }
       #swagger.parameters['skip'] = {
           in: 'query',
           type: 'integer',
           description: 'Number of items to skip'
       }
       #swagger.parameters['limit'] = {
           in: 'query',
           type: 'integer',
           description: 'Maximum number of items to return'
       }
    */

    try {
        let productData = []
        let query = req.query;
        let filter = {};
        let sortObj = {}
        let name = query.name;
        if (query.name) filter.name = query.name;
        if (query.description) filter.description = query.description;
        if (query.price) filter.price = query.price;
        if (query.discountPercentage) filter.discountPercentage = query.discountPercentage;
        if (query.rating) filter.rating = query.rating;
        if (query.uid) filter.uid = query.uid;
        if (query.restaurantName) {
           const temp =  query.restaurantName.split("-").join(" ");
            filter.restaurantName = temp }
        if (query.ingredients) filter.ingredients = query.ingredients;
        if (query.thumbnail) filter.thumbnail = query.thumbnail;
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
         const fetchLocationCount = filter?.city ? await Product.countDocuments({"city": filter?.city}): 0 ;
         const bool = filter?.city ?fetchLocationCount >0 : true
        bool?" ": delete filter.city  
        if (query._sort && (query._order === 'asc' || query._order === 'desc')) {
            sortObj.sort = {
                [query._sort]: query._order === 'asc' ? 1 : -1
            };
            productData = query?.skip && query?.limit ? await Product.find(filter).sort(sortObj.sort).skip(query.skip).limit(query.limit) : await Product.find(filter).sort(sortObj.sort);
        } 
        else {
            productData = query?.skip && query?.limit ? await Product.find(filter).skip(query.skip).limit(query.limit) : await Product.find(filter);
        }
       const  locationData = fetchLocationCount >0;
        res.json(successResponse(productData, "", "", (await Product.countDocuments(filter)), locationData));

    } catch (error) {
        console.error("Error:", error);
        res.status(500).json(errorResponse({ error: "Internal Server Error" }));
    }
}
 exports.targetProduct = async(req, res)=> {
    /* #swagger.tags = ['Products']
       #swagger.description = 'This route is used for getting a specific product'
       #swagger.parameters['slug'] = {
           in: 'path',
           type: 'string',
           description: 'Product ID'
       }
    */
    const params = req.params.slug;
    try {
        const targetProducts = await Product.find({_id: params});
        res.status(200).json(successResponse(targetProducts?.length?targetProducts[0]: {}));
    } catch (err) {
        res.status(500).json(errorResponse({ message: err.message }));
    }
}
exports.getSearchProducts =  async (req, res)=>{
    /* #swagger.tags = ['Products']
       #swagger.description = 'This route is used for searching products'
       #swagger.parameters['q'] = {
           in: 'query',
           type: 'string',
           description: 'Search keyword'
       }
    */
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
exports.getUniqueCategory = async (req, res) => {
    /* #swagger.tags = ['Products']
       #swagger.description = 'This route is used for getting unique categories'
    */
       try {
        const query = req.query;
        let  categories = [];
        if(query.city){
     const fetchLocationCount = query?.city ? await Product.countDocuments({"city": query?.city}): 0 ;
    if(fetchLocationCount >0){
        categories = await Product.aggregate([
            { $match: { city:  query.city } }, 
            { 
                $group: {
                    _id: "$category",
                    count: { $sum: 1 }
                }
            }
        ]).exec();
    }
     else{
        categories = await Product.aggregate([
            { 
                $group: {
                    _id: "$category",
                    count: { $sum: 1 }
                }
            }
        ]).exec();
    }   
        } 
        else{
            categories = await Product.aggregate([
                { 
                    $group: {
                        _id: "$category",
                        count: { $sum: 1 }
                    }
                }
            ]).exec();
        }
    // const priceRanges = await Product.distinct('priceRange').exec();
     const categoriesformat =  categories.map(restaurant => ({
        value: restaurant._id,
        label: restaurant.count
    }));
    res.status(200).json(successResponse(categoriesformat));
} 
catch (error) {
    res.status(500).json(errorResponse({ message: error.message }));
}
    // try {

    //     const categories = await Product.distinct('category').exec();
    //     res.status(200).json(successResponse(await formatUnique(categories)));
    // } catch (error) {
    //     res.status(500).json(errorResponse({ message: error.message }));
    // }
}

exports.getUniqueCuisine = async (req, res) => {
    /* #swagger.tags = ['Products']
       #swagger.description = 'This route is used for getting unique cuisines'
    */
       try {
        const query = req.query;
        let  cuisines = [];
        if(query.city){
     const fetchLocationCount = query?.city ? await Product.countDocuments({"city": query?.city}): 0 ;
    if(fetchLocationCount >0){
        cuisines = await Product.aggregate([
            { $match: { city:  query.city } }, 
            { 
                $group: {
                    _id: "$cuisine",
                    count: { $sum: 1 }
                }
            }
        ]).exec();
    }
     else{
        cuisines = await Product.aggregate([
            { 
                $group: {
                    _id: "$cuisine",
                    count: { $sum: 1 }
                }
            }
        ]).exec();
    }   
        } 
        else{
            cuisines = await Product.aggregate([
                { 
                    $group: {
                        _id: "$cuisine",
                        count: { $sum: 1 }
                    }
                }
            ]).exec();
        }
     const cuisinesformat =  cuisines.map(restaurant => ({
        value: restaurant._id,
        label: restaurant.count
    }));
    res.status(200).json(successResponse(cuisinesformat));
} 
catch (error) {
    res.status(500).json(errorResponse({ message: error.message }));
}
    // try {
    //     const cuisines = await Product.distinct('cuisine').exec();
    //     res.status(200).json(successResponse(await formatUnique(cuisines)));
    // } catch (error) {
    //     res.status(500).json(errorResponse({ message: error.message }));
    // }
}

exports.getUniquepriceRange = async (req, res) => {
    /* #swagger.tags = ['Products']
       #swagger.description = 'This route is used for getting unique price ranges'
    */
        try {
            const query = req.query;
            let  priceRanges = [];
            if(query.city){
         const fetchLocationCount = query?.city ? await Product.countDocuments({"city": query?.city}): 0 ;
        if(fetchLocationCount >0){
            priceRanges = await Product.aggregate([
                { $match: { city:  query.city } }, 
                { 
                    $group: {
                        _id: "$priceRange",
                        count: { $sum: 1 }
                    }
                }
            ]).exec();
        }
         else{
            priceRanges = await Product.aggregate([
                { 
                    $group: {
                        _id: "$priceRange",
                        count: { $sum: 1 }
                    }
                }
            ]).exec();
        }   
            } 
            else{
                priceRanges = await Product.aggregate([
                    { 
                        $group: {
                            _id: "$priceRange",
                            count: { $sum: 1 }
                        }
                    }
                ]).exec();
            }
        // const priceRanges = await Product.distinct('priceRange').exec();
         const priceRangesformat =  priceRanges.map(restaurant => ({
            value: restaurant._id,
            lable: restaurant.count
        }));
        res.status(200).json(successResponse(priceRangesformat));
    } 
    catch (error) {
        res.status(500).json(errorResponse({ message: error.message }));
    }
}
exports.getUniqueRestaurent = async (req, res) => {
    /* #swagger.tags = ['Products']
       #swagger.description = 'This route is used for getting unique restaurant names'
    */
       try {
        const query = req.query;
        let restaurants = [];
        if(query.city){
            restaurants = await Product.aggregate([
                { $match: { city:  query.city } }, 
                { 
                    $group: {
                        _id: "$restaurantName",
                        count: { $sum: 1 }
                    }
                }
            ]).exec();
        } else{
            restaurants = await Product.aggregate([
                { 
                    $group: {
                        _id: "$restaurantName",
                        count: { $sum: 1 }
                    }
                }
            ]).exec();

        }
        
    
        // Format the response to include restaurant names and their product counts
        const formattedRestaurants = restaurants.map(restaurant => ({
            name: restaurant._id,
            count: restaurant.count
        }));
    
        res.status(200).json(successResponse(formattedRestaurants));
    } catch (error) {
        res.status(500).json(errorResponse({ message: error.message }));
    }
}

exports.uniqueRestaurantsWithProduct = async (req, res) =>{

    Product.aggregate([
        {
            $group: {
                _id: "$restaurantName",
                products: { $push: "$$ROOT" } // Push all fields of the document to the products array
            }
        }
    ])
    .then(uniqueRestaurantsWithProducts => {
        const formattedData = uniqueRestaurantsWithProducts.map(restaurant => {
            const helperMap = restaurant.products.map((element, index) => ({
                name: element.name,
                value: index * (index * element.price * element.rating),
                img: element.thumbnail,
                _id: element._id,
                price: element.price,
                rating: element.rating,
                discountPercentage: element.discountPercentage,
                uid: element.uid
            }));
    
            return {
                name: restaurant._id,
                children: helperMap
            };
        });
    
        res.json(successResponse(formattedData));
    })
    .catch(error => {
        console.error('Error:', error);
    });

}
exports.PostProducts = (req, res) => {
    /* #swagger.tags = ['Products']
       #swagger.description = 'This route is used for adding a new product'
       #swagger.parameters['product'] = {
           in: 'body',
           description: 'Product object to add',
           schema: { $ref: "#/definitions/Product" }
       }
    */
    const product = new Product(req.body);
    product.save()
        .then(savedProduct => {
            console.log("Product saved successfully:" + savedProduct._id, savedProduct);
            res.json(successResponse(savedProduct));
        })
        .catch(error => {
            console.error("Error saving product:", error);
            res.status(500).json(errorResponse({ error: "Failed to save product" }));
        });
}

exports.updateProduct = async (req, res) => {
    /* #swagger.tags = ['Products']
       #swagger.description = 'This route is used for updating a product'
       #swagger.parameters['product'] = {
           in: 'body',
           description: 'Product object to update',
           schema: { $ref: "#/definitions/Product" }
       }
    */
    try {
        const productId = req.body._id;
        const updateData = req.body;
        const updatedProduct = await Product.findByIdAndUpdate(productId, updateData, { new: true });

        if (!updatedProduct) {
            return res.status(404).json(errorResponse({ error: "Product not found" }));
        }

        res.json(successResponse(updatedProduct));
    } catch (error) {
        console.error("Error updating product:", error);
        res.status(500).json(errorResponse({ error: "Failed to update product" }));
    }
}

exports.deleteProducts = (req, res) => {
    /* #swagger.tags = ['Products']
       #swagger.description = 'This route is used for deleting products'
    */
    res.json({ "title": "deleteProducts name" }); // pending work
}


// module.exports = [ PostProducts, updateProduct, deleteProducts, targetProduct,getSearchProducts,getUniqueCategory, getUniquepriceRange, getUniqueCuisine, getUniqueRestaurent]