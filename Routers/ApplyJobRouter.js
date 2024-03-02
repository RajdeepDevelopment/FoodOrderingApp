const express = require("express");
const [ getApplyJob,
    postApplyJob,
    updateApplyJob,
    deleteApplyJob,getSearchApplyJob] = require("../Controllers/applyJobController")

const router = express.Router();

router.get("/Apply", getApplyJob)
    .get("/Apply/:slug", () => { console.log("ApplyById") })
    .get("/ApplySearch", getSearchApplyJob)
    .post("/Apply", postApplyJob)
    .patch("/Apply", updateApplyJob)
    .delete("/Apply", deleteApplyJob);

module.exports = router;
