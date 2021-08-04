'use strict'

const express = require ("express"); // import express library using require // npm i express
const server =express();
// import json file
const weatherData = require('./data/weather.json');
require('dotenv').config(); // .env // npm i dotenv
const cors = require('cors'); // cors // npm i cors
server.use(cors()); // the server can take any req from any client
const PORT = process.env.PORT;

// http://localhost:3001/ (/ === root route)
server.get('/',(req,res) =>{ // we can call the req,res 
res.send('hi from the root route'); 
})


// http://localhost:3001/weather?lat=31.9515694&lon=35.9239625&searchQuery=Amman (/weather === route)
server.get('/weather',(req,res)=>{
//res.send(weatherData);
//console.log('heeeeeeey');
const lat = Number(req.query.lat);
const lon = Number(req.query.lon);
//console.log(lat);
const cityName  = req.query.searchQuery.toLocaleLowerCase();

console.log(lat,lon,cityName);

// first solution
// const weatherResult  = weatherData.find(item => item.lat === lat && item.lon === lon &&  item.cityName .toLocaleLowerCase() === cityName  ? item : '');

// weatherResult  ? res.send(createForCastObje(weatherResult )) : res.send(creatErrorObj('Something went wrong.', 500));

// second sol
// console.log(weatherData);

const weatherResult = weatherData.find((item) => {

  if (((lat === item.lat) || (lon === item.lon)) || (cityName === item.city_name)) {

      return item;
  }
  else {

      return '';
  }

})

console.log(weatherResult);
// let myData= createForCastObje(weatherData);
// console.log(myData);

});



// const creatErrorObj = (errMsg, status) =>{
//   return {error: errMsg, status: status};
// };

const createForCastObje = (weatherObj) => {

const forCastObjArr =[];

//weatherData >> weatherData not defined
// data >> correct
weatherObj.data.map(item => {
  const description =  `Low of ${item.low_temp}, high of ${item.high_temp} with ${item.weather.description}`;

  const date =item.datetime;

  forCastObjArr.push(new Forecast(date, description));
});

return forCastObjArr;
};


class Forecast {
constructor(date='', description=''){
  this.date=date;
  this.description= description;
}
}


// any other routes
server.get('*', (req,res)=> {
    res.status(404).send('page not found');
})


// listen, in the end of our code
server.listen(PORT,() =>{ // callback fun, when u listen to the port and got the request run this callback func
console.log(`Im listning on PORT ${PORT}`);

})



