var regUsers = require("../models/usersModel.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")

function registrationValidation(req,res,next){
    if(!req.body.username){
        res.send("Username is required");
    }
    if(!req.body.email){
        res.send("Email is required");
    }
    if(!req.body.password){
        res.send("Password is required");
    }
    if(req.body.username === null)
    {
        res.send("Username cannot be empty");
    }
    if(req.body.password === null)
    {
        res.send("Password cannot be empty");
    }

    if(req.body.username){
        regUsers.findOne({
        where:{Username: req.body.username}
        })
        .then(function(result){
        if(result !== null){
            res.status(303);
            res.json({
                status:303,
                messsage:"User already exist, please enter new username"
            });
          
        }
        else{
            if(req.body.email){
                if(req.body.email === null){
                    res.send("Please enter email");   
                }else{
                    regUsers.findOne({
                        where:{Email:req.body.email}
                        })
                        .then(function(result){
                        if(result !== null){
                            res.status(303);
                            res.json({
                                status:303,
                                messsage:"User already exist, please enter new email"
                            });
                            
                        }
                        else{
                            next();
                        }
                        })
                        .catch(function(err){
                            console.log(err);
                        });
                }
               
            }

            }        
        })
        .catch(function(err){
            console.log(err);
        });
            }
        }


        function loginCheck(req,res,next){
            if(req.passwordFromDB !==null){
                bcrypt.compare(req.body.password, req.passwordFromDB).then(function(result) {
                    res.send("User Login Success");
                    next();  
                }).catch(function(err){
                    next("Hassing error");
                });  
            } else{
                res.end("User login Unsuccessful");
            }
        
        }



        function jwtTokenGen(req,res,next){
            // console.log(req.regUsers);
            var payload={
                Username:req.regUsers,
                Userlevel:"users",
            }
        
            jwt.sign(payload,"ThisisSecret",{expiresIn:"12h"},
            function(err,resultToken){
                // console.log(err)
                // console.log(resultToken)
                req.token=resultToken;
                // next();
            })
        }
        
        
      
        function verfiyToken(req,res,next){
            if(req.token){
            res.json({
                status:202,
                Username:req.regUsers,
                usertoken:req.token});
            }

        }

    

    module.exports = {registrationValidation, loginCheck, jwtTokenGen, verfiyToken}