const express = require("express");
const path = require("path");
const app = express();
const port = 8000;

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
	res.render("thanks");
});

app.post("/create-post", (req, res, next)=>{
	console.log(req.body);
	res.redirect("thanks");
});


// defaults to error page if routing failed 
app.use((req, res, next)=>{
	res.status(404).render("404");
});