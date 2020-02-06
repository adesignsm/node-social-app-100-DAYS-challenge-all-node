console.log("server is running");

//fs require and data vars
var fs = require("fs");
var data = fs.readFileSync("db.json");
var entries = JSON.parse(data);
var Github = require("github-api");

//server setup
var express = require("express");
var app = express();
var port = process.env.PORT || 3000;
var server = app.listen(port, listening);


//logs that server is running
function listening() {

	console.log("waiting for action");
}

//new express.js feature to use static files
app.use(express.static("./public/", {index: "index.html"}));
app.get("/database/:feeling", add_feeling);

//add in a new post
function add_feeling(request, response) {

	var data = request.params;
	var feeling = data.feeling;
	var reply;

	if (!feeling) {

		var reply = {
			msg: "feeling is empty"
		}

		response.send(reply);
	
	} else {

		entries[feeling] = feeling;
		var data = JSON.stringify(entries, null, 2);
		fs.writeFile("db.json", data, finished_adding);

		function finished_adding(err) {
			console.log(err);

			reply = {

				feeling: feeling,
				status: "success",
				msg: "thankyou for your post"
			}

			response.send(reply);
		}
	}
}

//populates the data
app.get("/all", show_db);

//url to get the whole database
function show_db(request, response) {

	response.send(entries);
}

//get request to search for a word
app.get("/search/:feeling", search_word);

//search word function
function search_word(request, response) {

	var feeling = request.params.feeling;
	var reply;
	feeling = entries[feeling];

	if (entries[feeling]) {

		reply = {

			status: "found",
			feeling: feeling,
		}
	
	} else if (!entries[feeling]) {

		reply = {
			status: "not found",
			feeling: feeling,
		}
	}

	response.send(reply); 
}

