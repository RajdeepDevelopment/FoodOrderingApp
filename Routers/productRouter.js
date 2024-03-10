// const [getProducts, PostProducts,updateProduct, deleteProducts,targetProduct,getSearchProducts,getUniqueCategory,getUniquepriceRange, getUniqueCuisine,getUniqueRestaurent] = require("../Controllers/productControllers")
const ProductFile = require("../Controllers/productControllers")

const express = require("express");
const router = express.Router();

router.get("/products",ProductFile.getProducts)
.get("/products/:slug",ProductFile.targetProduct)
.get("/uniqueCategory",ProductFile.getUniqueCategory)
.get("/uniquePriceRange",ProductFile.getUniquepriceRange)
.get("/uniqueCuisine",ProductFile.getUniqueCuisine)
.get("/uniqueRestaurent",ProductFile.getUniqueRestaurent)
.get("/uniqueRestaurantsWithProduct",ProductFile.uniqueRestaurantsWithProduct)
.get("/productsSearch",ProductFile.getSearchProducts)
.post("/products",ProductFile.PostProducts)
.patch("/products",ProductFile.updateProduct)
.delete("/products",ProductFile.deleteProducts);

module.exports= router;
