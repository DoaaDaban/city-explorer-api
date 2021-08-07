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
const Weather= require('./Weather');
const Movie=require('./Movie');

// http://localhost:3001/ (/ === root route)
server.get('/',(req,res) =>{ // we can call the req,res 
res.send('hi from the root route'); 
})

//=============================================lab8==========================================================

//http:localhost:3001/getWeather?lat=31.95&lon=35.91&searchQuery=Amman
server.get('/getWeather', Weather.getWeatherHandler);


//http:localhost:3001/movies?city=Amman
server.get('/movies', Movie.getMovieHandler);




// any other routes
server.get('*', (req,res)=> {
    res.status(404).send('page not found');
})


// listen, in the end of our code
server.listen(PORT,() =>{ // callback fun, when u listen to the port and got the request run this callback func
console.log(`Im listning on PORT ${PORT}`);

})



