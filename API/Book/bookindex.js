//Prefix: /book

//Initialising Express Router
const Router=require("express").Router();

//Database models
const BookModel=require("../../database/book")


/* 
Route              /
Description        Get all Books
Access             PUBLIC
Parameter          None
Methods            GET
*/

//For All Books
Router.get("/",async(req,res)=>{
    const getAllBooks=await BookModel.find();
    return res.json(getAllBooks);
});

/* 
Route              /is
Description        Get Specific Book Based On ISBN
Access             PUBLIC
Parameter          ISBN
Methods            GET
*/

//For Specific Book Based On ISBN
Router.get("/is/:ISBN",async (req,res)=>{

    const getSpecificBook=await BookModel.findOne({ISBN:req.params.ISBN})

    // const getSpecificBook=database.books.filter((book)=>book.ISBN===req.params.ISBN);
    if(!getSpecificBook){
        return res.json({error:`No Book Found for the ISBN of ${req.params.ISBN}`});
    }
    else{
        return res.json({Book:getSpecificBook})
    }
});

/* 
Route              /c
Description        Get Specific Book Based On Category
Access             PUBLIC
Parameter          Category
Methods            GET
*/
Router.get("/c/:Category",async (req,res)=>{
    const getSpecificBook=await BookModel.findOne({category:req.params.Category})
//    const getSpecificBook=database.books.filter((book)=> book.category.includes(req.params.Category));
   if(!getSpecificBook){
       return res.json({error:`No Book Found for the category of ${req.params.Category}`})
   }
   else{
       return res.json({Book:getSpecificBook});
   }
});


/* 
Route              /l
Description        Get Specific Book Based On Language
Access             PUBLIC
Parameter          Language
Methods            GET
*/
Router.get("/l/:Language",async (req,res)=>{
    // const getSpecificBook=database.books.filter((book)=>book.language===req.params.Language);
    const getSpecificBook=await BookModel.findOne({Language:req.params.Language})
    if(!getSpecificBook){
        return res.json({error:`No Book found for the Language of ${req.params.Language} `})
    }
    else{
        return res.json({Book:getSpecificBook});
    }
});

/* 
Route              /book/add
Description        Adding a new Book
Access             PUBLIC
Parameter          None
Methods            POST
*/

Router.post("/add",async (req,res)=>{
    try{
        const {newBook} = req.body;
        const addNewBook = await BookModel.create(newBook); 
        // database.books.push(newBook);
        return res.json({Books:addNewBook})
    }
    catch(error){
        return res.json({Error:error})
    }
    
});

/* 
Route              /book/update/title
Description        Updating Book title based on ISBN
Access             PUBLIC
Parameter          ISBN
Methods            PUT
*/
Router.put("/update/title/:ISBN",async (req,res)=>{
    const updatedBook=await BookModel.findOneAndUpdate({ISBN:req.params.ISBN},
      {
          title:req.body.newBookTitle
  
      },
      {
          new:true
      });
  // database.books.forEach((book)=>{
  //     if(book.ISBN===req.params.ISBN){
  //        book.title=req.body.newBookTitle;
  //        return;
  //     }
  // });
  return res.json({books:updatedBook});
  });

  /* 
Route              /book/delete
Description        Delete a book 
Access             PUBLIC
Parameter          ISBN
Methods            DELETE
*/

Router.delete("/delete/:ISBN",async (req,res)=>{

    const updatedBookDatabase= await BookModel.findOneAndDelete({ISBN:req.params.ISBN},)
    // const updatedBookDatabase=database.books.filter((book)=> book.ISBN !== req.params.ISBN);
    // database.books=updatedBookDatabase;
    return res.json({Books:updatedBookDatabase});
});

/* 
Route              /book/update/author
Description        Updating/add new author for Book
Access             PUBLIC
Parameter          ISBN
Methods            PUT
*/

Router.put("/update/author/:ISBN/:authorId",async (req,res)=>{
    //Updating Book Database
    const updatedBook=await BookModel.findOneAndUpdate({
        ISBN:req.params.ISBN
    },
    {
    $addToSet:{
        author:req.body.newAuthor
    }
    },
    {
        new:true
    });
    const updatedAuthor=await AuthorModel.findOneAndUpdate({
        id:req.body.newAuthor
    },
    {
        $push:{
            books:req.params.ISBN
        }
    },
    {
        new:true
    });
     // database.books.forEach((book)=>{
     //     if(book.ISBN===req.params.ISBN){
     //         return book.author.push(parseInt(req.params.authorId));
     //     }
     // });
     // //Update Author database
     // database.author.forEach((author)=>{
     //     if(author.id===parseInt(req.params.authorId)){
     //         return author.books.push(req.params.ISBN);
     //     }
     // });
     return res.json({Books:updatedBook,author:updatedAuthor})
 });

 
/* 
Route              /book/delete/author
Description        Delete a author from Book
Access             PUBLIC
Parameter          ISBN,authorId
Methods            DELETE
*/

Router.delete("/delete/author/:ISBN/:authorId",async (req,res)=>{
    //update the book database
   const updatedBook = await BookModel.findOneAndUpdate(
       {
           ISBN:req.params.ISBN
       },
       {
           $pull:{
               author:parseInt(req.params.authorId)
           }
       },
       {
           new:true
       });

    // database.books.forEach((book)=>{
    //     if(book.ISBN===req.params.ISBN){
    //         const newAuthorList=book.author.filter((author)=>author !== parseInt(req.params.authorId));
    //         book.author=newAuthorList;
    //         return;
    //     }
    // });
    // //update the author database
    const updatedAuthor=await AuthorModel.findOneAndUpdate(
        {
            id:parseInt(req.params.authorId)
        },
        {
            $pull:{
                books:req.params.ISBN
            }
        },
        {
            new:true
        }
    );
    // database.author.forEach((author)=>{
    //     if(author.id===parseInt(req.params.authorId)){
    //         const newBookList=author.books.filter((book)=>book!==req.params.ISBN);
    //         author.books=newBookList;
    //         return;
    //     }
    // });
    return res.json({Book:updatedBook,Author:updatedAuthor,message:"Author was Deleted"})
});

module.exports=Router;