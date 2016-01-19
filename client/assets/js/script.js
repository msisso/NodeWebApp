
var Valids = []; //Array that always contains the valid advertises by their time period
var index = 0; //variable to move on Valids array
var dataIndex = 0; //variable to move on msgData array
var imgIndex = 0; //variable to move on msgImage array
var advNumber = 0; //show which advertise is now on the screen

var myInterval = 0; //the return interval of setInterval function

var advertises = [];
var socket;
var screenId=-1;
var timer1=0;
var timer2=0;
var timer3=0;

//function that get gay number from 0 to 6 and return the day name
function returnDayName(dayNum) {
    var daysNames = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
    return (daysNames[dayNum]);
}
//update the Valids array with valid advertises by their time period
function GetValidViews(dayWeek, date, hours, minutes, seconds) {
    var x = 0;
    Valids = []; //empty the array
    //foreach on the Valids array
    $.each(advertises, function (ind, value) {
        if (jQuery.inArray(dayWeek, value.when.daysShow) != (-1)) {
            //Date.parse calculate the number of milliseconds between the date string and midnight of January 1, 1970.
            if ((Date.parse(value.when.startDate) <= Date.parse(date)) && (Date.parse(date) <= Date.parse(value.when.endDate))) {
                var temp = value.when.startTime.split(':');
                var StartHour = temp[0];
                var StartMinutes = temp[1];
                var StartSeconds = temp[2];
                temp = value.when.endTime.split(':');
                var EndHour = temp[0];
                var EndMinutes = temp[1];
                var EndSeconds = temp[2];
                if ((StartHour < hours || (StartHour == hours && StartMinutes < minutes ) || (StartHour == hours && StartMinutes == minutes && StartSeconds <= seconds))
                    && (hours < EndHour || (hours == EndHour && minutes < EndMinutes) || (hours == EndHour && minutes == EndMinutes && seconds <= EndSeconds))) {
                    Valids.push(value);
                }
            }
        }
        x++;
    });
    //exit from the function until the foreach is over
    if (x === advertises.length) {
        if (Valids.length != 0) {
            return 0;
        }
        else {
            return 2;
        }
    }
    else {
        return 1;
    }
}
//check the valid advertises and update the Valids array with the function 'GetValidViews'
function checkDateAndTimeValidation(callback) {
    var dt = new Date();
    var date = (dt.getMonth() + 1) + "/" + dt.getDate() + "/" + dt.getFullYear();
    var hours = dt.getHours();
    var minutes = dt.getMinutes();
    var seconds = dt.getSeconds();
    var day = returnDayName(dt.getDay());
    var returnValue = GetValidViews(day, date, hours, minutes, seconds);
    if (returnValue === 0) {
        if (typeof callback != 'undefined') {
            callback();
        }
    }
    else if (returnValue === 2) {
        if(myInterval === 0)
        {
            $('.FrameContainer').load('assets/templates/NoValids.html', runNoValidTemplate);
        }
        else
        {
            clearInterval(myInterval);
            $('.FrameContainer').load('assets/templates/NoValids.html', runNoValidTemplate);
        }
    }
    else {
        return 1;
    }
}
//load the html template to start showing the advertise
function startToAdvertise() {
    if(Valids.length != 0)
    {
        var timeout = parseInt(Valids[index].advTimer);

        $('.flexslider').attr("data-msgName", Valids[index].msgName);
        var msgLength = Valids[index].msgData.length;
        if(msgLength === 0)
        {
            msgLength = 3;
        }
        $('.FrameContainer').load(Valids[index].linkTemplate, function () {
            changeImg()
            timer1 = setTimeout(function () {
                changeMsgData();
            }, 1000);
            myInterval = setInterval(function () {
                changeImg()
                setTimeout(function () {
                    changeMsgData();
                }, 1000);
            }, (timeout / msgLength));
        });
        timer2 = setTimeout(function () {
            if (Valids.length === 1) {
                clearInterval(myInterval);
                CheckAgainFromServer();
            }
            else{
                clearInterval(myInterval);
                index++;
                if (index >= Valids.length) {
                    index = 0;
                    CheckAgainFromServer();
                }
                else{
                    imgIndex = 0;
                    dataIndex = 0;
                    startToAdvertise();
                }
            }
        }, timeout);
    }
    else{
        CheckAgainFromServer();
    }
}
function runNoValidTemplate() {

    var string = "There is no any message that is valid in this time";
    $("<h1 id=\"msgData\" class=\"headline\" style=\"color:#ffffff\"></h1>").appendTo($(".align_center"));
    var q = jQuery.map(string.split(''), function (letter) {
        return $('<span>' + letter + '</span>');
    });
    var dest = $('#msgData');
    var c = 0;
    var i = setInterval(function () {
        q[c].appendTo(dest).hide().fadeIn(1000);
        c += 1;
        if (c >= q.length) clearInterval(i);
    }, 100);
    timer3 = setTimeout(CheckAgainFromServer,7000);
}
//fade in the message on the screen letter by letter
function InnerChamgeMsg() {
    $("<h1 id=\"msgData\" class=\"headline\" style=\"color:#ffffff\"></h1>").appendTo($(".align_center"));
    var q = jQuery.map(Valids[index].msgData[dataIndex].split(''), function (letter) {
        return $('<span>' + letter + '</span>');
    });
    var dest = $('#msgData');
    var c = 0;
    var i = setInterval(function () {
        q[c].appendTo(dest).hide().fadeIn(1000);
        c += 1;
        if (c >= q.length) clearInterval(i);
    }, 100);
    dataIndex++;
    if (dataIndex === Valids[index].msgData.length) {
        dataIndex = 0;
    }
}
//change the mesage  and load the next message in the message array of the advertise object
function changeMsgData() {
    if(Valids[index].msgData.length != 0)
    {
        if ($("#msgData").length != 0 && $("#msgData").text() != "") {
            $("#msgData").fadeOut("slow");
            setTimeout(function () {
                $("#msgData").remove();
                InnerChamgeMsg();
            }, 100);
        }
        else{
            InnerChamgeMsg();
        }
    }
}
//change the image background and load the next image in the img array of the advertise object
function changeImg() {
    var image = $('.flexslider .slide1');
    image.fadeOut(1000, function () {
        if (Valids[index].msgImage.length != 0) {

            image.css("background-image", "url('assets/public/imgUploaded/" + Valids[index].msgImage[imgIndex] + "')");
            image.fadeIn(1000);
            imgIndex++;
            if (imgIndex === Valids[index].msgImage.length) {
                imgIndex = 0;
            }
        }
        else {
            var colors = ["#58D8FB", "#333333", "#990099"];
            var rand = Math.floor(Math.random() * colors.length);
            image.css("background", colors[rand]);
            image.fadeIn(1000);
        }
    });
}

function onModalClose()
{

    if(timer1 != 0)
    {
        clearTimeout(timer1);
        timer1 = 0;
    }
    if(timer2 != 0)
    {
        clearTimeout(timer2);
        timer2 = 0;
    }
    if(timer3 != 0)
    {

        clearTimeout(timer3);
        timer3 = 0;
    }
    if(myInterval !=0)
    {

        clearTimeout(myInterval);
        myInterval = 0;

    }
    index = 0;


    index = 0; //variable to move on Valids array
    dataIndex = 0; //variable to move on msgData array
    imgIndex = 0; //variable to move on msgImage array


    if(typeof socket !== 'undefined'){
        socket.disconnect();
    }

}

function onModalOpen(id)
{
    screenId = id;
    socket = io('', {path: '/mysocket', 'forceNew': true});
    socket.on('connect', function(data) {


        socket.emit('register', screenId);
    });
    socket.on('updateMe', function(data) {

        advertises = data;
        checkDateAndTimeValidation(function () {
            startToAdvertise();
        });
    });
    socket.on('register', function(data) {

        advertises = data;

        checkDateAndTimeValidation(function () {
            startToAdvertise();
        });
    });
    socket.on('serverUpdateInjection', function(data)
    {
        advertises = data;
    });
    socket.on('disconnect', function(data)
    {

    });


}
function CheckAgainFromServer() {

    socket.emit('updateMe', screenId);
}


