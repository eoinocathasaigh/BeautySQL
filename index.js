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

//Allowing the user to update the details of a member
app.post("/members/edit/:id", (req, res)=> {
    const id = req.params.id;
    const {username, fname, sname, email, country, dob, gender, vide_rev, heard, status, lastLog, create, instHand, tikHand, instFol, profShar, profAtts, profBio, profImgId, profNews, skinTone, complex, sensSkin, skinType, skinLin, skinBreak, lPore, hypPig, unevTone, dehyd, acne, dullSkin, rosa, darkSpots, sunDam, puffy, cysAcne, eyeCol, eyeDark, eyeLines, eyeDroop, eyePuffy, eyeHollows, eyeNone, lipsNormal, lipsDry, lipsCracked, lipsColdSores, lipsThin, lipsChapped, bodySkinType, bodyCellulite, bodyStretchMarks, bodyDehydration, bodyMenopausal, bodyItchySkin, bodyEczema, bodyPsoriasis, bodyVitiligo, bodyKeratosisPilaris, bodyNone, hairStruct, moistLvl, hairCol, hairType, hairColTreat, hairColTreatHow, hairFrizz, hairDandruff, hairDamage, hairColoured, hairLackVolume, hairLoss, hairAgeing, hairSplitEnds, hairLackShine, hairPsoriasis, hairOilyScalp, hairItchyScalp, hairHeatDamaged, hairThining, hairAlopecia, hairDryScalp, hairNone, scentsClean, scentsFloral, scentsOriental, scentsWoody, scentsCitrus, scentsFruity, scentsGreen, scentsOceanic, scentsSpicy, productAntiAgeing, productClean, productContainsAloe, productContainsCaffeine, productContainsRetinol, productContainsShea, productContainsSpf, productCrueltyFree, productEcoFriendly, productHalal, productNatural, productOrganic, productVeganFriendly, productSustainable, purFact1, purFact2, purFact3, purFact4, purFact5, purFact6, purFact7, purFact8, purFact9, purFact10, trySkin, tryHair, tryMake, edu, emp, un18, add1, add2, city, county, postcode, phoneCode, phoneNum, phoneConfAt} = req.body;
    const updatedData = {username, fname, sname, email, country, dob, gender, vide_rev, heard, status, lastLog, create, instHand, tikHand, instFol, profShar, profAtts, profBio, profImgId, profNews, skinTone, complex, sensSkin, skinType, skinLin, skinBreak, lPore, hypPig, unevTone, dehyd, acne, dullSkin, rosa, darkSpots, sunDam, puffy, cysAcne, eyeCol, eyeDark, eyeLines, eyeDroop, eyePuffy, eyeHollows, eyeNone, lipsNormal, lipsDry, lipsCracked, lipsColdSores, lipsThin, lipsChapped, bodySkinType, bodyCellulite, bodyStretchMarks, bodyDehydration, bodyMenopausal, bodyItchySkin, bodyEczema, bodyPsoriasis, bodyVitiligo, bodyKeratosisPilaris, bodyNone, hairStruct, moistLvl, hairCol, hairType, hairColTreat, hairColTreatHow, hairFrizz, hairDandruff, hairDamage, hairColoured, hairLackVolume, hairLoss, hairAgeing, hairSplitEnds, hairLackShine, hairPsoriasis, hairOilyScalp, hairItchyScalp, hairHeatDamaged, hairThining, hairAlopecia, hairDryScalp, hairNone, scentsClean, scentsFloral, scentsOriental, scentsWoody, scentsCitrus, scentsFruity, scentsGreen, scentsOceanic, scentsSpicy, productAntiAgeing, productClean, productContainsAloe, productContainsCaffeine, productContainsRetinol, productContainsShea, productContainsSpf, productCrueltyFree, productEcoFriendly, productHalal, productNatural, productOrganic, productVeganFriendly, productSustainable, purFact1, purFact2, purFact3, purFact4, purFact5, purFact6, purFact7, purFact8, purFact9, purFact10, trySkin, tryHair, tryMake, edu, emp, un18, add1, add2, city, county, postcode, phoneCode, phoneNum, phoneConfAt}
    mySqlDao.updateMember(id, updatedData)
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

app.get("/campaigns/:campRef", (req, res)=> {
    mySqlDao.getCampaignDetails(req.params.campRef)
    .then((data)=>{
        res.render("campDetails", {"campDetails": data});
    })
    .catch((error)=>{
        res.send(error);
    })
})