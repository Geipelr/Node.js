// Author: Robert Geipel
// Date: 6/20/2020
// OOSD APR16
// Description: index file for mongo db access
// node assignments 1-6 for CPRG210

const express = require("express");
const path = require("path");
const app = express();
const mongo = require("mongodb").MongoClient;
const controler = require("./Controlers/controler.js");
const dp = require("./View/DynPage.js");

var lname;

// connecting to mongo database
const url = "mongodb://localhost:27017";
var conn;
// try to connect
mongo.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  },
  (err, client) => { if (err) throw err; if (err = "NULL") console.log("Connected to mongo database"); conn = client; }
);


// start server with success log message
app.listen(8000, ()=>{ console.log("Server started on port 8000");
});


// View directory
lv_view = path.join(__dirname, 'View');

// to render form content
app.use(express.urlencoded( { extended: true } ));

// media
app.use(express.static(path.join(__dirname, 'media')));

// js and css-files
app.use(express.static(path.join(__dirname, 'public')));

// static html-files
app.use(express.static(lv_view, {
	extensions: ["html"]
}));

 

// routing post request and updating data base
app.post('/create-agent', (req, res, next)=>{	

// update database (same convention as for SQL applies)
	lname = req.body.lname;
	controler.selDataMongo([lname, req, conn], controler.updateDataMongo);

// redirect to confirmation 
	res.redirect("/confirm");

});

app.get("/confirm", (req, res)=>{
	
// reselect and confirm (same convention as for SQL applies)
    controler.selDataMongo	([lname, lv_view, res, conn], dp.genConfirm);

});




// default error handler
app.use((req, res, next)=>{
	res.status(404).sendFile(__dirname + "/error/404.html")
});