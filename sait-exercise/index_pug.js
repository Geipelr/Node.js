// Author: Robert Geipel
// Date: 6/20/2020
// OOSD APR16
// Description: index file using pug templates
// node assignments 1-6 for CPRG210

const express = require("express");
const path = require("path");
const controler = require("./Controlers/controler.js");
const dp = require("./View/DynPage.js");
const mongo = require("mongodb").MongoClient;
const app = express();
const port = 8000;


// saves lname for confirmation 
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



// template engine looks there
app.set("views", path.join(__dirname, "views_plug"));
// sets up template engine
app.set("view engine", "pug");


//kicks off the server
app.listen(port, ()=>{ console.log(`Server started on port ${ port }`);
});


// to render form content
app.use(express.urlencoded( { extended: true } ));


// for references to pics 
app.use(express.static(path.join(__dirname, 'Media')));


// routing to index, contact, register and thanks web page
app.get("/", (req, res)=>{
	res.render("index", { name: "harv"} );
});

app.get("/contact", (req, res)=>{
	res.render("contact");
});

app.get("/register", (req, res)=>{
	res.render("register");
});

app.get("/thanks", (req, res)=>{
// reselect and thanks, same convention as below
	controler.selDataMongo([lname,  res, conn], dp.genThanks);
});

app.post("/create-post", (req, res, next)=>{
// update database 
	lname = req.body.lname;
// convention: last parameter is the db connection, first one selection criteria	
	controler.selDataMongo([lname, req, conn], controler.updateDataMongo);
// redirect to confirmation 
	res.redirect("thanks");
});


// defaults to error page if routing failed 
app.use((req, res, next)=>{
	res.status(404).render("404");
});