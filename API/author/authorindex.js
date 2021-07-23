const Router = require("express").Router();

const AuthorModel=require("../../database/author");


/* 
Route              /author
Description        Get all Author
Access             PUBLIC
Parameter          None
Methods            GET
*/

Router.get("/",async (req,res)=>{
    const getAllAuthors=await AuthorModel.find();
    return res.json({Author:getAllAuthors})
});

/* 
Route              /author/name
Description        Get Specific Author based id
Access             PUBLIC
Parameter          name
Methods            GET
*/
Router.get("/:name",async (req,res)=>{
    // const getSpecificAuthor=database.author.filter((author)=>author.name===req.params.name);
    const getSpecificAuthor=await AuthorModel.findOne({Author:req.params.name})
    if(!getSpecificAuthor)
    {
        return res.json({error:`No Author Found for the Id of ${req.params.name}`});
    }
    else{
        return res.json({Author:getSpecificAuthor});
    }
});

/* 
Route              /author/books
Description        Get Specific Author based on Books
Access             PUBLIC
Parameter          ISBN
Methods            GET
*/

Router.get("/book/:ISBN",async (req,res)=>{
    // const getSpecificAuthor=database.author.filter((author)=>author.books.includes(req.params.ISBN));
    const getSpecificAuthor=await AuthorModel.findOne({Author:req.params.ISBN})

    if(!getSpecificAuthor){
        return res.json({error:`No Author Found for the ISBN of ${req.params.ISBN}`});
    }
    else{
        return res.json({Author:getSpecificAuthor})
    }
});

/* 
Route              /author/add
Description        Adding a new Author
Access             PUBLIC
Parameter          None
Methods            POST
*/
Router.post("/add",(req,res)=>{
    const {newAuthor}=req.body;
    // database.author.push(newAuthor);
    AuthorModel.create(newAuthor);
    return res.json({Author:newAuthor});
});

/* 
Route              /author/update/name
Description        Updating author name based on id
Access             PUBLIC
Parameter          Id
Methods            PUT
*/

Router.put("/update/name/:id",(req,res)=>{
    database.author.forEach((author)=>{
        if(author.id===req.params.id){
           author.name=req.body.newAuthorName;
           return;
        }
    });
    return res.json({Author:database.author});
    });

    
/* 
Route              /author/delete
Description        Delete a author 
Access             PUBLIC
Parameter          authorId
Methods            DELETE
*/
Router.delete("/delete/:authorId",(req,res)=>{
    const updatedAuthorDatabase=database.author.filter((author)=> author.id !==parseInt(req.params.authorId));
    database.author=updatedAuthorDatabase;
    return res.json({Author:database.author});
});

module.exports=Router;