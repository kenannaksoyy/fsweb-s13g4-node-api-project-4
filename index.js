require("dotenv").config();
const server = require("./api/server.js");
const port = process.env.port || 5000;

server.listen(port, ()=>{
    console.log(`${port} dinleniyor`);
});