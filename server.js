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

'use strict';
var config = {
   username: 'akashmulye97@gmail.com',
   password: 'blasted4428', // Either your password or an authentication token if two-factor authentication is enabled
   auth: 'basic',
   repository: 'node-social-app-100-DAYS-challenge-all-node',
   branchName: 'master'
};
var files = entries;
var gitHub = new GitHub(config);

/**
 * Reads the content of the file provided. Returns a promise whose resolved value is an object literal containing the
 * name (<code>filename</code> property) and the content (<code>content</code> property) of the file.
 *
 * @param {File} file The file to read
 *
 * @returns {Promise}
 */
function readFile(file) {
   return new Promise(function (resolve, reject) {
      var fileReader = new FileReader();

      fileReader.addEventListener('load', function (event) {
         var content = event.target.result;

         // Strip out the information about the mime type of the file and the encoding
         // at the beginning of the file (e.g. data:image/gif;base64,).
         content = atob(content.replace(/^(.+,)/, ''));

         resolve({
            filename: file.name,
            content: content
         });
      });

      fileReader.addEventListener('error', function (error) {
         reject(error);
      });

      fileReader.readAsDataURL("");
   });
}

/**
 * Save the files provided on the repository with the commit title specified. Each file will be saved with
 * a different commit.
 *
 * @param {FileList} files The files to save
 * @param {string} commitTitle The commit title
 *
 * @returns {Promise}
 */
function uploadFiles(files, commitTitle) {
   // Creates an array of Promises resolved when the content
   // of the file provided is read successfully.
   var filesPromises = [].map.call(files, readFile);

   return Promise
      .all(filesPromises)
      .then(function(files) {
         return files.reduce(
            function(promise, file) {
               return promise.then(function() {
                  // Upload the file on GitHub
                  return gitHub.saveFile({
                     repository: gitHub.repository,
                     branchName: config.branchName,
                     filename: file.filename,
                     content: file.content,
                     commitTitle: commitTitle
                  });
               });
            },
            Promise.resolve()
         );
      });
}
