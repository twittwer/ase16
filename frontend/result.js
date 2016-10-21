
function getyes()
{
    return 3;

}
function getno()
{
    return 5;

}
google.charts.load("current", {packages:["corechart"]});
google.charts.setOnLoadCallback(drawChart);
function drawChart() {


    var ja = getyes();
    var nein = getno();
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
