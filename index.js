var express = require('express');
var app = express();
var bodyParser = require('body-parser')
var mySqlDao = require('./sqlDao')
let ejs = require('ejs');
app.set('view engine', 'ejs')
const { check, validationResult } = require('express-validator');

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: false}))
app.use(express.static('public'));

//Making our app listen on port 3004
//Listening for connections on a certain port
app.listen(3000, ()=>{
    console.log("App is listening for connection");
})

/*
//Routing in the application
//Returning the content of the home page - what the user will initially see
app.get("/", (req, res)=> {
    res.render("home");
})
*/

app.get("/", (req, res)=> {
    mySqlDao.getCamps()
    .then((data)=>{
        res.render("campaigns", {"campDetails": data});
    })
    .catch((error)=>{
        res.send(error);
    })
})

//Rendering the page for the individual beauty squad member details
app.get("/members/edit/:id", (req, res)=> {
    const id = req.params.id;
    mySqlDao.memberDetails(id)
    .then((data)=>{
        res.render("memberDetails", {memberDetails: data, id});
    })
    .catch((error)=>{
        console.log("Error Encountered While Retrieving data")
        res.send(error);
    })
})

//Allowing the user to update the details of a member
app.post("/members/edit/:id", (req, res)=> {
    const userId = req.params.id;
    const updatedData = req.body;

    mySqlDao.updateMember(userId, updatedData)
    .then(()=>{
        res.redirect("/members");
    })
    .catch((error)=>{
        console.log("Error Encountered While Retrieving data")
        res.send(error);
    })
})

//Rendering the members and their details
app.get("/members", (req, res)=> {
    mySqlDao.getMembers()
    .then((data)=>{
        console.log("Correctly retrieved data")
        res.render("squadMembers", {"squadMembers": data});
    })
    .catch((error)=>{
        console.log("Error Encountered While Retrieving data")
        res.send(error);
    })
})

//Rendering the campaings with their details

app.get("/campaigns", (req, res)=> {
    mySqlDao.getCamps()
    .then((data)=>{
        res.render("campaigns", {"campDetails": data});
    })
    .catch((error)=>{
        res.send(error);
    })
})

app.get("/campaigns/:id", (req, res)=> {
    const id = req.params.id;
    mySqlDao.getCampaignDetails(id)
    .then((data)=>{
        res.render("campDetails", {"campDetails": data});
    })
    .catch((error)=>{
        res.send(error);
    })
})