const express = require('express')
const fs = require('fs')
const path = require('path')
const dotenv = require('dotenv')
const authRouter = require('./routers/AuthRouter')
const webRouter = require('./routers/WebRouter')
const fileUpload = require('express-fileupload')

const booktabPath = path.join(__dirname, 'views', 'booktab.ejs');

dotenv.config();
const server = express()
server.use(express.urlencoded())
server.use(fileUpload())
 server.use(express.json())

server.get("/",(request,respose)=>
{
    respose.setHeader('Content-Type','text/html');
    respose.send(fs.readFileSync(path.join(__dirname,'apiDocs.html'),'utf-8'))
})

server.get('/booktab', (req, res) => {

    res.render(booktabPath, { data });
});

server.use("/store",webRouter)
server.use("/auth",authRouter)


server.listen(process.env.PORT,()=>
{
    console.log(`Server Running http://localhost:${process.env.PORT}`)
});
