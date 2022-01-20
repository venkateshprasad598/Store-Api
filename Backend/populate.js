require("dotenv").config();

const products = require("./model/schema");
const connectDB = require("./database/connect");
const jsonProducts = require("./product.json");

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    await products.deleteMany();
    await products.create(jsonProducts);
    console.log("Working");
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
start();
