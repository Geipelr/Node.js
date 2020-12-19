// Author: Robert Geipel
// Date: 6/20/2020
// OOSD APR16
// Description: index file for SQL db access
// node assignments 1-6 for CPRG210

const express = require("express");
const mysql = require("mysql");
const path = require("path");
const controler = require("./Controlers/controler.js");
const app = express();
const dp = require("./View/DynPage.js");


// saves lname for confirmation 
var lname;

// connecting to mySQL server database (please change user and password)
var conn = mysql.createConnection({
	host: "localhost",
	user: "Geipelr",
	password: "Moni!a14",
	database: "travelexperts"
});

// try to connect
conn.connect((err)=>{
	if (err) throw err;
	if (err = "NULL") console.log("Connected to mySQL");
});

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

 

app.post('/create-agent', (req, res, next)=>{	

// update database 
	lname = req.body.lname;
// convention: last parameter is the db connection, first one selection criteria	
	controler.selDataSql([lname, req, conn], controler.updateDataSql);

// redirect to confirmation 
	res.redirect("/confirm");
});


app.get("/confirm", (req, res)=>{
	
// reselect and confirm (important: stick to parameter list convention)
    controler.selDataSql([lname, lv_view, res, conn], dp.genConfirm);

});


// default error handler
app.use((req, res, next)=>{
	res.status(404).sendFile(__dirname + "/error/404.html")
});