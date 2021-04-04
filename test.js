/* Test script
 ** - Does not required a tethered Arduino
 ** - Generates a random number for each endpoint for each request
 ** - Only tests three endpoints: A0, A1, D2
 */

// import dependencies
require("dotenv").config();
const fetch = require("node-fetch");

// get interval
const interval = +process.env.INTERVAL; // time interval for API requests

// random number generator
function getRandomNumber() {
  const min = Math.ceil(0);
  const max = Math.floor(255);
  return Math.floor(Math.random() * (max - min) + min);
}

// convert data to API requests at regular intervals
var sendData = setInterval(function () {
  const allPins = [
    {
      id: "A0",
      value: getRandomNumber(),
    },
    {
      id: "A1",
      value: getRandomNumber(),
    },
    {
      id: "D2",
      value: getRandomNumber(),
    },
  ];

  for (const pin of allPins) {
    console.log(`${process.env.API_HOST}/pins/${pin.id}`);
    fetch(`${process.env.API_HOST}/pins/${pin.id}`, {
      method: "PUT",
      body: JSON.stringify(pin),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((json) => console.log(json))
      .catch((err) => console.log(err));
  }
}, interval);
