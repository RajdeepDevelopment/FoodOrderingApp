const [  getJobsData,
    targetJobsData,
    postJobsData,
    updateJobsData,
    deleteJobsData,] = require("../Controllers/jobOpeningsController")

const express = require("express");
const router = express.Router();

router.get("/jobOpenings", (req, res) => getJobsData(req, res))
    .get("/jobOpenings/:slug", targetJobsData)
    .post("/jobOpenings", postJobsData)
    .patch("/jobOpenings", updateJobsData)
    .delete("/jobOpenings", deleteJobsData);

module.exports = router;