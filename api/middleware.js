const { findUser, checkRegisterUser } = require("./userModel");

function logger(req, res, next) {
    const{method,originalUrl} = req; 
    const timeStamp = new Date().toLocaleString();
    console.log(`İşlem: [${timeStamp}] ** ${method} -> ${originalUrl}`);
    next();
}

async function validateNewUser(req, res, next) {
    const {kullaniciadi, sifre} = req.body;
    if(!kullaniciadi || !sifre){
        res.status(400).json({
            message: "kullaniciadi ve sifre bilgileri tam değil"
        })
    }
    else{
        
        const checkCode = await findUser(req.body);
        if(checkCode == 1){
            res.status(422).json({
                message: "kullanici adi sahibi var"
            })
        }
        else{
            req.user={kullaniciadi:kullaniciadi,sifre:sifre};
            next();
        }
        
    }
}

async function validateRegisteredUser(req, res, next){
    const {kullaniciadi, sifre} = req.body;
    if(!kullaniciadi || !sifre){
        res.status(400).json({
            message: "kullaniciadi ve sifre bilgileri tam değil"
        })
    }
    else{
        const checkCode = await checkRegisterUser(req.body);
        if(checkCode == 0){
            res.status(404).json({
                message: "kullanici adi veya sifre yanlis"
            })
        }
        else{
            next();
        }
    }
}

module.exports = {logger, validateNewUser, validateRegisteredUser};