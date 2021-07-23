const mongoose=require("mongoose");

//Creating a Book Schema
const BookSchema=mongoose.Schema({
    ISBN:{
        type:String,
        required:true,
        minLength:8,
        maxLength:10
    },
    title:{
        type:String,
        required:true,
        minLength:8,
        maxLength:10
    },
    pubDate:String,
    language:String,
    numPage:Number,
    author:[Number],
    publication:Number,
    category:[String]
});

//Create a book model
const BookModel = mongoose.model("books",BookSchema);

module.exports=BookModel;