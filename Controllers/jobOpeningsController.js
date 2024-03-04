const Jobs = require("../Modules/jobOpeningsModules");
async function getJobsData(req, res) {
    try {
      const jobs = await Jobs.find();
      res.status(200).json({ success: true, data: jobs });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  }
  
  async function targetJobsData(req, res) {
    try {
      const job = await Jobs.findById(req.params.id);
      if (!job) {
        return res.status(404).json({ success: false, error: "Job not found" });
      }
      res.status(200).json({ success: true, data: job });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  }
  
  async function postJobsData(req, res) {
    try {

        
      const job = await Jobs.create(req.body);
      res.status(201).json({ success: true, data: job });
    } catch (err) {
      res.status(400).json({ success: false, error: err.message });
    }
  }
  
  async function updateJobsData(req, res) {
    try {
      const job = await Jobs.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
      });
      if (!job) {
        return res.status(404).json({ success: false, error: "Job not found" });
      }
      res.status(200).json({ success: true, data: job });
    } catch (err) {
      res.status(400).json({ success: false, error: err.message });
    }
  }
  
  async function deleteJobsData(req, res) {
    try {
      const job = await Jobs.findByIdAndDelete(req.params.id);
      if (!job) {
        return res.status(404).json({ success: false, error: "Job not found" });
      }
      res.status(200).json({ success: true, data: {} });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  }
  
  module.exports = [
    getJobsData,
    targetJobsData,
    postJobsData,
    updateJobsData,
    deleteJobsData,
  ];