var express = require('express');
var app = express();
var bodyParser = require('body-parser')
var mySqlDao = require('./sqlDao')
let ejs = require('ejs');
app.set('view engine', 'ejs')
const { check, validationResult } = require('express-validator');
//Variable for controlling if the user is signed in as a guest or not
var guest;

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: false}))
app.use(express.static('public'));

//Making our app listen on port 3004
//Listening for connections on a certain port
app.listen(4000, ()=>{
    console.log("App is listening for connection");
})


//Routing in the application
//Returning the content of the home page - what the user will initially see
app.get("/", (req, res)=> {
    res.render("login");
})

app.post("/login", (req, res) => {

    guest = false;
    
    const { hostname, username, password, database } = req.body;

    if (!hostname || !username || !password || !database) {
        return res.send(`<script>alert("Please fill in all fields."); window.location.href = "/";</script>`);
    }

    mySqlDao.login(hostname, username, password, database)
        .then(() => {
            res.redirect("/members");
        })
        .catch((error) => {
            console.log("Database Connection Failed:", error); // Debugging log
            res.send(`<script>alert("Error encountered while logging in. Ensure credentials are correct and try again."); window.location.href = "/";</script>`);
        });
});

app.get("/login/guest", (req, res) => {
    res.render("guestLogin");
});

app.post("/login/guest", (req, res) => {
    guest = true;
    const { hostname, database } = req.body;

    if (!hostname || !database) {
        return res.send(`<script>alert("Please fill in all fields."); window.location.href = "/login/guest";</script>`);
    }

    mySqlDao.login(hostname, "root", "root", database)
    .then(() => {
        res.redirect("/members");
    })
    .catch((error) => {
        console.log("Database Connection Failed:", error); // Debugging log
        res.send(`<script>alert("Error encountered while logging in. Ensure credentials are correct and try again."); window.location.href = "/";</script>`);
    });
});

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
        res.render("squadMembers", {"squadMembers": data, guest});
    })
    .catch((error)=>{
        console.log("Error Encountered While Retrieving data")
        res.send(error);
    })
})

//Rendering the campaings with their details

app.get("/campaigns", (req, res)=> {
    mySqlDao.getValidCamps()
    .then((data)=>{
        res.render("campaigns", {"campDetails": data, guest});
    })
    .catch((error)=>{
        res.send(error);
    })
})

app.get("/campaigns/:id", (req, res) => {
    const id = req.params.id;
    const campaignRef = req.query.ref; // Extract the campaign reference from the query parameter
    Promise.all([
        mySqlDao.getCampaignParticipants(id),
        mySqlDao.getCampDetails(id),
        mySqlDao.getEligibleMembers(campaignRef, id)
    ])
    .then(([audienceData, campaignDetails, availableMembers]) => {
        res.render("campDetails", {
            "campDetails": campaignDetails,
            "audienceDetails": audienceData,
            "availableMembers": availableMembers
        });
    })
    .catch((error) => {
        res.send(error);
    });
});