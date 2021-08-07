'use strict'

const axios = require ('axios');
const Weather={};

let myMemory = {};

Weather.getWeatherHandler = function (req, res) {
    const city = req.query.searchQuery
    const lon = req.query.lon
    const lat = req.query.lat


    if (myMemory[city,lon,lat] !== undefined) {

        res.send(myMemory[city,lon,lat]);
      }


      else{
    //${process.env.API_KEY}
    const URL =`https://api.weatherbit.io/v2.0/forecast/daily?city=${city}&lat=${lat}&lon=${lon}&key=${process.env.WEATHER_API_KEY}`;


    axios
        .get(URL)
        .then(result => {
            console.log('inside promise');
            let weatherArray = result.data.data
            res.send(Weather.weatherForObject(weatherArray));
        })
        .catch(err => {
            res.send(err);
        })
    console.log('outside promise');
}
}
Weather.weatherForObject = (weatherObj) => {

    const forCastObj = [];
    weatherObj.map(element => {

        const description = `Low of ${element.low_temp} ,High of ${element.max_temp} with ${element.weather.description}`;
        const date = element.datetime;
        forCastObj.push(new Forcast(description, date));
        console.log(forCastObj);
    });
    return forCastObj;
};
class Forcast {
    constructor(description, date) {
        this.date = date;
        this.description = description;

    }
}

module.exports = Weather;