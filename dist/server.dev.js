"use strict";

var express = require("express");

var bodyParser = require("body-parser");

var request = require("request");

var app = express();

require('dotenv').config();

var apiKey = process.env.API_KEY;
app.use(express["static"]("public"));
app.use(bodyParser.urlencoded({
  extended: true
}));
app.set("view engine", "ejs");
app.get("/", function (req, res) {
  res.render("index", {
    weather: null,
    error: null
  });
});
app.post("/", function (req, res) {
  var city = req.body.city;
  var url = "http://api.openweathermap.org/data/2.5/weather?q=".concat(city, "&units=imperial&appid=").concat(apiKey);
  request(url, function (err, response, body) {
    if (err) {
      res.render("index", {
        weather: null,
        error: "Error, please try again"
      });
    } else {
      var weather = JSON.parse(body);

      if (weather.main == undefined) {
        res.render("index", {
          weather: null,
          error: "Error, please try again"
        });
      } else {
        var weatherText = "It's ".concat(weather.main.temp, " degrees in ").concat(weather.name, "!");
        res.render("index", {
          weather: weatherText,
          error: null
        });
      }
    }
  });
});
app.listen(3000, function () {
  console.log("Example app listening on port 3000!");
});