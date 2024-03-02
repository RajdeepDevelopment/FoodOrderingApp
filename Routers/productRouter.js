const [getProducts, PostProducts,updateProduct, deleteProducts,targetProduct,getSearchProducts] = require("../Controllers/productControllers")

const express = require("express");
const router = express.Router();

router.get("/products",(req, res)=> getProducts(req, res))
.get("/products/:slug",targetProduct)
.get("/productsSearch",getSearchProducts)
.post("/products",PostProducts)
.patch("/products",updateProduct)
.delete("/products",deleteProducts);

module.exports= router;
