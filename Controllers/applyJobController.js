const ApplyJob = require("../Modules/ApplyJobModule");

// Get apply job
async function getApplyJob(req, res) {
    try {
        let applyJobData = []
        let query = req.query;
        let filter = {};
        let sortObj = {}
        if (query.location) filter.location = query.location;
        if (query.salary) filter.salary = query.salary;
        if (query.skills) filter.skills = query.skills;
        if (query.firstName) filter.firstName = query.firstName;
        if (query.lastName) filter.lastName = query.lastName;
        if (query.phone) filter.phone = query.phone;
        if (query.address1) filter.address1 = query.address1;
        if (query.address2) filter.address2 = query.address2;
        if (query.city) filter.city = query.city;
        if (query.country) filter.country = query.country;
        if (query.pinCode) filter.pinCode = query.pinCode;
        if (query.state) filter.state = query.state;
        if (query.state2) filter.state2 = query.state2;
        if (query.userId) filter.userId = query.userId;
        if (query.longitude) filter.longitude = query.longitude;
        if (query.latitude) filter.latitude = query.latitude;
        if (query.validEmail) filter.validEmail = query.validEmail;
        if (query.logo) filter.logo = query.logo;
        if (query.id) filter.id = query.id;
        if (query.time) filter.time = query.time;
        if (query._sort && (query._order === 'asc' || query._order === 'desc')) {
            sortObj.sort = {
                [query._sort]: query._order === 'asc' ? 1 : -1
            };
            applyJobData = query?.skip && query?.limit ? await ApplyJob.find(filter).sort(sortObj.sort).skip(query.skip).limit(query.limit) : await ApplyJob.find(filter).sort(sortObj.sort);;

        } else {
            applyJobData = query?.skip && query?.limit ? await ApplyJob.find(filter).skip(query.skip).limit(query.limit) : await ApplyJob.find(filter);
        }

        res.json(applyJobData);
        console.log("getApplyJob");
    } catch (error) {
        console.error("Error fetching apply job data:", error);
        res.status(500).json({ error: "Failed to fetch apply job data" });
    }
}

// Post apply job
async function postApplyJob(req, res) {
    try {
        const newApplyJobData = req.body;
        const newApplyJob = new ApplyJob(newApplyJobData);
        const savedApplyJob = await newApplyJob.save();
        console.log("Apply job saved successfully:", savedApplyJob);
        res.status(201).json(savedApplyJob);
    } catch (error) {
        console.error("Error saving apply job:", error);
        res.status(500).json({ error: "Failed to save apply job" });
    }
}

// Patch apply job
async function updateApplyJob(req, res) {
    try {
        const applyJobId = req.params.applyJobId;
        const updatedData = req.body;
        const updatedApplyJob = await ApplyJob.findByIdAndUpdate(applyJobId, updatedData, { new: true });
        if (!updatedApplyJob) {
            return res.status(404).json({ error: "Apply job not found" });
        }
        console.log("Apply job updated successfully:", updatedApplyJob);
        res.json(updatedApplyJob);
    } catch (error) {
        console.error("Error updating apply job:", error);
        res.status(500).json({ error: "Failed to update apply job" });
    }
}

// Delete apply job
async function deleteApplyJob(req, res) {
    try {
        const applyJobId = req.params.applyJobId;
        const deletedApplyJob = await ApplyJob.findByIdAndDelete(applyJobId);
        if (!deletedApplyJob) {
            return res.status(404).json({ error: "Apply job not found" });
        }
        console.log("Apply job deleted successfully:", deletedApplyJob);
        res.json(deletedApplyJob);
    } catch (error) {
        console.error("Error deleting apply job:", error);
        res.status(500).json({ error: "Failed to delete apply job" });
    }
}

module.exports = [
    getApplyJob,
    postApplyJob,
    updateApplyJob,
    deleteApplyJob
];