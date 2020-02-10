function GenerateTeams(maxSportSize, selectedSport, roster) {
    var team1 = [];
    var team2 = [];
    var bench = [];
    var team1list = $('#team1 ul');
    var team2list = $('#team2 ul');
    var benchlist = $('#bench');
    //clear lists
    team1list.empty();
    team2list.empty();
    benchlist.empty();
    var rosterClone = roster.slice(0, roster.length);

    //check roster against sport size

    if (rosterClone.length < maxSportSize) {
        var difference = maxSportSize - rosterClone.length;
        team1list.append(`<li>Team 1 list will go here</li>`);
        team2list.append(`<li>Team 2 list will go here</li>`);
        benchlist.append(`<li>Extra players will go here</li>`);
        alert(`You need ${difference} more players`);
        return;
    }


    //randomize roster
    rosterClone.shuffle();

    //logic for splitting arrays
    var halfway = Math.ceil(maxSportSize / 2);

    team1 = rosterClone.splice(0, halfway);
    team2 = rosterClone.splice(0, halfway);
    bench = rosterClone;


    //create lists
    for (i = 0; i < team1.length; i++) {
        team1list.append(`<li>${team1[i]}</li>`);
    }
    for (i = 0; i < team2.length; i++) {
        team2list.append(`<li>${team2[i]}</li>`);
    }
    if (selectedSport != '') {
        for (i = 0; i < bench.length; i++) {
            benchlist.append(`<li>${bench[i]}</li>`);
        }
    }


}

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
        $('#current').text(`Current players: ${rosterClone.length}`);
    });


    teamSelection.on('change', function () {
        selectedSport = $(this).val();
        if (selectedSport == '' || selectedSport == undefined) {
            $('#team1 ul').empty();
            $('#team2 ul').empty();
            $('#bench').empty();
            $('#team1 ul').append(`<li>Team 1 list will go here</li>`);
            $('#team2 ul').append(`<li>Team 2 list will go here</li>`);
            $('#bench').append(`<li>Extra player list will go here</li>`);
            alert('Please select a sport');
            return
        }

        if (selectedSport == 'Football') {
            maxSportSize = 22;
        } else if (selectedSport == 'Basketball') {
            maxSportSize = 10;
        } else if (selectedSport == 'Baseball') {
            maxSportSize = 18
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