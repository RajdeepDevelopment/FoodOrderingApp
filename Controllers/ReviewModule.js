const Review = require("../Modules/ReviewsModule");

// Get Review
async function getReview(req, res) {
    let reviewData = []
    let query = req.query;
    let filter = {};
    let sortObj = {}
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
        reviewData = await Review.find(filter).skip(query?.skip ?? 0).limit(query?.limit ?? 20)
    }

    res.json(reviewData);
    console.log("getReview");
}

async function targetReviewData(req, res) {
    const params = req.params.slug;
    try {
        const targetReview = await Review.find({_id: params});
        res.status(200).json(targetReview.length>0? targetReview[0]: {});
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}
// Post Review
function postReview(req, res) {
    const newReviewData = req.body;
    const newReview = new Review(newReviewData);
    newReview.save()
        .then(savedReview => {
            console.log("Review saved successfully:", savedReview);
            res.status(201).json(savedReview);
        })
        .catch(error => {
            console.error("Error saving review:", error);
            res.status(500).json({ error: "Failed to save review" });
        });
}
// Patch Review
function patchReview(req, res) {

    const updatedData = req.body;

    Review.findByIdAndUpdate(req.body._id, updatedData, { new: true })
        .then(updatedReview => {
            if (!updatedReview) {
                return res.status(404).json({ error: "Review not found" });
            }
            console.log("Review updated successfully:", updatedReview);
            res.json(updatedReview);
        })
        .catch(error => {
            console.error("Error updating review:", error);
            res.status(500).json({ error: "Failed to update review" });
        });
}

// Delete Review
function deleteReview(req, res) {
    const reviewId = req.body._id;

    Review.findByIdAndDelete(reviewId)
        .then(deletedReview => {
            if (!deletedReview) {
                return res.status(404).json({ error: "Review not found" });
            }
            console.log("Review deleted successfully:", deletedReview);
            res.json(deletedReview);
        })
        .catch(error => {
            console.error("Error deleting review:", error);
            res.status(500).json({ error: "Failed to delete review" });
        });
}

module.exports = [getReview,
    postReview,
    patchReview,
    deleteReview,targetReviewData]