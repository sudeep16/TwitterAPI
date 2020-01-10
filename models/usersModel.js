var db = require("../config/dbConfig.js");
var user = db.sequelize.define("usersRegistered", {
    Id: {
        type: db.Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false

    },  Username: {
        type: db.Sequelize.TEXT,
        allowNull: false

    },  Email: {
        type: db.Sequelize.TEXT,
        allowNull: false

    },  Password: {
        type: db.Sequelize.TEXT,
        allowNull: false

    },  Gender: {
        type: db.Sequelize.TEXT,
        allowNull: true

    },  Phone:{
        type: db.Sequelize.BIGINT,
        allowNull:true

    },  Bio: {
        type: db.Sequelize.TEXT,
        allowNull: true

    },  Location: {
        type: db.Sequelize.TEXT,
        allowNull: true

    },  Website: {
        type: db.Sequelize.TEXT,
        allowNull:true

    },  imgProfile:{
        type:db.Sequelize.TEXT,
        allowNul:true
    }

    
},
{
    //Prevent from creating different tables of same name 
    freezeTableName: true,

});

user.sync({
    force: false
})
.then(function(){

}).catch(function(error){
    console.log(error);
});

module.exports = user;