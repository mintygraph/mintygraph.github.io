//default location is SF
var lat = 37.7749;
var lon = -122.4194;
var city = "San Francisco";
var isC = true;
var winDir = 'N'
$.when($.getJSON("https://freegeoip.net/json/")).done(function (locations) {
    if (locations['city'] !== '') {
        lat = locations['latitude'];
        lon = locations['longitude'];
        city = locations['city'];
    }
    $.when($.getJSON("https://fcc-weather-api.glitch.me/api/current?lat=" + lat + "&lon=" + lon)).done(function (weatherData) {
        $(document).ready(function () {
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
                    $('.body').css("background-image",
                        "url(../img/weather/thunderstorm_in_the_archipelago_june_24__by_eskile.jpg)");
                    break;
                case 3: // drizzle
                    $('.body').css("background-image",
                        "url(../img/weather/drizzlerain_and_coffee_by_window_by_wowwy91801-d8zch3s.jpg)");
                    break;
                case 5: //rain
                    $('.body').css("background-image",
                        "url(../img/weather/drizzlerain_and_coffee_by_window_by_wowwy91801-d8zch3s.jpg)");
                    break;
                case 6: //snow
                    $('.body').css("background-image",
                        "url('../img/weather/snow_red_by_madec_brice.jpg')");
                    break;
                case 7: //atmosphere
                    $('body').css("background-image", "url(../img/weather/atmwith_the_wind_by_ryky-d9orj7n.png)");
                    break;
                case 8: //clear / clouds
                    $('.body').css("background-image",
                        "url(../img/weather/cloudsunset.png)");
                    break;
                case 9: //extreme
                    $('.body').css("background-image",
                        "url(../img/weather/extremewarlockonaclif_by_wonderwig-d9b76kt.jpg)");
                    break;
            }
            $('#windInfo').html(weatherData['wind']['speed'] +
                '<a>' + ' kph' + '</a>' + ' <a>' + windDir + '&deg;' + '</a>');
            $('#weather').html(weatherData['weather'][0]['main']);
            $('#location').html(city);
            $('#tempVal').html('' + weatherData['main']['temp'] + '&deg; C');
            $('#minTempVal').html('' + weatherData['main']['temp_min'] + '&deg; C');
            $('#maxTempVal').html('' + weatherData['main']['temp_max'] + '&deg; C');
            $('#tempToggle ').click(function () {
                isC = switchUnit(weatherData,isC);
                }
            )
        })
    })
});



function switchUnit(weatherData, isC) {
    var temp;
    var tempMin;
    var tempMax;
    var tempUnit = 'C';
    var speedUnit = 'kph'
    var windSpeed = weatherData['wind']['speed'];
    if (isC) {
        tempUnit = 'F';
        speedUnit = ' mph'
        windSpeed = Math.round(10*(0.621371*weatherData['wind']['speed']))/10 ;
        temp = Math.round(10*(weatherData['main']['temp'] * (9/5) + 32))/10 ;
        tempMin = Math.round(10*(weatherData['main']['temp_min'] * (9/5) + 32))/10 ;
        tempMax = Math.round(10*(weatherData['main']['temp_max'] * (9/5) + 32))/10 ;

    } else {
        tempUnit = 'C';
        speedUnit = ' kph'
        windSpeed = weatherData['wind']['speed'];
        temp = weatherData['main']['temp'];
        tempMin = weatherData['main']['temp_min'];
        tempMax = weatherData['main']['temp_max'];
    }
    $('#tempVal').html('' + temp + '&deg;' + tempUnit);
    $('#minTempVal').html('' + tempMin + '&deg;' + tempUnit);
    $('#maxTempVal').html('' + tempMax + '&deg;' + tempUnit);
    $('#windInfo').html(windSpeed + '<a>' + speedUnit + '</a>' + ' <a>' + windDir + '&deg;' + '</a>');
    return !isC
}
function weatherCond(weatherID) {
    var weatherCode = '' + weatherID['weather'][0]['id'];
    return parseInt(weatherCode[0]);
}


