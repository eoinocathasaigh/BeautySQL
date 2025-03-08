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

//Routing in the application
//Returning the content of the home page - what the user will initially see
app.get("/", (req, res)=> {
    res.render("home");
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

app.get("/campaigns/:campRef", (req, res)=> {
    mySqlDao.getCampaignDetails(req.params.campRef)
    .then((data)=>{
        res.render("campDetails", {"campDetails": data});
    })
    .catch((error)=>{
        res.send(error);
    })
})

/*
//Rendering specific data based on the specified campaign
app.get("/campaigns", async(req, res)=> {
    // routes.js
    try {
      // Get all campaigns for the dropdown
      const campaigns = await mySqlDao.getCamps();
      
      console.log("Something is working")
      // Check if a campaign ID was selected
      const selectedCampaignId = req.query.campaignId;
      let campaignData = null;
      
      if (selectedCampaignId) {
        // If a campaign was selected, get its data
        campaignData = await mySqlDao.getCampaignDetails(selectedCampaignId);
      }
      
      // Render the page with both the dropdown options and any selected campaign data
      res.render('campaigns', { 
        campaigns, 
        campaignData,
        selectedCampaignId 
      });
    } catch (error) {
      console.error('Error loading campaigns:', error);
      res.status(500).send('Error loading campaigns');
    }
})*/