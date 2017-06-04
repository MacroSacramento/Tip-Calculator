$(document).ready(function () {
    var fieldCount = 0;
    var busser = new Array();
    var bwContainer = $("#backwaiter_container")
    var bwHidden = false;
    var tpHidden = false;

    busser[0] = new Backwaiter();

    $(".addField").click(function (e) {
        e.preventDefault();
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

        for (i = 0; i < busser.length; i++) {
            console.log(busser[i].objId);
            if (busser[i].objId == $(this).parent('div').attr('id')) {
                busser.splice(i, 1)
            }
        }

        for (i = 0; i < busser.length; i++) {
            busser[i].objId = i;
        }

        $(this).parent('div').remove();
    })

    $(".calculate").click(function () {

        for (i = 0; i < busser.length; i++) {
            console.log(parseInt(busser[i].startTime[1]))
            if (5 < parseInt(busser[i].startTime[1]) < 15) {
                busser[i].startTime[1] = 15;
            } else if (15 < parseInt(busser[i].startTime[1]) < 30) {
                busser[i].startTime[1] = 30;
            } else if (30 < parseInt(busser[i].startTime[1]) < 45) {
                busser[i].startTime[1] = 45;
            } else if (45 < parseInt(busser[i].startTime[1]) < 59) {
                busser[i].startTime[1] = 00;
                busser[i].startTime[0]++;
            } else {

            }
            console.log(busser[i].startTime)
        }  

    })

    $("input").on("change", function () {

        console.log("changed");

        var busPos = parseInt($(this).parent('form').parent('div').attr('id'));

        if ($(this).attr('id') == "startinput") {
            busser[busPos].startTime = $(this).val().split(":");
            for(i = 0; i < busser[busPos].startTime.length; i++){
                busser[busPos].startTime[i] = parseInt(busser[busPos].startTime[i])
            }
        } else if ($(this).attr('id') == "endInput") {
            busser[busPos].endTime = $(this).val().split(":");
            for(i = 0; i < busser[busPos].endTime.length; i++){
                busser[busPos].endTime[i] = parseInt(busser[busPos].endTime[i])
            }
        }
    })

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

    function Backwaiter() {
        this.objId = fieldCount
        this.startTime = [16, 00];
        this.endTime = [20, 00];
        this.timeWorked;
        this.tips;

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

});