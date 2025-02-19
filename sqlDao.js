//This data access object will enable interaction with the sql in the actual database
var pmysql = require("promise-mysql");
var pool;

//Creating a pool of connections for this program
pmysql.createPool({
    //For the sake of simplicity this app will allow you to run up to 5 versions of it at once for now
    connectionLimit : 5,
    host : 'localhost',
    user : 'root',
    password : 'root',
    database : 'mydb'
    })
    //p passes back the connection to the database
    .then((p) => {
        pool = p
    })
    .catch((e) => {
        console.log("pool error:" + error)
    })

//Members methods & logic
//Displaying all the beauty squad members
var getMembers = function(){
    //This method will allow me to pull any necessary info from the db regarding the beauty squad members
}

//Participants methods  logic
//Getting the participants from the database to be displayed
var getParticipants = function(){

}

//Campaing methods & logic
var getCampaigns = function(){

}

module.exports = {getMembers, getParticipants, getCampaigns}