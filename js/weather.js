//default location is SF
var lat = 37.7749;
var lon = -122.4194;
var city = "San Francisco";
var unit = 'C';
var data = {};

$.when($.getJSON("http://freegeoip.net/json/")).done(function(locations){
    city = locations['city'];
    $.when($.getJSON("https://fcc-weather-api.glitch.me/api/current?lat=" + locations["latitude"] + "&lon=" + locations["longitude"])).done(function(weatherData){
        $(document).ready(function () {
            console.log(lat);
            console.log(lon);
            console.log(weatherData);
            $('#location').html(city);
            $('#tempVal').html('' + weatherData['main']['temp'] + '&deg;' + unit);
            $('#minTempVal').html(''+weatherData['main']['temp_min'] + '&deg;' + unit);
            $('#maxTempVal').html(''+weatherData['main']['temp_max'] + '&deg;' + unit);
        })
    });
});


function switchTemp(num, unit) {
    if (unit === 'F') {

    } else if (unit == 'C') {

    }
}


