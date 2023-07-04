const express = require('express')
const router = express.Router
const {createJob , getAllJobs , getJobById , deleteById , updateJob} = require('../controllers/jobs')


router.route('/:id')
    .update(updateJob)
    .get(getJobById)
    .delete(deleteById)
router.route('/').post(createJob).get(getAllJobs)

module.exports = router