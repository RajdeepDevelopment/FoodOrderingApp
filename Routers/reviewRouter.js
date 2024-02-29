const express = require("express");
const [getReview,
       postReview,
       patchReview,
       deleteReview,targetReviewData] = require("../Controllers/ReviewModule")

const router = express.Router();

router.get("/review", getReview)
    .get("/review/:slug", targetReviewData)
    .post("/review", postReview)
    .patch("/review", patchReview)
    .delete("/review", deleteReview);

module.exports = router;
