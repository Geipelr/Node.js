// Author: Robert Geipel
// Date: 6/20/2020
// OOSD APR16
// Description: controller package

const dp = require("../View/DynPage.js");

exports.updateDataSql = function update(result, req, conn)
{
// insert only if no such record		
		if (result.length > 0) {
// data set not empty -> update agent
			var sql_upd = { 
				"sql": "UPDATE agents SET AgtFirstName = ?, AgtLastName = ?, AgtEmail = ?, AgtBusPhone = ?" + 
							"WHERE AgentId = ?",
				"values": [req.body.fname, req.body.lname, req.body.email, req.body.phone, result[0].AgentId]
			};
			conn.query(sql_upd, (err, result, fields)=>{
				if (err = "NULL") console.log("Update executed");
			});
		}
		else
// data set empty -> insert new agent
		{
			var sql_ins = { 
				"sql": "INSERT INTO agents (AgtFirstName, AgtLastName, AgtEmail, AgtBusPhone)" + 
							"VALUES (?, ?, ?, ?)",
				"values": [req.body.fname, req.body.lname, req.body.email, req.body.phone]
			};
			conn.query(sql_ins, (err, result, fields)=>{ 
				if (err = "NULL") console.log("Insert executed");
			});	
		};
}


exports.updateDataMongo = function update(result, req, dbo)
{
// insert only if no such record		
 	if (result.length > 0) {
// data set not empty -> update agent
        console.log(result[0]._id);
		var myquery = { _id: result[0]._id };
		var myobj = { $set: { AgtFirstName: req.body.fname, AgtLastName: req.body.lname, AgtEmail: req.body.email } };
		dbo.collection("agents").updateOne(myquery, myobj, function(err, res) {
			if (err = "NULL") console.log("Update executed");
//			if (err) throw err;
		});		
	}
	else
// data set empty -> insert new agent
	{
		// get current sequence number
		dbo.collection("Counter").findOne({}, function(err, result_add) {
			if (err) throw err;
			if (err = "NULL") console.log("Sequence Number selected: " + result_add.sequence_value);
			var myobj = { _id: `${ result_add.sequence_value }`, AgentId: `${ result_add.sequence_value }`, AgtLastName: `${ req.body.lname }`, AgtFirstName: `${ req.body.fname }`, AgtEmail: `${ req.body.email }` };
			// actual insert
			dbo.collection("agents").insertOne(myobj, function(err, res) {
				if (err) throw err;
				if (err = "NULL") console.log("Insert executed");
				// increment sequence number
				result_add.sequence_value = result_add.sequence_value + 1;
				var myquery = { _id: result_add._id };
				var myobj = { $set: { sequence_value: result_add.sequence_value } };
				// update water level marker
				dbo.collection("Counter").updateOne(myquery, myobj, function(err, res) {
					if (err) throw err;
					if (err = "NULL") console.log("Counter incremented");
				});
			});
		});
	};

}


exports.selDataSql = (parameters, callbackFunc)=>{

// run query to get record 
	var sql = {
		"sql": "SELECT * from agents where AgtLastName = ?",
		"values": parameters[0]
	};	

// last parameter is the db connection
	var lv_length = parameters.length - 1.
// update view or database depending on callback function
	parameters[lv_length].query(sql, (err, result, fields)=>{
		if (err) throw err;
// first parameter can be reused for query result		
		parameters[0] = result;
		callbackFunc.apply(null, parameters);
	});
		
}

exports.selDataMongo = (parameters, callbackFunc)=>{

// last parameter is the db connection
	var lv_length = parameters.length - 1.

// run query to get record
	var dbo = parameters[lv_length].db("travelexperts");
	var query = { AgtLastName: `${ parameters[0] }`};

// update view or database depending on callback function
	dbo.collection("agents").find(query).toArray(function(err, result) {
		if (err) throw err;

		parameters[0] = result;
		parameters[lv_length] = dbo
		callbackFunc.apply(null, parameters);
	});
		
}

