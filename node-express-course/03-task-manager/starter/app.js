const express = require("express");
const mongoose =require("mongoose");
const cors = require("cors");
const app = express();
app.use(cors());
//Parse form data
app.use(express.urlencoded({extended : false})) // it'll help me to get the data which is been entered

app.use(express.json())

// Connect to MongoDB
mongoose.connect('mongodb+srv://vinay:password12345@cluster0.gqq6u2i.mongodb.net/', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// we have to create a model
// Define a schema for the tasks files
const taskSchema = new mongoose.Schema({
    taskname : String,
    taskcompleted : {
        type: Boolean,
        default: false
    }, 
  });
  
const File = mongoose.model('File', taskSchema);

app.get('/api/v1/tasks', async (req , res) => {
    try {
        const data =await File.find({});
        if(!data) {
            res.status(401).send({message: "no data found"});
        }
        else {
            res.status(200).send({data:data , message: "ok"});
        }
    } catch (error) {
        console.log(error);
        res.status(400).send({message: error})
    }
})

app.get('/api/v1/tasks/:id' , async (req , res) => {
    const {id} = req.params;
    try {
        const data =await File.findById({_id : id});
        if(!data) {
            res.status(401).send({message : "No Such task exits"})
        }
        else {
            res.status(200).send({message: "ok" , data});
        }
    } catch (error) {
        console.log(error);
        res.status(400).send({message: error})
    }
})

app.patch('/api/v1/tasks/:id', async (req, res) => {
    const { id } = req.params;
    const { name, completed } = req.body;
    try {
      const data = await File.findByIdAndUpdate(
        id,
        { taskname: name, taskcompleted: completed },
        { new: true }
      );
      if (!data) {
        res.status(401).send({ message: "No Such task exists" });
      } else {
        res.status(200).send({ message: "Update done", data });
      }
    } catch (error) {
      res.status(400).send({ message: error.message });
    }
  });

app.post('/api/v1/tasks' , async (req , res) => {
    const {name} = req.body;
    try {
        const data = new File({taskname: name });
        await data.save();
        res.status(200).send({message : "tasks send successfully"});
    } catch (error) {
        res.status(400).send({message : error});
    }
});

app.delete('/api/v1/tasks/:id' ,async (req , res) => {
    const {id} = req.params
    try {
        const data = await File.findByIdAndDelete({_id : id});
        if(!data) {
            res.status(401).send({message : "No Such task exits"})
        }
        else {
            res.status(200).send({message: "ok" , data});
        }
    } catch (error) {
        res.status(400).send({message : error});
    }
})

app.listen(5000 , () => {
    console.log("server is running on port 5000+")
})
console.log('Task Manager App')
