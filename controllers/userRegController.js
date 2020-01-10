var regUsers = require("../models/usersModel.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")

function hashPassword(req,res,next){
    const saltRounds = 10;
    bcrypt.hash(req.body.password, saltRounds).then(function(hash) {
        // Store hash in your password DB.
        req.hashedPassword=hash;
        next();
    }).catch(function(err){
        next("Hashing Error");
    });
}

function register(req, res, next) {

    regUsers.create({
        Username: req.body.username,
        Email: req.body.email,
        Password: req.hashedPassword
    })
        .then(function (result) {
            // console.log(req.hashedPassword);
            res.json({
                status: 200,
                message: "User Registered Successfully",
            });
            
        })
        .catch(next) 
};

function extractUsers(req,res,next){
    regUsers.findOne({
        where:{Username:req.params.username}
    })
    .then(function(result){
        if(result===null){
            res.send("User Not Found. You have to be registered");
        }
        else{
            Username=result.dataValues.username;
            Email=result.dataValues.email;
            res.json({
                username:Username,
                email:Email,
            });
        

    } 
    }).catch(function(err){
        next(err);
    });
}



module.exports = {
    register, hashPassword, extractUsers
}

