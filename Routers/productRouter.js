const [getProducts, PostProducts,updateProduct, deleteProducts,targetProduct,getSearchProducts,getUniqueCategory,getUniquepriceRange, getUniqueCuisine,getUniqueRestaurent] = require("../Controllers/productControllers")

const express = require("express");
const router = express.Router();

router.get("/products",(req, res)=> getProducts(req, res))
.get("/products/:slug",targetProduct)
.get("/uniqueCategory",getUniqueCategory)
.get("/uniquePriceRange",getUniquepriceRange)
.get("/uniqueCuisine",getUniqueCuisine)
.get("/uniqueRestaurent",getUniqueRestaurent)
.get("/productsSearch",getSearchProducts)
.post("/products",PostProducts)
.patch("/products",updateProduct)
.delete("/products",deleteProducts);

module.exports= router;
