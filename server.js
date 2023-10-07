const http = require("http");
require("dotenv").config()
const getReq = require("./methods/get-request")
const putReq = require("./methods/put-request")
const deleteReq = require("./methods/delete-request")
const postReq = require("./methods/post-request")
let movies = require("./data/movies.json")
const PORT = process.env.PORT || 5001;

const server = http.createServer((req, res)=>{
    req.movies = movies;
    switch(req.method){
        case "GET":
            getReq(req,res);
            break;
        case "POST":
            postReq(req,res);
            break;
        case "PUT":
            putReq(req,res);
            break;
        case "DELETE":
            deleteReq(req,res);
            break;
        default:
            res.statusCode = 404;
            res.setHeader("Content-Type", "application/json");
            res.write(JSON.stringify({title:"Not Found",message:"Hello to the users"}));
            res.end()
            
    }


});

server.listen(PORT, () =>{
    console.log(`Server started port on :${PORT}`)
})