require("dotenv").config();
//Framework
const express=require("express");
const mongoose=require("mongoose");


//MicroServices Routes
const Books=require("./API/Book/bookindex")
const Authors=require("./API/author/authorindex")
const Publications=require("./API/Publication/publicationindex")
// Initialisation
const booky=express();

booky.use(express.json());

//Establish a connection to database
mongoose.connect(process.env.MONGO_URL,
{
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true

}).then(()=>console.log("Connection Established😎😎"));


//Initialising MicroServices
booky.use("/book",Books);
booky.use("/author",Authors);
booky.use("/publication",Publications);


booky.listen(3000,()=>console.log("Server is Running successfully"));
