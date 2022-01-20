require("dotenv").config();
require("express-async-errors");
//SetUp
const express = require("express");
const app = express();

const connectDB = require("./database/connect");
const tasks = require("./routes/tasks");

const errorHandler = require("./errors/errorPage");
const notFound = require("./errors//notFound");

//MiddleWares
app.use(express.json());

//Home Routes
app.get("/", (req, res) => {
  res
    .status(200)
    .send('<h1>Home Page</h1><a href = "/app/v1/task">ReDirect</a>');
});

//Tasks Route
app.use("/app/v1/task", tasks);
app.use(notFound);
app.use(errorHandler);

//Port
const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, console.log(`Server is listening on port ${port}`));
  } catch (err) {
    console.log(err);
  }
};
start();
