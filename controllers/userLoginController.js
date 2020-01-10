var regUsers = require("../models/usersModel.js");
const bcrypt = require("bcrypt");


function login(req,res,next){
    if(!req.body.username){
        res.send("Username is required");
    }
    if(!req.body.password){
        res.send("Password is required");
    }
    if(req.body.password === null){
        res.send("Password cannot be empty");
    }
    if(req.body.username === null)
        {
        res.send("Username cannot be empty");
        }
        
        regUsers.findOne({
            where: {Username: req.body.username}
        })
        .then(function (result) {
            if (result === null) {
                res.send("Username not found. Please enter valid Username")
            } else {
                console.log(result.dataValues.Password);
                req.passwordFromDB = result.dataValues.Password;
                req.regUsers = result.dataValues.Username;
                next();
            }
        })
        .catch(function (err) {
            // console.log(err);
        });
    };
       

        module.exports={login};