/**
 * Created by Maor on 12/10/2015.
 */


var Adv = require('../api/ad/ad.model');

Adv.find({}).remove(function() {
    Adv.create({
            msgName: "Flights Discount Message",
            msgData: ["Don't Miss The Chance To Visit Israel",
                "Discover the beauty of Tel Aviv",
                "Flights to Croatia from 400$",
                "Connections Flights is also fun"
            ],
            msgImage: ["flight1.jpg", "telAviv-israel.jpg"],
            linkTemplate: "assets/templates/A.html",
            templateName: "A",
            advTimer: "40000",
            when: { startDate: "01/01/2016",
                endDate: "12/31/2016",
                daysShow: ["wednesday"],
                startTime: "13:00:00",
                endTime: "20:00:00"},
            screensId: [1,2]
        },
        {
            msgName: "Flights Discount Message",
            msgData: ["Don't Miss The Chance To Visit Israel",
                "Discover the beauty of Tel Aviv",
                "Flights to Croatia from 400$",
                "Connections Flights is also fun"
            ],
            msgImage: ["flight1.jpg", "telAviv-israel.jpg"],
            linkTemplate: "assets/templates/A.html",
            templateName: "A",
            advTimer: "40000",
            when: { startDate: "01/01/2016",
                endDate: "12/31/2016",
                daysShow: ["monday"],
                startTime: "06:00:00",
                endTime: "12:00:00"},
            screensId: [1,2]
        },
        {
            msgName: "Hottles Sales Message",
            msgData: ["Mercure Paris Centre Tour Eiffel - 109 EUR",
                "Novotel Paris Gare de Lyon - 113 EUR",
                "Adriana Hvae  Spa Hotel - 324 EUR",
                "Inn Resort Phi Phi Island - 599 EUR",
                "InterContinental Tel Aviv - 1999 EUR",
                "Dan Eilat - 899 EUR",
                "Isrotel Agamim Eilat - 799 EUR",
                "InterContinental Bangkok - 350 EUR",
                "Queen of Sheba Eilat - 450 EUR",
                "Tifani Luxury Rooms Split, Croatia - 267 EUR"
            ],
            msgImage: ["summer_holiday.jpg"],
            linkTemplate: "assets/templates/B.html",
            templateName: "B",
            advTimer: "100000",
            when: { startDate: "03/01/2016",
                endDate: "04/30/2016",
                daysShow: ["tuesday", "wednesday"],
                startTime: "10:00:00",
                endTime: "16:00:00"},
            screensId: [1,3]
        },
        {
            msgName: "Blank Message",
            msgData: [],
            msgImage: [],
            linkTemplate: "assets/templates/C.html",
            templateName: "C",
            advTimer: "8000",
            when: { startDate: "05/01/2015",
                endDate: "06/15/2016",
                daysShow: ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"],
                startTime: "08:00:00",
                endTime: "22:00:00"},
            screensId: [2,3]
        },
        {
            msgName: "Festival Package Trips",
            msgData: ["Ultra Europe Festival 2016", "TomorrowLand Festival 2016"],
            msgImage: [],
            linkTemplate: "assets/templates/A.html",
            templateName: "A",
            advTimer: "20000",
            when: { startDate: "03/29/2016",
                endDate: "04/15/2016",
                daysShow: ["monday"],
                startTime: "15:00:00",
                endTime: "19:00:00"},
            screensId: [1]
        },
        {
            msgName: "Beautiful Views to visit",
            msgData: ["Aogashima Volcano, Japan",
                "Glass Beach, California, USA",
                "Hiller lake(pink lake), Western Australia",
                "Chittorgarh Fort, India",
                "Cinque Terre, Rio Maggiore, Italy",
                "Fairy Pools, Isle of Skye, Scotland",
                "Mamanuca Islands, Fiji"
            ],
            msgImage: ["Glass-beach-california.jpg", "Fiji-Japan.jpg"],
            linkTemplate: "assets/templates/B.html",
            templateName: "B",
            advTimer: "70000",
            when: { startDate: "04/01/2016",
                endDate: "04/30/2016",
                daysShow: ["monday", "thursday", "wednesday"],
                startTime: "01:00:00",
                endTime: "23:00:00"},
            screensId: [3]
        });
});