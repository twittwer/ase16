/*
function getyes()
{
    return 3;

}

*/

document.write('<script type="text/javascript" src="./app/vote.service.ts"></script>');

google.charts.load("current", {packages:["corechart"]});
google.charts.setOnLoadCallback(drawChart);

function drawChart() {

/*

 Vote.yes_votes    var ja = vote();
 number
 vote();
 VoteService.yes_votes();

 console.log(getOptions1);

 */



    var ja = 4;
    var nein = 2;
    var data = google.visualization.arrayToDataTable([
        ['Task', 'Hours per Day'],
        ['ja',     ja],
        ['nein',    nein]
    ]);

    var options = {
        title: 'My Daily Activities',
        pieHole: 0.4
    };

    var chart = new google.visualization.PieChart(document.getElementById('donutchart'));
    chart.draw(data, options);
}
