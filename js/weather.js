//default location is SF
var lat = 37.7749;
var lon = -122.4194;
var city = "San Francisco";
var unit = 'C';
var winDir = 'N'
$.when($.getJSON("http://freegeoip.net/json/")).done(function (locations) {
    if (locations['city'] !== '') {
        lat = locations['latitude'];
        lon = locations['longitude'];
        city = locations['city'];
    }
    $.when($.getJSON("https://fcc-weather-api.glitch.me/api/current?lat=" + lat + "&lon=" + lon)).done(function (weatherData) {
        $(document).ready(function () {
            console.log(weatherData)
            var windDirData = weatherData['wind']['deg'];
            if (12.5 < windDirData || windDirData <= 77.5) {
                windDir = 'NE';
            }
            else if (77.5 < windDirData || windDirData <= 102.5) {
                windDir = 'E';
            }
            else if (102.5 < windDirData || windDirData <= 147.5) {
                windDir = 'SE';
            }
            else if (147.5 < windDirData || windDirData <= 192.5) {
                windDir = 'S';
            }
            else if (192.5 < windDirData || windDirData <= 237.5) {
                windDir = "SW";
            }
            else if (237.5 < windDirData || windDirData <= 282.5) {
                windDir = "W";
            }
            else if (282.5 < windDirData || windDirData <= 327.5) {
                windDir = "NW";
            }
            switch (weatherCond(weatherData)) {
                //weather conditions from openweathermap.org/weather-conditions
                case 2: //thunderstorm,
                    $('html').css("background-image", "url(../img)");
                    break;
                case 3: // drizzle
                    break;
                case 5: //rain
                    break;
                case 6: //snow
                    break;
                case 7: //atmosphere
                    break;
                case 8: //clear / clouds
                    break;
                case 9: //extreme
                    break;
            }
            $('#windInfo').html(weatherData['wind']['speed'] +
                '<a>' + ' mph' + '</a>' + ' <a>' + windDir + '&deg;' + '</a>');
            $('#weather').html(weatherData['weather'][0]['main']);
            $('#location').html(city);
            $('#tempVal').html('' + weatherData['main']['temp'] + '&deg;' + unit);
            $('#minTempVal').html('' + weatherData['main']['temp_min'] + '&deg;' + unit);
            $('#maxTempVal').html('' + weatherData['main']['temp_max'] + '&deg;' + unit);
        })
    });
});


function switchTemp(num, unit) {
    if (unit === 'F') {

    } else if (unit == 'C') {

    }
}

function weatherCond(weatherID) {
    var weatherCode = '' + weatherID['weather'][0]['id'];
    return weatherCode[0];
}


