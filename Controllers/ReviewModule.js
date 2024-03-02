const Review = require("../Modules/ReviewsModule");
const [successResponse, errorResponse] = require("../Controllers/Responser/Wrapper")

async function getReview(req, res) {
    try {
        let reviewData = [];
        let query = req.query;
        let filter = {};
        let sortObj = {};
        if (query?.reviewAtt) filter.reviewAtt = query.reviewAtt;
        if (query?.name) filter.name = query.name;
        if (query?.productId) filter.productId = query.productId;
        if (query?.time) filter.time = query.time;
        if (query?.img) filter.img = query.img;
        if (query?.postUser) filter.postUser = query.postUser;
        if (query?.id) filter.id = query.id;
        if (query._sort && (query._order === 'asc' || query._order === 'desc')) {
            sortObj.sort = {
                [query._sort]: query._order === 'asc' ? 1 : -1
            };
            reviewData = query?.skip && query?.limit ? await Review.find(filter).sort(sortObj.sort).skip(query.skip).limit(query.limit) : await Review.find(filter).sort(sortObj.sort);

        } else {
            reviewData = await Review.find(filter).skip(query?.skip ?? 0).limit(query?.limit ?? 20);
        }

        res.json(successResponse(reviewData));
        console.log("getReview");
    } catch (error) {
        console.error("Error fetching review data:", error);
        res.json(errorResponse("Failed to fetch review data"));
    }
}

async function targetReviewData(req, res) {
    const params = req.params.slug; // Assuming 'slug' is used to pass the review ID
    try {
        const targetReview = await Review.find({ _id: params });
        if (targetReview.length > 0) {
            res.status(200).json(successResponse(targetReview[0], 200));
        } else {
            res.status(404).json(errorResponse({error: "Review not found"}, 404));
        }
    } catch (err) {
        res.status(500).json(errorResponse(err.message, 500));
    }
}

async function getSearchReviews(req, res) {
    const query = req.query;
    try {
        if (query?.q) {
            const keyword = query.q;
            const schemaPaths = Object.keys(Review.schema.paths).filter(field => {
                const instance = Review.schema.paths[field].instance;
                return instance === 'String';
            });     
            const regexConditions = schemaPaths.map((field)=>(
                { [field]: { $regex: keyword, $options: 'i' } }
            ));
            const results = await Review.find({ $or: regexConditions });
            res.json(successResponse(results));
        } else {
            const Reviews = await Review.find({}).skip(0).limit(10);
            res.json(successResponse(Reviews));
        }
    } catch (error) {
        console.error(error);
        res.json(errorResponse({ error: "Failed to retrieve reviews" }));
    }
}
// Post Review
function postReview(req, res) {
    const newReviewData = req.body;
    const newReview = new Review(newReviewData);
    newReview.save()
        .then(savedReview => {
            console.log("Review saved successfully:", savedReview);
            res.status(201).json(successResponse(savedReview));
        })
        .catch(error => {
            console.error("Error saving review:", error);
            res.status(500).json(errorResponse({ error: "Failed to save review" }));
        });
}
// Patch Review
function patchReview(req, res) {

    const updatedData = req.body;

    Review.findByIdAndUpdate(req.body._id, updatedData, { new: true })
        .then(updatedReview => {
            if (!updatedReview) {
                return res.status(404).json(errorResponse({ error: "Review not found" }));
            }
            console.log("Review updated successfully:", updatedReview);
            res.json(successResponse(updatedReview));
        })
        .catch(error => {
            console.error("Error updating review:", error);
            res.status(500).json(errorResponse({ error: "Failed to update review" }));
        });
}

// Delete Review
function deleteReview(req, res) {
    const reviewId = req.body._id;

    Review.findByIdAndDelete(reviewId)
        .then(deletedReview => {
            if (!deletedReview) {
                return res.status(404).json(errorResponse({ error: "Review not found" }));
            }
            console.log("Review deleted successfully:", deletedReview);
            res.json(successResponse(deletedReview));
        })
        .catch(error => {
            console.error("Error deleting review:", error);
            res.status(500).json(errorResponse({ error: "Failed to delete review" }));
        });
}

module.exports = [getReview,
    postReview,
    patchReview,
    deleteReview,targetReviewData,getSearchReviews]