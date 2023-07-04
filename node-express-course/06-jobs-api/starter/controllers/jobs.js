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
const deleteById = async (req , res) => {
    const {id} = req.params;
    const deleteJob = await jobSchema.findByIdAndDelete({id});
    
    if(!deleteJob) {
        throw new NotFoundError('no data deleted')
    }
    res.status(200).send({deleteJob})

}

//update a job by it's id
const updateJob = async (req , res) => {
    const {
        user : {userId},
        body : {company , jobname},
        params : {id : jobId}
    } = req
    const change = await jobSchema.findByIdAndUpdate({id : userId}, req.body ,  { new: true, runValidators: true });
    if(!change) {
        throw new NotFoundError('No data are changed')
    }
    res.status(200).send({change})
}


module.exports = {
    createJob,
    getAllJobs,
    getJobById,
    deleteById,
    updateJob
}