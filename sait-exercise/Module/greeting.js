// Author: Robert Geipel
// Date: 6/20/2020
// OOSD APR16
// Description: greeting package
// node assignments 1-6 for CPRG210

const greetings = ["Welcome new agent", "Bienvenue nouveau agent", "Hallo neuer Agent"];

exports.greet = function  getGreeting()
{
	let rand = Math.floor(Math.random() * greetings.length);
	return greetings[rand];
} 

//exports.greet = ()=>getGreeting();