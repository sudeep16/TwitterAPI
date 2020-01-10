"use strict";
var userRegController = require("./controllers/userRegController.js");
var userAuth = require("./controllers/userAuthController.js")
var userLogin = require("./controllers/userLoginController.js")
const express = require("express");
const twitter = express();
const bodyParser = require("body-parser");
const multer  = require("multer");

var storage = multer.diskStorage(
    {
        destination: "./users/upload/",
        filename: function ( req, file, cb ){
            let imgObtain = new Date().valueOf();
            cb( null, imgObtain + file.originalname);
        }
    }
);

var store = multer( { storage: storage } );

twitter.use(bodyParser.urlencoded({extended:true}));

twitter.post("/register", userAuth.registrationValidation, userRegController.hashPassword,userRegController.register);
twitter.post('/upload',store.single("imgProfile"),function(req,res){
	console.log(req.body);
    if(req.file === undefined|null){
        res.status(500);
        res.json({
        status:500,
        messsage:"Please Select an Image"
            });
            
    }
    else{
        res.status(201);
        res.json({
        status:201,
        filename:req.file.filename
            });
    }
});

twitter.post("/login", userLogin.login, userAuth.loginCheck, userAuth.jwtTokenGen, userAuth.verfiyToken);

twitter.get("/:Username", userRegController.extractUsers)


//, userLogin.loginCheck, userAuth.jwtTokenGen, userAuth.logIn


twitter.listen(2020);

