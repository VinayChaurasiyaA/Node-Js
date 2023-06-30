import express from "express";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import cors from "cors";
const app = express();

// this are should be in the config file
const secretKey = "alphabetagamabitch";
const mongodbUrl = "mongodb://localhost:27017";
const FrontEndUrl = "*";

//middleware
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: [FrontEndUrl],
    methods: ["GET", "POST", "DELETE", "PUT"],
    credentials: true,
  })
);

// req.query() is used to get all the data after "?" whereas req.params are used for ":" to get id or username
// Try keeping all the dynamic api's at the bottom like ":" and "?"

mongoose
  .connect(mongodbUrl, {
    dbName: "backend",
  })
  .then(() => console.log("Connected to the database"))
  .catch((error) => console.log(error));

const schema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    required: true,
    type: String,
    unique: true,
  },
  password: {
    required: true,
    type: String,
    select: false,
  },
  createdAt: {
    // required: true,
    type: Date,
    default: Date.now,
  },
});

const schemaTask = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    required: true,
    type: String,
    // unique: true
  },
  isCompleted: {
    // required : true,
    type: Boolean,
    default: false,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
const User = mongoose.model("User", schema);
const Task = mongoose.model("Task", schemaTask);

//login
app.get("/users/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email }).select("+password");
  // it means that we want all the data from the database and as well
  // as the password as we had set the value of the password to be false
  if (!user) {
    return res.status(400).json({
      success: false,
      message: "Invalid username ",
    });
  }
  // console.log(password);
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(400).json({
      success: false,
      message: "Invalid username and password",
    });
  }
  const token = jwt.sign({ _id: user._id }, "alphabetagamabitch");
  return res
    .status(200)
    .cookie("token", token, {
      httpOnly: true,
      maxAge: 15 * 60 * 1000,
    })
    .json({
      success: true,
      message: `Login Succesfully , Welcome back ${user.name}`,
    });
});

// getall userdata
app.get("/users/all", async (req, res) => {
  const users = await User.find({});
  // console.log(users);
  //   console.log("We are on users");
  res.json({
    success: true,
    users,
  });
  // res.send("Hellow world")
});

//register
app.post("/users/new", async (req, res) => {
  const { name, email, password } = req.body;
  let user = await User.findOne({ email });
  if (user) {
    return res.status(404).json({
      success: false,
      message: "User already exists",
    });
  }
  const hashedpassword = await bcrypt.hash(password, 10);
  user = await User.create({
    name,
    email,
    password: hashedpassword,
  });
  const token = jwt.sign({ _id: user._id }, secretKey);
  res
    .status(201)
    .cookie("token", token, {
      httpOnly: true,
      maxAge: 15 * 60 * 1000,
    })
    .json({
      success: true,
      message: "Register Successfully",
    });
});

// without giving the id we can get the data of the current user as he has a token/cookie
app.get("/users/me", async (req, res) => {
  const { token } = req.cookies;
  // console.log(token);
  if (!token) {
    res.status(400).json({
      success: false,
      message: "Login first",
    });
  }
  const decode = jwt.verify(token, secretKey);
  const user = await User.findById(decode._id);

  res.json({
    success: true,
    user,
  });
});

// logout
app.get("/users/logout", (req, res) => {
  res
    .status(200)
    .cookie("token", "", {
      httpOnly: true,
      maxAge: Date.now(),
    })
    .json({
      success: true,
      user: req.user,
    });
});

// tasks
app.post("/tasks/new", async (req, res) => {
  const { title, description } = req.body;
  const { token } = req.cookies;
  // console.log(token);

  if (!token) {
    res.status(400).json({
      success: false,
      message: "Login first",
    });
  }

  const decode = jwt.verify(token, secretKey);
  const user = decode._id;
  await Task.create({
    title,
    description,
    user, // we have to get the id which has now logged in as
  });
  res.status(201).json({
    success: true,
    message: "Task added successfully",
  });
});

// getMyTasks
app.get("/tasks/my", async (req, res) => {
  const { token } = req.cookies;
  if (!token) {
    res.status(400).json({
      success: false,
      message: "Login First",
    });
  }
  const decode = jwt.verify(token, secretKey);
  const userId = decode._id;
  const tasks = await Task.find({ user: userId });
  if (!tasks) {
    res.status(400).json({
      success: false,
      message: "No data in the database",
    });
  }
  res.status(200).json({
    success: true,
    tasks,
  });
});
// updateTask
app.put("/tasks/:id", async (req, res) => {
  const { token } = req.cookies;
  if (!token) {
    res.status(400).json({
      success: false,
      message: "Login First",
    });
  }
  const { id } = req.params;

  const tasks = await Task.findById(id);
  if (!tasks)
    return res.status(404).json({
      success: false,
      message: "Do data found",
    });
  tasks.isCompleted = !tasks.isCompleted;
  await tasks.save();
  res.status(200).json({
    success: true,
    message: "Task updated",
  });
});
//DeleteTask
app.delete("/tasks/:id", async (req, res) => {
  const { token } = req.cookies;
  if (!token) {
    res.status(400).json({
      success: false,
      message: "Login First",
    });
  }
  const { id } = req.params;

  const tasks = await Task.findById(id);
  if (!tasks)
    return res.status(404).json({
      success: false,
      message: "Do data found",
    });
  // tasks.isCompleted = !tasks.isCompleted;
  await tasks.deleteOne();
  res.status(200).json({
    success: true,
    message: "Task Deleted",
  });
});
// getuserbyid
app.get("/userid/:id", async (req, res) => {
  const id = req.query.id;
  //   console.log(id);
  const user = await User.findById(id);

  res.json({
    success: true,
    user,
  });
});
app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
