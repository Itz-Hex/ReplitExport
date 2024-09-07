// Require application dependencies
// These are express, body-parser, and request

const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const app = express();

// Configure dotenv package

require("dotenv").config();

// Set up OpenWeatherMap API_KEY

const apiKey = process.env['API_KEY'];

// Setup express app and body-parser configurations
// Setup javascript template view engine

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

// Setup default display on launch
app.get("/", function (req, res) {
    // Will not fetch and display any dater in the index page
    res.render("index", { weather: null, error: null });
});

// Setup other pages

// About us page setup
app.get("/about-us", function (req, res) {
    res.render("about-us", { weather: null, error: null });
});

// On a post request, the app shall get data from OpenWeatherMap using the given arguments
app.post('/', function (req, res) {

    // Get city names passed in the form
    let city = req.body.city;

    // Use that city name to fetch data
    // Use the API_KEY in the '.env' file
    let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

    // Request for data using the URL
    request(url, function(err, response, body) {
        
        // On return, check if the json data fetched
        if (err) {
            res.render('index', { weather: null, error: 'Error, please try again' });
        } else {
            let weather = JSON.parse(body);
            // Output data into console to make sure data being displayed is correct
            console.log(weather);

            if (weather.main == undefined) {
                res.render('index', { weather: null, error: 'Error, please try again' });
            } else {
                // Use the data got to set up your output
                let place = `${weather.name}, ${weather.sys.country}`,
                  // Calculate the current timezone using the data fetched
                  weatherTimezone = `${new Date(
                    weather.dt * 1000 - weather.timezone * 1000
                  )}`;
                  let weatherTemp = `${weather.main.temp}`,
                  weatherPressure = `${weather.main.pressure}`,
                  // Fetch the weather icon and its size using the icon data
                  weatherIcon = `http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`,
                  weatherDescription = `${weather.weather[0].description}`,
                  humidity = `${weather.main.humidity}`,
                  clouds = `${weather.clouds.all}`,
                  visibility = `${weather.visibility}`,
                  main = `${weather.weather[0].main}`,
                  weatherFahrenheit;
                weatherFahrenheit = (weatherTemp * 9) / 5 + 32;

                // Round value of degreese celcius to two dp
                function roundToOne(num) {
                    return +(Math.round(num + "e+1") + "e-1");
                }
                weatherTemp = roundToOne(weatherTemp);
                // Round value of degresee fahrenheit to two dp
                function roundToTwo(num) {
                    return +(Math.round(num + "e+2") + "e-2");
                }
                weatherFahrenheit = roundToTwo(weatherFahrenheit);

                // render the data to page (index.ejs)
                res.render("index", { 
                    weather: weather,
                    place: place,
                    temp: weatherTemp,
                    pressure: weatherPressure,
                    icon: weatherIcon,
                    description: weatherDescription,
                    timezone: weatherTimezone,
                    humidity: humidity,
                    fahrenheit: weatherFahrenheit,
                    clouds: clouds,
                    visibility: visibility,
                    main: main,
                    error: null,
                });
            }
        }
    });
    
});

// set up port configurations
app.listen(5000, function () {
    console.log("Weather app is listening on port 5000!");
});
