/**
 * Created by Maor on 11/28/2015.
 */

var express = require('express');
var router = express.Router();

var advertises = [
    {
        msgName:"Flights Discount Message",
        msgData: ["Don't Miss The Chance To Visit Israel",
            "Discover the beauty of Tel Aviv",
            "Flights to Croatia from 400$",
            "Connections Flights is also fun"],
        msgImage: ['flight1.jpg','telAviv-israel.jpg'],
        linkTemplate:"TemplateOne.html",
        advTimer:"40000",
        startDate:"01/01/2016",
        endDate:"12/31/2016",
        daysShow:["monday","wednesday"],
        srartTime:"06:00:00",
        endTime:"12:00:00"
    },

    {
        msgName:"Hottles Sales Message",
        msgData: ["Mercure Paris Centre Tour Eiffel - 109 EUR",
            "Novotel Paris Gare de Lyon - 113 EUR",
            "Adriana Hvae  Spa Hotel - 324 EUR",
            "Inn Resort Phi Phi Island - 599 EUR",
            "InterContinental Tel Aviv - 1999 EUR",
            "Dan Eilat - 899 EUR",
            "Isrotel Agamim Eilat - 799 EUR",
            "InterContinental Bangkok - 350 EUR",
            "Queen of Sheba Eilat - 450 EUR",
            "Tifani Luxury Rooms Split, Croatia - 267 EUR"],
        msgImage: ['summer-holiday.jpg'],
        linkTemplate:"TemplateTwo.html",
        advTimer:"35000",
        startDate:"03/01/2016",
        endDate:"04/30/2016",
        daysShow:["tuesday","wednesday"],
        srartTime:"10:00:00",
        endTime:"16:00:00"
    },
    {
        msgName:"Blank Message",
        msgData: [],
        msgImage: [],
        linkTemplate:"TemplateTree.html",
        advTimer:"8000",
        startDate:"05/01/2016",
        endDate:"06/15/2016",
        daysShow:["sunday","monday","tuesday","wednesday","thursday","friday","saturday"],
        srartTime:"08:00:00",
        endTime:"22:00:00"
    },
    {
        msgName:"Festival Package Trips",
        msgData: ["Ultra Europe Festival 2016", "TomorrowLand Festival 2016"],
        msgImage: [],
        linkTemplate:"TemplateOne.html",
        advTimer:"15000",
        startDate:"03/29/2016",
        endDate:"04/15/2016",
        daysShow:["monday"],
        srartTime:"15:00:00",
        endTime:"19:00:00"
    },

    {
        msgName:"Beautiful Views to visit",
        msgData: ["Aogashima Volcano, Japan",
            "Glass Beach, California, USA",
            "Hiller lake(pink lake), Western Australia",
            "Chittorgarh Fort, India",
            "Cinque Terre, Rio Maggiore, Italy",
            "Fairy Pools, Isle of Skye, Scotland",
            "Mamanuca Islands, Fiji"],
        msgImage: ['Glass-beach-california.jpg','Fiji-Japan.jpg'],
        linkTemplate:"TemplateTwo.html",
        advTimer:"30000",
        startDate:"04/01/2016",
        endDate:"04/30/2016",
        daysShow:["monday","thursday","wednesday"],
        srartTime:"01:00:00",
        endTime:"23:00:00"
    }];



/* GET home page. */
router.get('/screen=1', function(req, res, next) {
    res.render('template1', advertises);
});

module.exports = router;
