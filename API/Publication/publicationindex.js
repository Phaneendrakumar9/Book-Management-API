const Router = require("express").Router();

const PublicationModel=require("../../database/publication");

/* 
Route              /publication
Description        Get All Publications
Access             PUBLIC
Parameter          None
Methods            GET
*/

Router.get("/",async (req,res)=>{
    const getAllpublications=await PublicationModel.find();
    return res.json({Publications:getAllpublications});
})

/* 
Route              /publication
Description        Get Specific publications based On Name
Access             PUBLIC
Parameter          name
Methods            GET
*/

Router.get("/:name",async (req,res)=>{
    // const getSpecificPublication=database.publication.filter((publication)=>publication.name===req.params.name);
    const getSpecificPublication=await PublicationModel.findOne({Publication:req.params.name})
    if(!getSpecificPublication){
        return res.json({error:`No publication found with the name of ${req.params.name}`});
    }
    else{
        return res.json({Publications:getSpecificPublication});
    }
});

/* 
Route              /publication/isbn
Description        Get Specific publications based On Books
Access             PUBLIC
Parameter          ISBN
Methods            GET
*/
Router.get("/isbn/:ISBN",async (req,res)=>{
    // const getSpecificPublication=database.publication.filter((publication)=>publication.books.includes(req.params.ISBN));
    const getSpecificPublication=await PublicationModel.findOne({Publicationr:req.params.ISBN})

    if(!getSpecificPublication){
        return res.json({error:`No publication Found for the ISBN of ${req.params.ISBN}`});
    }
    else{
        return res.json({publication:getSpecificPublication})
    }
});


/* 
Route              /publication/add
Description        Adding a new publication
Access             PUBLIC
Parameter          None
Methods            POST
*/
Router.post("/add",(req,res)=>{
    const {newPublication}=req.body;
    // database.publication.push(newPublication);
    PublicationModel.create(newPublication)
    return res.json({Publication:newPublication});
});


/* 
Route              /publication/update/name
Description        Updating publication name based on id
Access             PUBLIC
Parameter          Id
Methods            PUT
*/
Router.put("/update/name/:id",(req,res)=>{
    database.publication.forEach((publication)=>{
        if(publication.id===req.params.id){
            publication.name=req.body.newPublicationName;
           return;
        }
    });
    return res.json({publication:database.publication});
    });

/* 
Route              /publication/update/book
Description        Updating/add new book to a publication
Access             PUBLIC
Parameter          ISBN
Methods            PUT
*/

Router.put("/update/book/:ISBN",(req,res)=>{
     //Updating the publication database
     database.publication.forEach((publication)=>{
      if(publication.id===req.body.pubId){
         return publication.books.push(req.params.ISBN);
      }
     });
    //Updating the book database
     database.books.forEach((book)=>{
         if(book.ISBN===req.params.ISBN){
             book.publication=req.body.pubId;
             return;
         }
     })
     return res.json({Books:database.books,Publications:database.publication,message:"Successfully updated Database"})
});


/* 
Route              /publication/delete
Description        Delete a publication 
Access             PUBLIC
Parameter          Id
Methods            DELETE
*/

Router.delete("/delete/:id",(req,res)=>{
    const updatedPublicationDatabase=database.publication.filter((publication)=> publication.id !==parseInt(req.params.id));
    database.publication=updatedPublicationDatabase;
    return res.json({publication:database.publication});
});

/* 
Route              /publication/delete/book
Description        Delete a book from publication
Access             PUBLIC
Parameter          ISBN,publcation id
Methods            DELETE
*/

Router.delete("/delete/book/:ISBN/:pubId",(req,res)=>{
    //Update publication database
    database.publication.forEach((publication)=>{
        if(publication.id === parseInt(req.params.pubId)){
            const newBookList=publication.books.filter((book)=> book !== req.params.ISBN);
            publication.books=newBookList;
            return;
        }
    });
    //Update book database
    database.books.forEach((book)=>{
        if(book.ISBN===req.params.ISBN){
            book.publication=0; //No publication is avaliable
            return;
        }
    });
    return res.json({Books:database.books,Publication:database.publication})
});

module.exports=Router;