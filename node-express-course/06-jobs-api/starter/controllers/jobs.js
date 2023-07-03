const jobSchema = require('../models/Job')
const {BadRequestError , NotFoundError} = require('../errors')
// get all jobs

const getAllJobs = async (req , res) => {
    const alljobs = await jobSchema.find();
    res.status(200).json({alljobs , count : alljobs.length})
}
// get a job by id
const getJobById = async (req , res) => {
    const {id} = req.body;
    const job = await jobSchema.findById({id})
    if(!job) {
        throw new NotFoundError('No job with id')
    }
    res.status(200).json({job})
}
//create a job
const createJob = async (req , res) => {
    const {jobname , salary , company} = req.query;
    const job = await jobSchema.create({jobname , salary , company})

    res.status(200).json({job})
}
// delete a job by id

//update a job by it's id