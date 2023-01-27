const express = require("express");
const cors = require("cors");
const { getAllUsers, createNewUser, checkRegisterUser } = require("./userModel");
const mW = require("./middleware.js");

const server = express();
server.use(express.json());
server.use(cors());
server.use(mW.logger);

server.get("/api/kullanicilar", (req, res, next) => {
    getAllUsers()
    .then(allUsers => {
        res.status(200).json(allUsers);
    })
    .catch(err => {
        next(err);
    })
    
});

server.post("/api/kayitol",mW.validateNewUser,(req, res, next)=>{
    createNewUser(req.user)
    .then(newUser => {
        res.status(201).json(newUser);
    })
    .catch(err => {
        next(err);
    })
});

server.post("/api/giris",mW.validateRegisteredUser,async(req,res,next)=>{
    try{
        res.status(201).json({
            message:`Hoşgeldin ${req.body.kullaniciadi}`
        });
    }
    catch(err){
        next(err);
    }
})

server.use((err,req,res,next) => {
    if(!err){
        res.status(500).json({
            message: "Bir Hata oldu"
        })
    }
    else{
        res.status(err.status).json({
            message:err.message
        })
    }
});
  

module.exports = server