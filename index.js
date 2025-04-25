var express = require('express');
var app = express();
var bodyParser = require('body-parser')
var mySqlDao = require('./sqlDao')
let ejs = require('ejs');
app.set('view engine', 'ejs')
const { check, validationResult } = require('express-validator');
//Variable for controlling if the user is signed in as a guest or not
const path = require('path');

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: false}))
app.use(express.static('public'));
app.use(express.json());

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
    res.render("squadMembers", {filteredMembers: []});
})

app.get("/members/filterMembers", (req, res)=> {
    const filters = req.query;
    const limit = req.query.limit || 10;
    
    mySqlDao.filterSquadMembers(filters, limit)
    .then((data)=>{
        res.render("squadMembers", {"filteredMembers": data});
    })
    .catch((error)=>{
        console.log("Error Encountered While Retrieving data")
        res.send(error);
    })
})

//Rendering the campaings with their details

app.get("/campaigns", (req, res) => {
    // Initially render the page with no campaigns
    res.render("campaigns", { campDetails: [] });
});

app.get("/campaigns/filter", (req, res) => {
    const filters = req.query;

    mySqlDao.filterCampaigns(filters)
        .then((data) => {
            res.render("campaigns", { campDetails: data });
        })
        .catch((error) => {
            console.log("Error Encountered While Filtering Campaigns:", error);
            res.status(500).send("Failed to filter campaigns");
        });
});

app.get("/campaigns/:id", (req, res) => {
    const id = req.params.id;
    Promise.all([
        mySqlDao.getCampaignParticipants(id),
        mySqlDao.getCampDetails(id)
    ])
    .then(([audienceData, campaignDetails]) => {
        res.render("campDetails", {
            "campDetails": campaignDetails,
            "audienceDetails": audienceData,
            "filteredMembers": [], // Initialize with an empty array
        });
    })
    .catch((error) => {
        res.send(error);
    });
});

app.get("/audienceMember/:id", (req, res) => {
    const id = req.params.id;
    const campaignId = req.query.campaignId;
    mySqlDao.getCampMemberDetails(id)
    .then((data) => {
        res.render("audienceMember", {
            "memberDetails": data,
            "campaign": campaignId
        });
    })
    .catch((error) => {
        res.send(error);
    });
});

//Method for removing a member from a campaign
app.post("/campaigns/:campaignId/removeMember/:userId", (req, res) => {
    const { campaignId, userId } = req.params;
    const { audienceId } = req.body; // Extract productVariantId from the request body

    mySqlDao.removeMemberFromCampaign(campaignId, audienceId, userId)
        .then(message => {
            console.log(message);
            res.redirect(`/campaigns/${campaignId}`); // Redirect back to the campaign details page
        })
        .catch(error => {
            console.error("Error removing member from campaign:", error);
            res.status(500).send("Failed to remove member from campaign");
        });
});

app.post("/campaigns/:campaignId/updateMember/:userId", (req, res) => {
    const { campaignId, userId } = req.params;
    const updatedData = req.body;

    mySqlDao.updateAudienceMemberDetails(userId, updatedData)
        .then(() => {
            res.redirect(`/campaigns/${campaignId}`);
        })
        .catch(error => {
            console.error("Error updating member details:", error);
            res.status(500).send("Failed to update member details");
        });
});

app.post("/campaigns/:campaignId/addSelectedMembers", (req, res) => {
    const { campaignId } = req.params;
    const { audienceId } = req.body;

    // Extract and normalize selected members
    const rawMembers = req.body["selectedMembers[]"];
    const selectMems = Array.isArray(rawMembers) ? rawMembers : [rawMembers];

    if (!selectMems || selectMems.length === 0) {
        return res.redirect(`/campaigns/${campaignId}`);
    }

    // Add each selected member to the campaign
    const addMemberPromises = selectMems.map(userId => 
        mySqlDao.addMemberToCampaign(campaignId, audienceId, userId)
    );

    Promise.all(addMemberPromises)
        .then(() => {
            res.redirect(`/campaigns/${campaignId}`);
        })
        .catch(error => {
            console.error("Error adding selected members to campaign:", error);
            res.status(500).send("Failed to add selected members to campaign");
        });
});

app.get("/campaigns/:campaignId/filterMembers", (req, res) => {
    const { campaignId } = req.params;
    const { audienceId } = req.body; // Extract audienceId from the request body
    const filters = req.query;
    const limit = req.query.limit || 10; // Default limit if not provided

    Promise.all([
        mySqlDao.getCampaignParticipants(campaignId),
        mySqlDao.getCampDetails(campaignId),
        mySqlDao.filterEligibleMembers(campaignId, filters, audienceId, limit)
    ])
    .then(([audienceData, campaignDetails, filteredMembers]) => {
        res.render("campDetails", {
            "campDetails": campaignDetails,
            "audienceDetails": audienceData,
            "filteredMembers": filteredMembers, // Pass filtered members
        });
    })
    .catch(error => {
        console.error("Error filtering members:", error);
        res.status(500).send("Failed to filter members");
    });
});