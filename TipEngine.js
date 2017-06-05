$(document).ready(function () {
    var fieldCount = 0; //keeps track of the amount of backwaiters there are 
    var busser = new Array(); //Array to hold all the backwaiters
    var bwContainer = $("#backwaiter_container"); //Div where the backwaiter objects are appended to
    var bwHidden = false; //backwaiter div not hidden by default
    var tpHidden = false; //tip pool div not hidden by default

    function Backwaiter() {
        this.objId = fieldCount; //identifier for backwaiters
        this.startTime = [16, 00]; //default start time is 4:00
        this.endTime = [20, 00]; //default end time is 8:00
        this.timeWorked; //empty field for total time worked
        this.tips; //tips made

        //the code for the form that is created when a new backwaiter object is created
        this.html = "<div class=\"jumbotron\" id=\"" + fieldCount + "\">" +
            "<form class=\"input-group\">" +
            "<span class=\"input-group-addon\">From:</span> <input type=\"time\" class=\"form-control\" id=\"startinput\" value=\"16:00:00\" step=\"60\" /> <span class=\"input-group-addon\">To: </span><input type=\"time\" class=\"form-control\" id=\"endInput\" value=\"20:00:00\" step=\"60\" />" +
            "</form>" +
            "<br>"
            +
            "<button class=\"removeField btn btn-default\">Remove</button>" +
            "</div>";

        $(bwContainer).append(this.html);
        fieldCount++;
    }

    //Initialize first backwaiter object into busser array
    busser[0] = new Backwaiter();

    $(".addField").click(function (e) {
        e.preventDefault(); //Makes button do nothing by default
        
        //checks for deleted backwaiters in array and fills them with the new backwaiter object
        for (i = 0; i < busser.length; i++) {
            if (busser[i] == undefined) {
                fieldCount = i;
            } else {
                fieldCount = busser.length;
            }
        }
        busser[fieldCount] = new Backwaiter();
    })

    $(bwContainer).on("click", ".removeField", function (e) {
        e.preventDefault();

        //Removes the busser object from the array
        for (i = 0; i < busser.length; i++) {
            console.log(busser[i].objId);
            if (busser[i].objId == $(this).parent('div').attr('id')) {
                busser.splice(i, 1)
            }
        }

        //Reassigns objId to all backwaiters for consistency
        for (i = 0; i < busser.length; i++) {
            busser[i].objId = i;
        }

        //Removes actual html busser time input
        $(this).parent('div').remove();
    })

    $(".calculate").click(function () {

        var tipPool = parseInt($("#tipPool").val());
        var hourPool = 0;
        var tipHourly = 0;

        var leftOver = tipPool;

        
        for (i = 0; i < busser.length; i++) {
            //Rounds minutes to the nearest 15 in the backwaiter object 
            if(busser[i].startTime[1] <= 15){
                busser[i].startTime[1] = 15;
            } else if(15 < busser[i].startTime[1] && busser[i].startTime[1] <= 30) {
                busser[i].startTime[1] = 30;
            } else if(30 < busser[i].startTime[1] && busser[i].startTime[1] <= 45) {
                busser[i].startTime[1] = 45;
            } else if(45 < busser[i].startTime[1] && busser[i].startTime[1] <= 59) {
                busser[i].startTime[1] = 00;
                busser[i].startTime[0]++;
            }
            if(busser[i].endTime[1] <= 15){
                busser[i].endTime[1] = 15;
            } else if(15 < busser[i].endTime[1] && busser[i].endTime[1] <= 30) {
                busser[i].endTime[1] = 30;
            } else if(30 < busser[i].endTime[1] && busser[i].endTime[1] <= 45) {
                busser[i].endTime[1] = 45;
            } else if(45 < busser[i].endTime[1] && busser[i].endTime[1] <= 59) {
                busser[i].endTime[1] = 00;
                busser[i].endTime[0]++;
            }
        }

//THIS IS THE BROKEN PART

        for(var i = 0; i < busser.length; i++){
            //Set total hours works for specific busser
            console.log(busser[i].startTime[0] + ":" + busser[i].startTime[1] + " " + busser[i].endTime[0] + ":" + busser[i].endTime[1]);
            busser[i].timeWorked = ((busser[i].endTime[0] - busser[i].startTime[0]) * 60) + " " + Math.abs(busser[i].endTime[1] - busser[i].startTime[1]);

            console.log("Busser " + (i + 1) + " mins worked: " + busser[i].timeWorked);

            //Calculate cumulative hours worked by each busser
            hourPool += busser[i].timeWorked;
        }
//END BROKEN PART
        //Find hourly tip payout
        tipHourly = tipPool / hourPool;

        for(var i = 0; i < busser.length; i++){
            busser[i].tips = busser[i].timeWorked * tipHourly;
            //leftOver -= busser[i].tips;
            //console.log("Tip Pool: " + tipPool + ";\tLeft Over: " + leftOver);
        }
        
        //console.log(busser);

        //rest of calculations go here

    })

    //Whenever the form is changed the variables in the backwaiter object are set to that.
    $("input").on("change", function () {
        var busPos = parseInt($(this).parent('form').parent('div').attr('id'));

        if ($(this).attr('id') == "startinput") {
            busser[busPos].startTime = $(this).val().split(":");
            for(i = 0; i < busser[busPos].startTime.length; i++){
                busser[busPos].startTime[i] = parseInt(busser[busPos].startTime[i]);
            }
        } else if ($(this).attr('id') == "endInput") {
            busser[busPos].endTime = $(this).val().split(":");
            for(i = 0; i < busser[busPos].endTime.length; i++){
                busser[busPos].endTime[i] = parseInt(busser[busPos].endTime[i]);
            }
        }

    })

    //changes the arrow when show/hide clicked
    $(".toggleTipPool").click(function () {
        if (tpHidden) {
            tpHidden = false;
            $(this).removeClass("glyphicon-chevron-down");
            $(this).addClass("glyphicon-chevron-up");
        } else {
            tpHidden = true;
            $(this).removeClass("glyphicon-chevron-up");
            $(this).addClass("glyphicon-chevron-down");
        }
    })

    //changes the arrow when show/hide clicked
    $(".toggleBackwaiters").click(function () {
        if (bwHidden) {
            bwHidden = false;
            $(this).removeClass("glyphicon-chevron-down");
            $(this).addClass("glyphicon-chevron-up");
        } else {
            bwHidden = true;
            $(this).removeClass("glyphicon-chevron-up");
            $(this).addClass("glyphicon-chevron-down");
        }
    })

});