'use strict'

const { request, response } = require("express");
const express = require ("express"); // import express library using require
const server =express();

// import json file
const weatherData = require('./data/weather.json');


const PORT = 3001;

// http://localhost:3001/ (/ === root route)
server.get('/',(req,res) =>{ // we can call the req,res what ever we want, bs the server gonna take the first one as req, and the sec as response
res.send('hi from the root route'); // cannot Get , we should npm start again

})

// we'll (in server side) create a specific url to let the front end side connect with me (as a server on it) >>> we call this url >>> route >> we use get >> forward slash >> once u get that rout call the callback func

// url? >> our local addres for my server ,,
// http:localhost:3001/test (/test === route)
server.get('/test',(request,response)=>{
  let str = 'Hello from the server side'; // bde ab3t had ll fronEnd as a response
  response.send(str); // btl3le l respone 3l browser

})

// hll2 bdna n3ml serve ll weather
// http://localhost:3001/getWeatherInfo (/getWeatherInfo === route)

server.get('/getWeatherInfo',(req,res)=>{
//console.log(weatherData);

// i want to get name, lat, lon, searchquery info

// let info= weatherData.map((item)=>{
//     return (
       
//     item.city_name,
//     item.lat
       
//     )
//    // console.log(item.city_name);
//  })
//  res.send(info);

let cityNames= weatherData.map((item)=>{
   return item.city_name;
  // console.log(item.city_name);
})
res.send(cityNames);

// let lat= weatherData.map((item)=>{
//     return item.lat;
//  })
//  res.send(lat);

//  let lon= weatherData.map((item)=>{
//     return item.lon;
//  })
//  res.send(lon);

})

// we have to put 500 status
// const handleErrorsAny=()=>{
//    // if(req===)
// res.status(500).send(weatherData);
// };
// handleErrorsAny();


// another route with params
// http://localhost:3001/getWeather?date=valid_date&desc=description (/getWeather===route)
server.get('/getWeather',(req,res) =>{
// console.log(req.query); // (req.query()) >> object contain all of the data attached after ? (params)

const  date= req.query.valid_date;
const desc= req.query.description;

// ill use .find() in order to find specific date and desc in my array

let weatherItem= weatherData.data.find(item =>{
    // if (item.date == valid_date && item.desc == description){
    //     return item;
    // }
    if (item.desc == 'description')
    return item;
})
// console.log(weatherItem);
res.send(weatherItem);
// res.send(weatherItem.description);

})

// after we finish serves our routes , we have to serve the rest of the routes (universe route) ,,,, and put not found >>> any other routes iza ma l2ahm >> not found // lazm a5r she a7t.ha ,3shan ma tn3ml abl l routes ele 3nde
server.get('*', (req,res)=> {
    res.status(404).send('page not found');
})


// listen, in the end of our code
server.listen(PORT,() =>{ // callback fun, when u listen to the port and got the request run this callback func

console.log(`Im listning on PORT ${PORT}`);

})



