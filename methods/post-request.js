const crypto = require("crypto")
const requestBodyParser = require("../util/body-parser")
const { write } = require("fs")
const writeToFile = require("../util/write-to-file")
module.exports = async(req, res) =>{
    if (req.url === '/api/movies/'){
        try{
            let body = await requestBodyParser(req);
            body.id = crypto.randomUUID();
            req.movies.push(body);
            writeToFile(req.movies);
            res.writeHead(201, {"Content-Type": "application/json"})
            console.log('Request Body', body);
            res.end(JSON.stringify(body));
        }catch(err){
            console.log(err)
            res.writeHead(400, {"Content-Type": "application/json"})
            res.end(
                JSON.stringify({
                    title:"Validation Error",
                    message:"Request Body is not vaild"
                })
            )
        }
    }
    else{
        res.writeHead(404, {"Content-Type":"application/json"});
        res.end(JSON.stringify({title:"Not Found",message:"Hello to the userss"}));
    }

}