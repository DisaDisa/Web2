button.onclick = function() {
    var enteredCity = document.getElementById('userCity').value
    var req = new XMLHttpRequest()
    req.open('GET', 'http://api.openweathermap.org/data/2.5/weather?q=' + enteredCity + '&APPID=839cba68bbf9459f78ec72d97881a87f', false)
    req.send()
    if (req.status !== 200) {
        var errorMsg = "Error:" + req.status + ' ' + req.statusText
        alert(errorMsg)  
    } else {
        var response = JSON.parse(req.responseText);
        var data = {
            city: response.name,
            temp: (response.main.temp - 273.15).toFixed(2),
            wind_speed: response.wind.speed,
            sky: response.weather[0].description,
        }

        

        var source = document.getElementById("entry-template").innerHTML;
		var template = Handlebars.compile(source);

		var data = {city_name: data.city, temp: data.temp, wind_speed: data.wind_speed, sky: data.sky};
		var result = template(data);
		printMessage(result)
    }
}

function printMessage(text) {
	document.getElementById('content').innerHTML = text
}