const mongoose= require("mongoose")
const jobSchema = mongoose.Schema({
    jobname : {
        type: String,
        required
    },
    salary : {
        type : Number,
        required
    },
    company : {
        type: String,
        required
    }
})

module.exports = mongoose.model("job" , jobSchema)