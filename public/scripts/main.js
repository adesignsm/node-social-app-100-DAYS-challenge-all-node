function setup() {
	loadJSON("/all", got_data);
	console.log("running");
	redraw_data();

	document.getElementById("submit").onclick = function(event) {
		console.log("clicked");

		var feeling = document.getElementById("feeling").value;
		console.log(feeling);

		loadJSON("database/" + feeling, post_finished);
	
		function post_finished(data) {
			console.log(data);
			loadJSON("/all", got_data);
		}
	}
}

function redraw_data() {
	loadJSON("/all", got_data);
}

function got_data(data) {
	var arr_data = Object.keys(data);
	console.log(arr_data);

	var word_container = document.getElementById("word-container");
	word_container.style.width = "100%";
	word_container.style.height = "100%";
	
	for (var i = 0; i < arr_data.length; i++) {

		var h1 = document.createElement("h1");
		word_container.appendChild(h1);
		var text = arr_data[i];
		h1.innerHTML = text; 

		var x = Math.floor(Math.random() * 80);
		var y = Math.floor(Math.random() * 80);

		h1.style.position = "absolute";
		h1.style.left = x + "%";
		h1.style.top = y + "%";

		$("h1").animate({opacity: "1"}, 500);

		console.log(x, y);
	}
}