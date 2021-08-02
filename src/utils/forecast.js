const request = require("request");

const forecast = (latitude, longitude, callback) => {
  const url =
    "http://api.weatherstack.com/current?access_key=fa0aa4ac0c22e84af1a0a021a144c34e&query=" +
    latitude +
    "," +
    longitude +
    "&units=f";

  request({ url: url, json: true }, (error, response) => {
    if (error) {
      callback("unable to connect to weather services!", undefined);
    } else if (response.body.error) {
      callback("unable to find location", undefined);
    } else {
      callback(
        undefined,
        `${response.body.current.weather_descriptions[0]}. It is currentlly ${response.body.current.temperature} degrees out. It feels like ${response.body.current.feelslike} degree out.`
      );
    }
  });
};
module.exports = forecast;
