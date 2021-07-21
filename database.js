const books=[{
    ISBN:"12345Book",
    title:"getting Started with MERN",
    pubDate:"2021-07-20",
    language:"en",
    numPage:250,
    author:[1,2],
    publication:[1],
    category:["tech","Programming","education","thriller"]
}];

const author=[
    {
    id:1,
    name:"Phaneendra",
    books:["12345Book"],
    },
    {
    id:2,
    name:"Elon Musk",
    books:["12345Book"],
    }
];

const publication=[
    {
        id:1,
        name:"writex",
        books:["12345Book"]
    },
    {
        id:2,
        name:"writex Publication",
        books:[""]
    }
];

module.exports={books,author,publication};