//const { response } = require("express");

//////////////////////
//Nodemon src/app.js -e js,hbs    -------------extension pag gumawa ka ng hbs same lang sila ng output
///////////////////////
const geocodes = require("./utils/geocode"); /////////////////pag mag eexport laging may util or name ng folder then yung export name
const forecast = require("./utils/forecast"); /////////////////////GALING SA IBANG FILE WAG KALIMUTAN YUNG FOLDER
const path = require("path"); ////////////////path
const express = require("express");
// console.log(__dirname); ////////////////pang connect sa html
console.log(path.join(__dirname, "../public")); /////pang point sa directory
const hbs = require("hbs");
const { query } = require("express");

const app = express();

//-----------------Define Paths for express config-------------------------------------------------
const directory = path.join(__dirname, "../public");
const viewPath = path.join(__dirname, "../templates/views"); //////pag punta sa folder ng hbs
const partialsPath = path.join(__dirname, "../templates/partials");
//--------------------------------------------------------------------

//---Setup handlebars engine and view Location------------------------------------------------------------------------------
app.set("view engine", "hbs"); ///dynamic template
app.set("views", viewPath);
hbs.registerPartials(partialsPath);

//------------------------------------------------------------------------------------------------

//-----Set up Directory to serve ---------------------------------------------------------------------------
app.use(express.static(directory));
//-------------------------------------------------------------------------------

/////////////////////eto yung pag visit sa app.com
// app.get("", (req, res) => {
//   res.send("<h1><center>Welcome to My World</center></h1>");
// });

// app.get("/help", (req, res) => {
//   res.send({
//     name: "Emmanuel",
//   });
// });
// app.get("/about", (req, res) => {
//   res.send("About page");
// });
app.get("", (req, res) => {
  /////para to sa HBS  ////tapos yung view na file is dapat may S views
  res.render("index", {
    title: "My pikachu",
    name: " Emmanuel", //////////active sa index.hbc dun lalagay sa h1
  });
});
app.get("/about", (req, res) => {
  //////////////////////////////////////////get the image
  res.render("about", {
    title: "My pikachu",
    name: "Emmanuel",
  });
});
app.get("/help", (req, res) => {
  res.render("help", {
    title: "My Helping Hand",
    name: "Emmanuel",
  });
});

//////render pre yung may {{}} ganyan
/////pag send naman parang console .log lang
app.get("/help/*", (req, res) => {
  ////eto namna match nya si help pero may kasunod
  res.render("404", {
    title: "404",
    name: "Emmanuel",
    errorMessage: "Article not found",
  });
});

///asterish Match anything///dapat laging tong nasa baba kasi imamatch nyapa paitaas ito

//////////////ACCESING API IN BROWSER
app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You must put an Address",
    });
  } ///////////////////////////////FETCH SA ANOTHER FILES
  geocodes(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      ///={} pag wlang nilagay na location aprang default
      /////////sa geocode
      if (error) {
        return res.send({ error: error });
      }
      forecast(latitude, longitude, (error, forecastData) => {
        if (error) {
          return res.send({ error });
        }
        res.send({
          forecast: forecastData,
          location,
          address: req.query.address,
        });
      });
    }
  );

  // res.send([
  //   {
  //     Location: "Philippines",
  //   },
  //   {
  //     forecast: "Weather",
  //     lat: 1212312,
  //     lon: -75472374,
  //   },
  // ]);
});

app.get("/product", (req, res) => {
  if (!req.query.search) {
    //////pag res.send mag oobject ka katulad sa baba
    return res.send({
      ////return muna bago mag send
      error: "You must Provide Search Term",
    });
  }
  console.log(req.query.search);
  res.send({
    product: [],
  });
});
app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Emmanuel",
    errorMessage: "Page not Found",
  });
});

app.listen(3000, () => {
  console.log("Server is up on port 3000"); //////sa browser naman to
});

//port 3000 default
//app.com
//app.com/helps
//app.com/about

////////////////////////////index.htm deleted
