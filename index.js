require("dotenv").config();
//Framework
const express=require("express");
const mongoose=require("mongoose");

//Database
const database=require("./database/index");

//Models
const BookModel=require("./database/book");
const AuthorModel=require("./database/author");
const PublicationModel=require("./database/publication");


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

/* 
Route              /
Description        Get all Books
Access             PUBLIC
Parameter          None
Methods            GET
*/

//For All Books
booky.get("/",async(req,res)=>{
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
booky.get("/is/:ISBN",async (req,res)=>{

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
booky.get("/c/:Category",async (req,res)=>{
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
booky.get("/l/:Language",async (req,res)=>{
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
Route              /author
Description        Get all Author
Access             PUBLIC
Parameter          None
Methods            GET
*/

booky.get("/author",async (req,res)=>{
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
booky.get("/author/:name",async (req,res)=>{
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

booky.get("/author/book/:ISBN",async (req,res)=>{
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
Route              /publication
Description        Get All Publications
Access             PUBLIC
Parameter          None
Methods            GET
*/

booky.get("/publication",async (req,res)=>{
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

booky.get("/publication/:name",async (req,res)=>{
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
booky.get("/publication/isbn/:ISBN",async (req,res)=>{
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
Route              /book/add
Description        Adding a new Book
Access             PUBLIC
Parameter          None
Methods            POST
*/

booky.post("/book/add",async (req,res)=>{
    const {newBook} = req.body;
    const addNewBook = BookModel.create(newBook); 
    // database.books.push(newBook);
    return res.json({Books:addNewBook})
});

/* 
Route              /author/add
Description        Adding a new Author
Access             PUBLIC
Parameter          None
Methods            POST
*/
booky.post("/author/add",(req,res)=>{
    const {newAuthor}=req.body;
    // database.author.push(newAuthor);
    AuthorModel.create(newAuthor);
    return res.json({Author:newAuthor});
});

/* 
Route              /publication/add
Description        Adding a new publication
Access             PUBLIC
Parameter          None
Methods            POST
*/
booky.post("/publication/add",(req,res)=>{
    const {newPublication}=req.body;
    // database.publication.push(newPublication);
    PublicationModel.create(newPublication)
    return res.json({Publication:newPublication});
});

/* 
Route              /book/update/title
Description        Updating Book title based on ISBN
Access             PUBLIC
Parameter          ISBN
Methods            PUT
*/
booky.put("/book/update/title/:ISBN",async (req,res)=>{
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
Route              /book/update/author
Description        Updating/add new author for Book
Access             PUBLIC
Parameter          ISBN
Methods            PUT
*/

booky.put("/book/update/author/:ISBN/:authorId",(req,res)=>{
   //Updating Book Database
    database.books.forEach((book)=>{
        if(book.ISBN===req.params.ISBN){
            return book.author.push(parseInt(req.params.authorId));
        }
    });
    //Update Author database
    database.author.forEach((author)=>{
        if(author.id===parseInt(req.params.authorId)){
            return author.books.push(req.params.ISBN);
        }
    });
    return res.json({Books:database.books,author:database.author})
});

/* 
Route              /author/update/name
Description        Updating author name based on id
Access             PUBLIC
Parameter          Id
Methods            PUT
*/

booky.put("/author/update/name/:id",(req,res)=>{
    database.author.forEach((author)=>{
        if(author.id===req.params.id){
           author.name=req.body.newAuthorName;
           return;
        }
    });
    return res.json({Author:database.author});
    });

/* 
Route              /publication/update/name
Description        Updating publication name based on id
Access             PUBLIC
Parameter          Id
Methods            PUT
*/
booky.put("/publication/update/name/:id",(req,res)=>{
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

booky.put("/publication/update/book/:ISBN",(req,res)=>{
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
Route              /book/delete
Description        Delete a book 
Access             PUBLIC
Parameter          ISBN
Methods            DELETE
*/

booky.delete("/book/delete/:ISBN",(req,res)=>{
    const updatedBookDatabase=database.books.filter((book)=> book.ISBN !== req.params.ISBN);
    database.books=updatedBookDatabase;
    return res.json({Books:database.books});
});

/* 
Route              /book/delete/author
Description        Delete a author from Book
Access             PUBLIC
Parameter          ISBN,authorId
Methods            DELETE
*/

booky.delete("/book/delete/author/:ISBN/:authorId",(req,res)=>{
    //update the book database
    database.books.forEach((book)=>{
        if(book.ISBN===req.params.ISBN){
            const newAuthorList=book.author.filter((author)=>author !== parseInt(req.params.authorId));
            book.author=newAuthorList;
            return;
        }
    });
    //update the author database
    database.author.forEach((author)=>{
        if(author.id===parseInt(req.params.authorId)){
            const newBookList=author.books.filter((book)=>book!==req.params.ISBN);
            author.books=newBookList;
            return;
        }
    });
    return res.json({Book:database.books,Author:database.author,message:"Author was Deleted"})
});

/* 
Route              /author/delete
Description        Delete a author 
Access             PUBLIC
Parameter          authorId
Methods            DELETE
*/
booky.delete("/author/delete/:authorId",(req,res)=>{
    const updatedAuthorDatabase=database.author.filter((author)=> author.id !==parseInt(req.params.authorId));
    database.author=updatedAuthorDatabase;
    return res.json({Author:database.author});
});

/* 
Route              /publication/delete
Description        Delete a publication 
Access             PUBLIC
Parameter          Id
Methods            DELETE
*/

booky.delete("/publication/delete/:id",(req,res)=>{
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

booky.delete("/publication/delete/book/:ISBN/:pubId",(req,res)=>{
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


booky.listen(3000,()=>console.log("Server is Running successfully"));
