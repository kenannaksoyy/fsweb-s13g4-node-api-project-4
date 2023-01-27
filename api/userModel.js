const { v1: uuidv1} = require("uuid");
function createId() {
    return uuidv1();
  }
const initializeUsers = () => (
    [
        { id: createId(), kullaniciadi: "Kenan", sifre: "123456" },
        { id: createId(), kullaniciadi: "Ali", sifre: "357159"},
        { id: createId(), kullaniciadi: "Recep", sifre: "157"},
        { id: createId(), kullaniciadi: "Saban", sifre: "6262"},
        { id: createId(), kullaniciadi: "Ramazan", sifre: "321"},
        { id: createId(), kullaniciadi: "Hakan", sifre: "5871"}
    ]
);
let users = initializeUsers();

const getAllUsers = () => {
    return Promise.resolve(users);
}

const createNewUser = (user) => {
    user.id=createId();
    users.push(user);
    return Promise.resolve(user);
}

const findUser = (user) => {
    let checkCode = 0
    users.forEach(u => {
        if(u.kullaniciadi == user.kullaniciadi){
            checkCode=1;
        }
    });
    return Promise.resolve(checkCode);
}

const checkRegisterUser = (user) => {
    let checkCode = 0
    users.forEach(u => {
        if(u.kullaniciadi == user.kullaniciadi && u.sifre == user.sifre){
            checkCode=1;
        }
    });
    return Promise.resolve(checkCode);
}

module.exports = {getAllUsers, createNewUser, findUser,checkRegisterUser};