const express = require("express");
const [ getApplyJob,
    postApplyJob,
    updateApplyJob,
    deleteApplyJob] = require("../Controllers/applyJobController")

const router = express.Router();

router.get("/Apply", getApplyJob)
    .get("/Apply/:slug", () => { console.log("ApplyById") })
    .post("/Apply", postApplyJob)
    .patch("/Apply", updateApplyJob)
    .delete("/Apply", deleteApplyJob);

module.exports = router;
