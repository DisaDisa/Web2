document.getElementById("form1")
        .addEventListener("submit", function (event) {
        event.preventDefault()
        printWeather()
});

function printWeather() {
    var source = document.getElementById("text-template").innerHTML
    var template = Handlebars.compile(source)

    var data = getWeather()
    if (isRealValue(data)) {
        var result = template(data)
        document.getElementById('content').innerHTML = result
    }
}

function printError(req) {
    var source = document.getElementById("error-template").innerHTML
    var template = Handlebars.compile(source)

    var data = {
        status: req.status,
        errorText: req.statusText
    }
    var result = template(data)
    document.getElementById('content').innerHTML = result   
}

function isRealValue(obj) {
    return obj && obj !== 'null' && obj !== 'undefined';
}

function getWeather(){
    var enteredCity = document.getElementById('userCity').value
    var req = new XMLHttpRequest()
    req.open('GET', 'http://api.openweathermap.org/data/2.5/weather?q=' + enteredCity + '&APPID=839cba68bbf9459f78ec72d97881a87f', false)
    req.send()
    if (req.status !== 200) {
        printError(req)
        //var errorMsg = "Error:" + req.status + ' ' + req.statusText
        //alert(errorMsg)  
    } else {
        var response = JSON.parse(req.responseText);
        var data = {
            city: response.name,
            temp: (response.main.temp - 273.15).toFixed(2),
            windSpeed: response.wind.speed,
            sky: response.weather[0].description,
        }

        return data;
    }
}