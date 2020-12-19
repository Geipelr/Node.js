const express = require("express");
const path = require("path");
const app = express();
const mongo = require("mongodb").MongoClient;


// connecting to mongo database
const url = "mongodb://localhost:27017";
var conn;
// try to connect
mongo.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  },
  (err, client) => { if (err = "NULL") console.log("Connected to mongo database"); conn = client; }
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
// insert only if no such record		
    var dbo = conn.db("travelexperts");
	var query = { AgtLastName: `${ req.body.lname }`};
	dbo.collection("agents").find(query).toArray(function(err, result) {
		if (err = "NULL") {
			console.log("Select executed");
			console.log(result.length);
		}
 	if (result.length > 0) {
// data set not empty -> update agent
            console.log(result[0]._id);
			var myquery = { _id: result[0]._id };
			var myobj = { $set: { AgtFirstName: req.body.fname, AgtLastName: req.body.lname, AgtEmail: req.body.email } };
			dbo.collection("agents").updateOne(myquery, myobj, function(err, res) {
				if (err = "NULL") console.log("Update executed");    
			});		
		}
		else
// data set empty -> insert new agent
		{
			var myobj = { AgtLastName: `${ req.body.lname }`, AgtFirstName: `${ req.body.fname }` };
			dbo.collection("agents").insertOne(myobj, function(err, res) {
				if (err = "NULL") console.log("Insert executed");    
			});
		};
   });
   res.end();
});




// default error handler
app.use((req, res, next)=>{
	res.status(404).sendFile(__dirname + "/error/404.html")
});