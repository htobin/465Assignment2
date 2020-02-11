function GenerateTeams(maxSportSize, selectedSport, roster) {
    //create all of the lists that will be used
    var team1 = [];
    var team2 = [];
    var bench = [];
    var team1list = $('#team1 ul');
    var team2list = $('#team2 ul');
    var benchlist = $('#bench');

    //clear lists in case there's anything in them
    team1list.empty();
    team2list.empty();
    benchlist.empty();

    //create a clone of the original roster, so that way it doesn't get edited
    var rosterClone = roster.slice(0, roster.length);

    //check roster against sport size
    if (rosterClone.length < maxSportSize) {

        //roster size is too small, create placeholders and prompt the user to use it again
        var difference = maxSportSize - rosterClone.length;
        team1list.append(`<li>Team 1 list will go here</li>`);
        team2list.append(`<li>Team 2 list will go here</li>`);
        benchlist.append(`<li>Extra players will go here</li>`);
        alert(`You need ${difference} more players`);
        return;
    }


    //randomize roster
    rosterClone.shuffle();

    //find create a point to create two teams
    var halfway = Math.ceil(maxSportSize / 2);

    //make the first team
    team1 = rosterClone.splice(0, halfway);
    //make the second team
    team2 = rosterClone.splice(0, halfway);
    //all extra players have to sit out
    bench = rosterClone;


    //create lists for the webpage
    //team 1
    for (i = 0; i < team1.length; i++) {
        team1list.append(`<li>${team1[i]}</li>`);
    }

    //team 2
    for (i = 0; i < team2.length; i++) {
        team2list.append(`<li>${team2[i]}</li>`);
    }

    //team 3
    if (selectedSport != '') {
        for (i = 0; i < bench.length; i++) {
            benchlist.append(`<li>${bench[i]}</li>`);
        }
    }


}

//main function
$(function () {
    var roster = [];
    var teamSelection = $('#sports');
    var randomButton = $('#random');
    var maxSportSize = 0;
    var selectedSport = "";
    var rosterClone = [];


    // get json file list into variable roster
    $.getJSON("assets/roster.json", function (json) {
        roster = json;
        rosterClone = roster.slice(0, roster.length);
        $('#current').text(`Current Players: ${rosterClone.length}`);
    });


    //intilialize teams being created
    teamSelection.on('change', function () {
        selectedSport = $(this).val();

        //sport selected on the dropdown menu
        if (selectedSport == '' || selectedSport == undefined) {
            //clear all lists
            $('#team1 ul').empty();
            $('#team2 ul').empty();
            $('#bench').empty();
            //create list place holders
            $('#team1 ul').append(`<li>Team 1 list will go here</li>`);
            $('#team2 ul').append(`<li>Team 2 list will go here</li>`);
            $('#bench').append(`<li>Extra player list will go here</li>`);
            alert('Please select a sport');
            return
        }

        //maximum players on the field/court
        if (selectedSport == 'Football') {
            maxSportSize = 22;
        } else if (selectedSport == 'Basketball') {
            maxSportSize = 10;
        } else if (selectedSport == 'Baseball') {
            maxSportSize = 18
        }

        //sport name text
        if (selectedSport == 'Football') {
            $('#sportName').text(`Football`);
            } else if (selectedSport == 'Basketball') {
                $('#sportName').text(`Basketball`);
            } else if (selectedSport == 'Baseball') {
                $('#sportName').text(`Baseball`);
            }


        GenerateTeams(maxSportSize, selectedSport, roster);

    });

    randomButton.on('click', function () {
        if(teamSelection.val() == ''){
            return;
        }
        GenerateTeams(maxSportSize, selectedSport, roster)
    })


});