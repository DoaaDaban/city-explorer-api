'use strict'

const express = require ("express"); // import express library using require // npm i express
const server =express();
// // import json file
// const weatherData = require('./data/weather.json'); // import json file
require('dotenv').config(); // .env // npm i dotenv
const cors = require('cors'); // cors // npm i cors
server.use(cors()); // the server can take any req from any client
const PORT = process.env.PORT;
const axios = require('axios');

// http://localhost:3001/ (/ === root route)
server.get('/',(req,res) =>{ // we can call the req,res 
res.send('hi from the root route'); 
})

//======================lab8======================

//http:localhost:3001/getWeather?lat=31.95&lon=35.91&searchQuery=Amman
server.get('/getWeather', getWeatherHandler);

async function getWeatherHandler(req, res) {
    const city = req.query.searchQuery
    const lon = req.query.lon
    const lat = req.query.lat

    //${process.env.API_KEY}
    const URL = `https://api.weatherbit.io/v2.0/forecast/daily?city=${city}&lat=${lat}&lon=${lon}&key=1d6da6b9e31745839be632003e29d9e8`;


    axios
        .get(URL)
        .then(result => {
            console.log('inside promise');
            let weatherArray = result.data
            res.send(weatherForObject(weatherArray));
        })
        .catch(err => {
            res.send(err);
        })
    console.log('outside promise');
}

const weatherForObject = (weatherObj) => {

    const forCastObj = [];
    weatherObj.data.map(element => {

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

//http:localhost:3001/movies?city=Amman
server.get('/movies', getMovieHandler);

function getMovieHandler(req, res) {
    const city = req.query.city

    //https://api.themoviedb.org/3/search/movie?api_key=6680ffabd529834b6beac25752cbb0ad&query=amman
    const URLMovie = `https://api.themoviedb.org/3/search/movie?api_key=6680ffabd529834b6beac25752cbb0ad&query=${city}`

    axios
        .get(URLMovie)
        .then(result => {
            console.log('inside promise');

            let moviesArray = result.data.results

            res.send(moviesForObject(moviesArray));
        })
        .catch(err => {
            res.send(err);
        })
    console.log('outside promise');
}


const moviesForObject = (moviesObj) => {

    const forMoviesObj = [];
    moviesObj.map(element => {

    const title = element.title
    const overview = element.overview
    const vote_average = element.vote_average
    const vote_count = element.vote_count
    const poster_path = process.env.img_url+element.poster_path
    const popularity = element.popularity
    const release_date = element.release_date

        forMoviesObj.push(new Movies(title,overview,vote_average,vote_count,poster_path,popularity,release_date));

        console.log(forMoviesObj);
    });
    return forMoviesObj;
}


class Movies { // movie class
    constructor(title,overview,vote_average,vote_count,poster_path,popularity,release_date) {
    this.title = title
    this.overview = overview
    this.vote_average = vote_average
    this.vote_count = vote_count
    this.poster_path = poster_path
    this.popularity = popularity
    this.release_date = release_date
    }
}


//========================lab7=====================

// // http://localhost:3001/weather?lat=31.9515694&lon=35.9239625&searchQuery=Amman (/weather === route)
// server.get('/weather',(req,res)=>{
// //res.send(weatherData);
// //console.log('heeeeeeey');
// const lat = Number(req.query.lat);
// const lon = Number(req.query.lon);
// //console.log(lat);
// const cityName  = req.query.searchQuery.toLocaleLowerCase();

// console.log(lat,lon,cityName);

// // first solution
// // const weatherResult  = weatherData.find(item => item.lat === lat && item.lon === lon &&  item.cityName .toLocaleLowerCase() === cityName  ? item : '');

// // weatherResult  ? res.send(createForCastObje(weatherResult )) : res.send(creatErrorObj('Something went wrong.', 500));

// // second sol
// // console.log(weatherData);

// const weatherResult = weatherData.find((item) => {

//   if (((lat === item.lat) && (lon === item.lon)) && (cityName === item.city_name.toLocaleLowerCase())) {

//       return item;
//   }
//   else {
//       return '';
//   }

// })



// //console.log(weatherResult);
// let myData= createForCastObje(weatherResult);
// res.send(myData);

// });



// // const creatErrorObj = (errMsg, status) =>{
// //   return {error: errMsg, status: status};
// // };

// const createForCastObje = (weatherObj) => {

// const forCastObjArr =[];

// //weatherData >> weatherData not defined
// // data >> correct
// weatherObj.data.map(item => {
//   const description =  `Low of ${item.low_temp}, high of ${item.high_temp} with ${item.weather.description}`;

//   const date =item.datetime;

//   forCastObjArr.push(new Forecast(date, description));
// });

// return forCastObjArr;
// };


// class Forecast {
// constructor(date='', description=''){
//   this.date=date;
//   this.description= description;
// }
// }


// any other routes
server.get('*', (req,res)=> {
    res.status(404).send('page not found');
})


// listen, in the end of our code
server.listen(PORT,() =>{ // callback fun, when u listen to the port and got the request run this callback func
console.log(`Im listning on PORT ${PORT}`);

})



