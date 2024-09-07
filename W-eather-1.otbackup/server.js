[{"ops":[{"insert":"// Require application dependencies\n// These are express, body-parser, and request\n\nconst express = require('express');\nconst bodyParser = require('body-parser');\nconst request = require('request');\nconst app = express();\n\n// Configure dotenv package\n\nrequire(\"dotenv\").config();\n\n// Set up OpenWeatherMap API_KEY\n\nconst apiKey = `${process.env.API_KEY}`;\n\n// Setup express app and body-parser configurations\n// Setup javascript template view engine\n\napp.use(express.static(\"public\"));\napp.use(bodyParser.urlencoded({ extended: true }));\napp.set(\"view engine\", \"ejs\");\n\n// Setup default display on launch\napp.get(\"/\", function (req, res) {\n    // Will not fetch and display any dater in the index page\n    res.render(\"index\", { weather: null, error: null });\n});\n\n// On a post request, the app shall get data from OpenWeatherMap using the given arguments\napp.post('/', function (req, res) {\n\n    // Get city names passed in the form\n    let city = req.body.city;\n\n    // Use that city name to fetch data\n    // Use the API_KEY in the '.env' file\n    let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;\n\n    // Request for data using the URL\n    request(url, function(err, response, body) {\n        \n        // On return, check if the json data fetched\n        if (err) {\n            res.render('index', { weather: null, error: 'Error, please try again' });\n        } else {\n            let weather = JSON.parse(body);\n            // Output data into console to make sure data being displayed is correct\n            console.log(weather);\n\n            if (weather.main == undefined) {\n                res.render('index', { weather: null, error: 'Error, please try again' });\n            } else {\n                // Use the data got to set up your output\n                let place = `${weather.name}, ${weather.sys.country}`,\n                  // Calculate the current timezone using the data fetched\n                  weatherTimezone = `${new Date(\n                    weather.dt * 1000 - weather.timezone * 1000\n                  )}`;\n                  let weatherTemp = `${weather.main.temp}`,\n                  weatherPressure = `${weather.main.pressure}`,\n                  // Fetch the weather icon and its size using the icon data\n                  weatherIcon = `http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`,\n                  weatherDescription = `${weather.weather[0].description}`,\n                  humidity = `${weather.main.humidity}`,\n                  clouds = `${weather.clouds.all}`,\n                  visibility = `${weather.visibility}`,\n                  main = `${weather.weather[0].main}`,\n                  weatherFahrenheit;\n                weatherFahrenheit = (weatherTemp * 9) / 5 + 32;\n\n                // Round value of degreese celcius to two dp\n                function roundToOne(num) {\n                    return +(Math.round(num + \"e+1\") + \"e-1\");\n                }\n                weatherTemp = roundToOne(weatherTemp);\n                // Round value of degresee fahrenheit to two dp\n                function roundToTwo(num) {\n                    return +(Math.round(num + \"e+2\") + \"e-2\");\n                }\n                weatherFahrenheit = roundToTwo(weatherFahrenheit);\n\n                // render the data to page (index.ejs)\n                res.render(\"index\", { \n                    weather: weather,\n                    place: place,\n                    temp: weatherTemp,\n                    pressure: weatherPressure,\n                    icon: weatherIcon,\n                    description: weatherDescription,\n                    timezone: weatherTimezone,\n                    humidity: humidity,\n                    fahrenheit: weatherFahrenheit,\n                    clouds: clouds,\n                    visibility: visibility,\n                    main: main,\n                    error: null,\n                });\n            }\n        }\n    });\n    \n});\n\n// set up port configurations\napp.listen(5000, function () {\n    console.log(\"Weather app is listening on port 5000!\");\n});\n"}],"crc32":1587524253,"timestamp":1634649098,"tsString":"2021-10-19 12:48:37.0 +00:00:00","version":1},{"ops":[{"skip":355},{"insert":"\n"}],"crc32":1713818393,"timestamp":1634649462,"tsString":"2021-10-19 12:48:37.0 +00:00:00","version":2},{"ops":[{"skip":356},{"insert":"\nconst mySecret = process.env['API_KEY']\n"}],"crc32":2662948041,"timestamp":1634649463,"tsString":"2021-10-19 12:48:37.0 +00:00:00","version":3},{"ops":[{"skip":355},{"delete":1}],"crc32":3011834052,"timestamp":1634649465,"tsString":"2021-10-19 12:48:37.0 +00:00:00","version":4},{"ops":[{"skip":330},{"insert":"process.env['API_KEY']"},{"delete":25}],"crc32":1311119397,"timestamp":1634649480,"tsString":"2021-10-19 12:48:37.0 +00:00:00","version":5},{"ops":[{"skip":352},{"insert":";"},{"skip":26},{"delete":14}],"crc32":786182692,"timestamp":1634649480,"tsString":"2021-10-19 12:48:37.0 +00:00:00","version":6},{"ops":[{"skip":353},{"delete":26}],"crc32":772496905,"timestamp":1634649483,"tsString":"2021-10-19 12:48:37.0 +00:00:00","version":7},{"ops":[{"skip":353},{"delete":1}],"crc32":3241994554,"timestamp":1634649485,"tsString":"2021-10-19 12:48:37.0 +00:00:00","version":8},{"ops":[{"skip":720},{"delete":1}],"crc32":1195599291,"timestamp":1634652068,"tsString":"2021-10-19 13:48:37.0 +00:00:00","version":9},{"ops":[{"skip":719},{"delete":1}],"crc32":1212271377,"timestamp":1634652069,"tsString":"2021-10-19 13:48:37.0 +00:00:00","version":10},{"ops":[{"skip":719},{"delete":1}],"crc32":2396175816,"timestamp":1634652069,"tsString":"2021-10-19 13:48:37.0 +00:00:00","version":11},{"ops":[{"skip":718},{"delete":1}],"crc32":3726573407,"timestamp":1634652070,"tsString":"2021-10-19 13:48:37.0 +00:00:00","version":12},{"ops":[{"skip":717},{"delete":1}],"crc32":574967973,"timestamp":1634652070,"tsString":"2021-10-19 13:48:37.0 +00:00:00","version":13},{"ops":[{"skip":716},{"delete":1}],"crc32":257218067,"timestamp":1634652070,"tsString":"2021-10-19 13:48:37.0 +00:00:00","version":14},{"ops":[{"skip":715},{"delete":1}],"crc32":687915046,"timestamp":1634652071,"tsString":"2021-10-19 13:48:37.0 +00:00:00","version":15},{"ops":[{"skip":715},{"insert":"r"}],"crc32":1704249283,"timestamp":1634652071,"tsString":"2021-10-19 13:48:37.0 +00:00:00","version":16},{"ops":[{"skip":716},{"insert":"e"}],"crc32":465353843,"timestamp":1634652072,"tsString":"2021-10-19 13:48:37.0 +00:00:00","version":17},{"ops":[{"skip":717},{"insert":"q"}],"crc32":3390252016,"timestamp":1634652073,"tsString":"2021-10-19 13:48:37.0 +00:00:00","version":18},{"ops":[{"skip":717},{"delete":1}],"crc32":465353843,"timestamp":1634652096,"tsString":"2021-10-19 13:48:37.0 +00:00:00","version":19},{"ops":[{"skip":716},{"delete":1}],"crc32":1704249283,"timestamp":1634652096,"tsString":"2021-10-19 13:48:37.0 +00:00:00","version":20},{"ops":[{"skip":715},{"delete":1}],"crc32":687915046,"timestamp":1634652097,"tsString":"2021-10-19 13:48:37.0 +00:00:00","version":21},{"ops":[{"skip":715},{"insert":"'"}],"crc32":167302926,"timestamp":1634652097,"tsString":"2021-10-19 13:48:37.0 +00:00:00","version":22},{"ops":[{"skip":715},{"delete":1}],"crc32":687915046,"timestamp":1634652098,"tsString":"2021-10-19 13:48:37.0 +00:00:00","version":23},{"ops":[{"skip":715},{"insert":"\""}],"crc32":257218067,"timestamp":1634652098,"tsString":"2021-10-19 13:48:37.0 +00:00:00","version":24},{"ops":[{"skip":716},{"insert":"i"}],"crc32":574967973,"timestamp":1634652098,"tsString":"2021-10-19 13:48:37.0 +00:00:00","version":25},{"ops":[{"skip":717},{"insert":"nde"}],"crc32":2357535617,"timestamp":1634652099,"tsString":"2021-10-19 13:48:37.0 +00:00:00","version":26},{"ops":[{"skip":720},{"insert":"x"}],"crc32":551253585,"timestamp":1634652099,"tsString":"2021-10-19 13:48:37.0 +00:00:00","version":27},{"ops":[{"skip":721},{"insert":"\""}],"crc32":3241994554,"timestamp":1634652099,"tsString":"2021-10-19 13:48:37.0 +00:00:00","version":28},{"ops":[{"skip":613},{"insert":"a"}],"crc32":2637587624,"timestamp":1634814369,"tsString":"2021-10-21 10:48:37.0 +00:00:00","version":29},{"ops":[{"skip":614},{"insert":"b"}],"crc32":1963577037,"timestamp":1634814369,"tsString":"2021-10-21 10:48:37.0 +00:00:00","version":30},{"ops":[{"skip":615},{"insert":"ou"}],"crc32":2039224057,"timestamp":1634814369,"tsString":"2021-10-21 10:48:37.0 +00:00:00","version":31},{"ops":[{"skip":617},{"insert":"t"}],"crc32":3400515428,"timestamp":1634814370,"tsString":"2021-10-21 10:48:37.0 +00:00:00","version":32},{"ops":[{"skip":618},{"insert":"-"}],"crc32":1098571948,"timestamp":1634814370,"tsString":"2021-10-21 10:48:37.0 +00:00:00","version":33},{"ops":[{"skip":619},{"insert":"us"}],"crc32":1607367210,"timestamp":1634814370,"tsString":"2021-10-21 10:48:37.0 +00:00:00","version":34},{"ops":[{"skip":728},{"delete":1}],"crc32":3511015100,"timestamp":1634814373,"tsString":"2021-10-21 10:48:37.0 +00:00:00","version":35},{"ops":[{"skip":724},{"delete":4}],"crc32":863410786,"timestamp":1634814376,"tsString":"2021-10-21 10:48:37.0 +00:00:00","version":36},{"ops":[{"skip":724},{"insert":"a"}],"crc32":1155821747,"timestamp":1634814377,"tsString":"2021-10-21 10:48:37.0 +00:00:00","version":37},{"ops":[{"skip":725},{"insert":"b"}],"crc32":2487697491,"timestamp":1634814377,"tsString":"2021-10-21 10:48:37.0 +00:00:00","version":38},{"ops":[{"skip":726},{"insert":"ou"}],"crc32":2674864953,"timestamp":1634814377,"tsString":"2021-10-21 10:48:37.0 +00:00:00","version":39},{"ops":[{"skip":728},{"insert":"t-"}],"crc32":250282224,"timestamp":1634814378,"tsString":"2021-10-21 10:48:37.0 +00:00:00","version":40},{"ops":[{"skip":730},{"insert":"u"}],"crc32":229251680,"timestamp":1634814378,"tsString":"2021-10-21 10:48:37.0 +00:00:00","version":41},{"ops":[{"skip":731},{"insert":"s"}],"crc32":3215345838,"timestamp":1634814378,"tsString":"2021-10-21 10:48:37.0 +00:00:00","version":42},{"ops":[{"skip":620},{"delete":1}],"crc32":2654439952,"timestamp":1634814496,"tsString":"2021-10-21 10:48:37.0 +00:00:00","version":43},{"ops":[{"skip":618},{"delete":2}],"crc32":1234868788,"timestamp":1634814496,"tsString":"2021-10-21 10:48:37.0 +00:00:00","version":44},{"ops":[{"skip":617},{"delete":1}],"crc32":1643366390,"timestamp":1634814496,"tsString":"2021-10-21 10:48:37.0 +00:00:00","version":45},{"ops":[{"skip":616},{"delete":1}],"crc32":3600526430,"timestamp":1634814496,"tsString":"2021-10-21 10:48:37.0 +00:00:00","version":46},{"ops":[{"skip":615},{"delete":1}],"crc32":2527244814,"timestamp":1634814497,"tsString":"2021-10-21 10:48:37.0 +00:00:00","version":47},{"ops":[{"skip":614},{"delete":1}],"crc32":976274035,"timestamp":1634814497,"tsString":"2021-10-21 10:48:37.0 +00:00:00","version":48},{"ops":[{"skip":613},{"delete":1}],"crc32":2858394025,"timestamp":1634814497,"tsString":"2021-10-21 10:48:37.0 +00:00:00","version":49},{"ops":[{"skip":723},{"delete":1}],"crc32":778982461,"timestamp":1634814500,"tsString":"2021-10-21 10:48:37.0 +00:00:00","version":50},{"ops":[{"skip":722},{"delete":1}],"crc32":331538951,"timestamp":1634814500,"tsString":"2021-10-21 10:48:37.0 +00:00:00","version":51},{"ops":[{"skip":721},{"delete":1}],"crc32":3634476368,"timestamp":1634814500,"tsString":"2021-10-21 10:48:37.0 +00:00:00","version":52},{"ops":[{"skip":720},{"delete":1}],"crc32":157909054,"timestamp":1634814500,"tsString":"2021-10-21 10:48:37.0 +00:00:00","version":53},{"ops":[{"skip":718},{"delete":2}],"crc32":2402762266,"timestamp":1634814501,"tsString":"2021-10-21 10:48:37.0 +00:00:00","version":54},{"ops":[{"skip":717},{"delete":1}],"crc32":893338342,"timestamp":1634814501,"tsString":"2021-10-21 10:48:37.0 +00:00:00","version":55},{"ops":[{"skip":716},{"delete":1}],"crc32":1505838630,"timestamp":1634814502,"tsString":"2021-10-21 10:48:37.0 +00:00:00","version":56},{"ops":[{"skip":716},{"insert":"i"}],"crc32":2079211801,"timestamp":1634814503,"tsString":"2021-10-21 10:48:37.0 +00:00:00","version":57},{"ops":[{"skip":717},{"insert":"nde"}],"crc32":1195599291,"timestamp":1634814503,"tsString":"2021-10-21 10:48:37.0 +00:00:00","version":58},{"ops":[{"skip":720},{"insert":"x"}],"crc32":3241994554,"timestamp":1634814503,"tsString":"2021-10-21 10:48:37.0 +00:00:00","version":59},{"ops":[{"skip":760},{"insert":"\n"}],"crc32":680884936,"timestamp":1634814508,"tsString":"2021-10-21 10:48:37.0 +00:00:00","version":60},{"ops":[{"skip":761},{"insert":"\n"}],"crc32":2077180011,"timestamp":1634814508,"tsString":"2021-10-21 10:48:37.0 +00:00:00","version":61},{"ops":[{"skip":762},{"insert":"/"}],"crc32":1824884417,"timestamp":1634814509,"tsString":"2021-10-21 10:48:37.0 +00:00:00","version":62},{"ops":[{"skip":763},{"insert":"/"}],"crc32":1523697393,"timestamp":1634814509,"tsString":"2021-10-21 10:48:37.0 +00:00:00","version":63},{"ops":[{"skip":764},{"insert":" "}],"crc32":3596057783,"timestamp":1634814509,"tsString":"2021-10-21 10:48:37.0 +00:00:00","version":64},{"ops":[{"skip":765},{"insert":"Se"}],"crc32":4247894925,"timestamp":1634814509,"tsString":"2021-10-21 10:48:37.0 +00:00:00","version":65},{"ops":[{"skip":767},{"insert":"tu"}],"crc32":3515464772,"timestamp":1634814510,"tsString":"2021-10-21 10:48:37.0 +00:00:00","version":66},{"ops":[{"skip":769},{"insert":"p"}],"crc32":264624340,"timestamp":1634814510,"tsString":"2021-10-21 10:48:37.0 +00:00:00","version":67},{"ops":[{"skip":770},{"insert":" "}],"crc32":2634464494,"timestamp":1634814510,"tsString":"2021-10-21 10:48:37.0 +00:00:00","version":68},{"ops":[{"skip":771},{"insert":"ot"}],"crc32":4064541806,"timestamp":1634814510,"tsString":"2021-10-21 10:48:37.0 +00:00:00","version":69},{"ops":[{"skip":773},{"insert":"her"}],"crc32":1489949704,"timestamp":1634814510,"tsString":"2021-10-21 10:48:37.0 +00:00:00","version":70},{"ops":[{"skip":776},{"insert":" "}],"crc32":305408285,"timestamp":1634814510,"tsString":"2021-10-21 10:48:37.0 +00:00:00","version":71},{"ops":[{"skip":777},{"insert":"pa"}],"crc32":834920480,"timestamp":1634814511,"tsString":"2021-10-21 10:48:37.0 +00:00:00","version":72},{"ops":[{"skip":779},{"insert":"ge"}],"crc32":339861473,"timestamp":1634814511,"tsString":"2021-10-21 10:48:37.0 +00:00:00","version":73},{"ops":[{"skip":781},{"insert":"s"}],"crc32":3859890151,"timestamp":1634814511,"tsString":"2021-10-21 10:48:37.0 +00:00:00","version":74},{"ops":[{"skip":782},{"insert":"\n"}],"crc32":3503356279,"timestamp":1634814512,"tsString":"2021-10-21 10:48:37.0 +00:00:00","version":75},{"ops":[{"skip":783},{"insert":"\n"}],"crc32":552184821,"timestamp":1634814512,"tsString":"2021-10-21 10:48:37.0 +00:00:00","version":76},{"ops":[{"skip":784},{"insert":"//"}],"crc32":2194342323,"timestamp":1634814513,"tsString":"2021-10-21 10:48:37.0 +00:00:00","version":77},{"ops":[{"skip":786},{"insert":" "}],"crc32":1314735820,"timestamp":1634814513,"tsString":"2021-10-21 10:48:37.0 +00:00:00","version":78},{"ops":[{"skip":787},{"insert":"A"}],"crc32":1099121688,"timestamp":1634814514,"tsString":"2021-10-21 10:48:37.0 +00:00:00","version":79},{"ops":[{"skip":788},{"insert":"B"}],"crc32":2409624800,"timestamp":1634814514,"tsString":"2021-10-21 10:48:37.0 +00:00:00","version":80},{"ops":[{"skip":789},{"insert":"out"}],"crc32":1532869905,"timestamp":1634814514,"tsString":"2021-10-21 10:48:37.0 +00:00:00","version":81},{"ops":[{"skip":792},{"insert":" "}],"crc32":1985745588,"timestamp":1634814514,"tsString":"2021-10-21 10:48:37.0 +00:00:00","version":82},{"ops":[{"skip":793},{"insert":"us"}],"crc32":2265754012,"timestamp":1634814514,"tsString":"2021-10-21 10:48:37.0 +00:00:00","version":83},{"ops":[{"skip":793},{"delete":2}],"crc32":1985745588,"timestamp":1634814515,"tsString":"2021-10-21 10:48:37.0 +00:00:00","version":84},{"ops":[{"skip":787},{"delete":6}],"crc32":1314735820,"timestamp":1634814515,"tsString":"2021-10-21 10:48:37.0 +00:00:00","version":85},{"ops":[{"skip":787},{"insert":"A"}],"crc32":1099121688,"timestamp":1634814515,"tsString":"2021-10-21 10:48:37.0 +00:00:00","version":86},{"ops":[{"skip":788},{"insert":"b"}],"crc32":133042811,"timestamp":1634814516,"tsString":"2021-10-21 10:48:37.0 +00:00:00","version":87},{"ops":[{"skip":789},{"insert":"ou"}],"crc32":1129333732,"timestamp":1634814516,"tsString":"2021-10-21 10:48:37.0 +00:00:00","version":88},{"ops":[{"skip":791},{"insert":"t u"}],"crc32":2441310206,"timestamp":1634814516,"tsString":"2021-10-21 10:48:37.0 +00:00:00","version":89},{"ops":[{"skip":794},{"insert":"s "}],"crc32":604254671,"timestamp":1634814517,"tsString":"2021-10-21 10:48:37.0 +00:00:00","version":90},{"ops":[{"skip":796},{"insert":"P"}],"crc32":4247513450,"timestamp":1634814517,"tsString":"2021-10-21 10:48:37.0 +00:00:00","version":91},{"ops":[{"skip":796},{"delete":1}],"crc32":604254671,"timestamp":1634814517,"tsString":"2021-10-21 10:48:37.0 +00:00:00","version":92},{"ops":[{"skip":796},{"insert":"page"}],"crc32":2597715793,"timestamp":1634814518,"tsString":"2021-10-21 10:48:37.0 +00:00:00","version":93},{"ops":[{"skip":800},{"insert":" s"}],"crc32":2514037088,"timestamp":1634814518,"tsString":"2021-10-21 10:48:37.0 +00:00:00","version":94},{"ops":[{"skip":802},{"insert":"etu"}],"crc32":1042196786,"timestamp":1634814518,"tsString":"2021-10-21 10:48:37.0 +00:00:00","version":95},{"ops":[{"skip":805},{"insert":"p"}],"crc32":3058473928,"timestamp":1634814518,"tsString":"2021-10-21 10:48:37.0 +00:00:00","version":96},{"ops":[{"skip":801},{"insert":"Setup#"},{"delete":5}],"crc32":901253396,"timestamp":1634814518,"tsString":"2021-10-21 10:48:37.0 +00:00:00","version":97},{"ops":[{"skip":806},{"delete":1}],"crc32":2753893082,"timestamp":1634814520,"tsString":"2021-10-21 10:48:37.0 +00:00:00","version":98},{"ops":[{"skip":801},{"delete":5}],"crc32":4316006,"timestamp":1634814521,"tsString":"2021-10-21 10:48:37.0 +00:00:00","version":99},{"ops":[{"skip":801},{"insert":"s"}],"crc32":2514037088,"timestamp":1634814521,"tsString":"2021-10-21 10:48:37.0 +00:00:00","version":100},{"ops":[{"skip":802},{"insert":"etu"}],"crc32":1042196786,"timestamp":1634814521,"tsString":"2021-10-21 10:48:37.0 +00:00:00","version":101},{"ops":[{"skip":805},{"insert":"p"}],"crc32":3058473928,"timestamp":1634814521,"tsString":"2021-10-21 10:48:37.0 +00:00:00","version":102},{"ops":[{"skip":806},{"insert":"\n"}],"crc32":2068945290,"timestamp":1634814522,"tsString":"2021-10-21 10:48:37.0 +00:00:00","version":103},{"ops":[{"skip":807},{"insert":"app.get(\"/\", function (req, res) {\n    // Will not fetch and display any dater in the index page\n    res.render(\"index\", { weather: null, error: null });\n});"}],"crc32":2377685150,"timestamp":1634814523,"tsString":"2021-10-21 10:48:37.0 +00:00:00","version":104},{"ops":[{"skip":842},{"delete":61}],"crc32":3004474151,"timestamp":1634814526,"tsString":"2021-10-21 10:48:37.0 +00:00:00","version":105},{"ops":[{"skip":841},{"delete":1}],"crc32":1957130064,"timestamp":1634814526,"tsString":"2021-10-21 10:48:37.0 +00:00:00","version":106},{"ops":[{"skip":817},{"insert":"a"}],"crc32":360144876,"timestamp":1634814529,"tsString":"2021-10-21 10:48:37.0 +00:00:00","version":107},{"ops":[{"skip":818},{"insert":"b"}],"crc32":2565383068,"timestamp":1634814530,"tsString":"2021-10-21 10:48:37.0 +00:00:00","version":108},{"ops":[{"skip":819},{"insert":"o"}],"crc32":2743187427,"timestamp":1634814530,"tsString":"2021-10-21 10:48:37.0 +00:00:00","version":109},{"ops":[{"skip":820},{"insert":"ut"}],"crc32":1038344613,"timestamp":1634814530,"tsString":"2021-10-21 10:48:37.0 +00:00:00","version":110},{"ops":[{"skip":822},{"insert":"-"}],"crc32":3954455387,"timestamp":1634814531,"tsString":"2021-10-21 10:48:37.0 +00:00:00","version":111},{"ops":[{"skip":823},{"insert":"u"}],"crc32":1899055390,"timestamp":1634814531,"tsString":"2021-10-21 10:48:37.0 +00:00:00","version":112},{"ops":[{"skip":824},{"insert":"s"}],"crc32":3914260149,"timestamp":1634814531,"tsString":"2021-10-21 10:48:37.0 +00:00:00","version":113},{"ops":[{"skip":824},{"delete":1}],"crc32":1899055390,"timestamp":1634814531,"tsString":"2021-10-21 10:48:37.0 +00:00:00","version":114},{"ops":[{"skip":823},{"delete":1}],"crc32":3954455387,"timestamp":1634814532,"tsString":"2021-10-21 10:48:37.0 +00:00:00","version":115},{"ops":[{"skip":823},{"insert":"u"}],"crc32":1899055390,"timestamp":1634814534,"tsString":"2021-10-21 10:48:37.0 +00:00:00","version":116},{"ops":[{"skip":824},{"insert":"s"}],"crc32":3914260149,"timestamp":1634814534,"tsString":"2021-10-21 10:48:37.0 +00:00:00","version":117},{"ops":[{"skip":866},{"insert":"a"},{"delete":5}],"crc32":2311611913,"timestamp":1634814536,"tsString":"2021-10-21 10:48:37.0 +00:00:00","version":118},{"ops":[{"skip":867},{"insert":"b"}],"crc32":3208525527,"timestamp":1634814536,"tsString":"2021-10-21 10:48:37.0 +00:00:00","version":119},{"ops":[{"skip":868},{"insert":"o"}],"crc32":4088593523,"timestamp":1634814537,"tsString":"2021-10-21 10:48:37.0 +00:00:00","version":120},{"ops":[{"skip":869},{"insert":"ut"}],"crc32":4040393439,"timestamp":1634814537,"tsString":"2021-10-21 10:48:37.0 +00:00:00","version":121},{"ops":[{"skip":871},{"insert":"-"}],"crc32":1861029505,"timestamp":1634814538,"tsString":"2021-10-21 10:48:37.0 +00:00:00","version":122},{"ops":[{"skip":872},{"insert":"us"}],"crc32":1849314584,"timestamp":1634814539,"tsString":"2021-10-21 10:48:37.0 +00:00:00","version":123},{"ops":[{"skip":823},{"delete":2}],"crc32":2080253459,"timestamp":1634814622,"tsString":"2021-10-21 10:48:37.0 +00:00:00","version":124},{"ops":[{"skip":822},{"delete":1}],"crc32":2191858645,"timestamp":1634814622,"tsString":"2021-10-21 10:48:37.0 +00:00:00","version":125},{"ops":[{"skip":817},{"delete":5}],"crc32":3843791595,"timestamp":1634814622,"tsString":"2021-10-21 10:48:37.0 +00:00:00","version":126},{"ops":[{"skip":816},{"delete":1}],"crc32":147492506,"timestamp":1634814623,"tsString":"2021-10-21 10:48:37.0 +00:00:00","version":127},{"ops":[{"skip":816},{"insert":"/about-us"}],"crc32":1849314584,"timestamp":1634814623,"tsString":"2021-10-21 10:48:37.0 +00:00:00","version":128},{"ops":[{"skip":873},{"delete":1}],"crc32":717774276,"timestamp":1634814627,"tsString":"2021-10-21 10:48:37.0 +00:00:00","version":129},{"ops":[{"skip":872},{"delete":1}],"crc32":1861029505,"timestamp":1634814627,"tsString":"2021-10-21 10:48:37.0 +00:00:00","version":130},{"ops":[{"skip":871},{"delete":1}],"crc32":4040393439,"timestamp":1634814628,"tsString":"2021-10-21 10:48:37.0 +00:00:00","version":131},{"ops":[{"skip":870},{"delete":1}],"crc32":2045153542,"timestamp":1634814628,"tsString":"2021-10-21 10:48:37.0 +00:00:00","version":132},{"ops":[{"skip":868},{"delete":2}],"crc32":3208525527,"timestamp":1634814628,"tsString":"2021-10-21 10:48:37.0 +00:00:00","version":133},{"ops":[{"skip":866},{"delete":2}],"crc32":3362173847,"timestamp":1634814629,"tsString":"2021-10-21 10:48:37.0 +00:00:00","version":134},{"ops":[{"skip":866},{"insert":"/about-us"}],"crc32":3565751844,"timestamp":1634814629,"tsString":"2021-10-21 10:48:37.0 +00:00:00","version":135},{"ops":[{"skip":866},{"delete":1}],"crc32":1849314584,"timestamp":1634814631,"tsString":"2021-10-21 10:48:37.0 +00:00:00","version":136},{"ops":[{"skip":866},{"insert":"v"}],"crc32":44146357,"timestamp":1634814632,"tsString":"2021-10-21 10:48:37.0 +00:00:00","version":137},{"ops":[{"skip":867},{"insert":"i"}],"crc32":1783084801,"timestamp":1634814632,"tsString":"2021-10-21 10:48:37.0 +00:00:00","version":138},{"ops":[{"skip":868},{"insert":"e"}],"crc32":1981319848,"timestamp":1634814632,"tsString":"2021-10-21 10:48:37.0 +00:00:00","version":139},{"ops":[{"skip":869},{"insert":"w"}],"crc32":4153829773,"timestamp":1634814632,"tsString":"2021-10-21 10:48:37.0 +00:00:00","version":140},{"ops":[{"skip":870},{"insert":"s/"}],"crc32":397316194,"timestamp":1634814633,"tsString":"2021-10-21 10:48:37.0 +00:00:00","version":141},{"ops":[{"skip":880},{"insert":"."}],"crc32":4208655594,"timestamp":1634814637,"tsString":"2021-10-21 10:48:37.0 +00:00:00","version":142},{"ops":[{"skip":881},{"insert":"e"}],"crc32":1839125784,"timestamp":1634814637,"tsString":"2021-10-21 10:48:37.0 +00:00:00","version":143},{"ops":[{"skip":882},{"insert":"j"}],"crc32":2612740969,"timestamp":1634814638,"tsString":"2021-10-21 10:48:37.0 +00:00:00","version":144},{"ops":[{"skip":883},{"insert":"s"}],"crc32":3337412947,"timestamp":1634814638,"tsString":"2021-10-21 10:48:37.0 +00:00:00","version":145},{"ops":[{"skip":883},{"delete":1}],"crc32":2612740969,"timestamp":1634814915,"tsString":"2021-10-21 10:48:37.0 +00:00:00","version":146},{"ops":[{"skip":882},{"delete":1}],"crc32":1839125784,"timestamp":1634814915,"tsString":"2021-10-21 10:48:37.0 +00:00:00","version":147},{"ops":[{"skip":881},{"delete":1}],"crc32":4208655594,"timestamp":1634814915,"tsString":"2021-10-21 10:48:37.0 +00:00:00","version":148},{"ops":[{"skip":880},{"delete":1}],"crc32":397316194,"timestamp":1634814915,"tsString":"2021-10-21 10:48:37.0 +00:00:00","version":149},{"ops":[{"skip":866},{"delete":5}],"crc32":3565751844,"timestamp":1634828304,"tsString":"2021-10-21 14:48:37.0 +00:00:00","version":150},{"ops":[{"skip":866},{"delete":1}],"crc32":1849314584,"timestamp":1634828304,"tsString":"2021-10-21 14:48:37.0 +00:00:00","version":151}]