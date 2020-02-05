//retrive all data
function setup() {
	loadJSON("/all", got_data);
	console.log("running");
	redraw_data();
}

//add event handler to the submit button and direct value to the url
document.getElementById("submit").onclick = function(event) {
	console.log("clicked");

	var feeling = document.getElementById("feeling").value;
	console.log(feeling);
	document.getElementById("feeling").value = "";

	loadJSON("database/" + feeling, post_finished);
	
	function post_finished(data) {
		console.log(data);
		redraw_data();
	}
}

//redraw data when fired
function redraw_data() {

	loadJSON("/all", got_data);
}

//when data is recieved this function is fired
function got_data(data) {

	var h1_arr = document.getElementsByTagName("h1");

	for (var x = 0; x < h1_arr.length; x++) {

		h1_arr[x].innerHTML = "";
	}

	var arr_data = Object.keys(data);
	console.log(arr_data);

	var word_container = document.getElementById("word-container");
	word_container.style.width = "100%";
	word_container.style.height = "100%";

	var colourArr = ["rgb(255, 72, 72, 0.6)", "rgb(255, 117, 117, 0.6)", "rgb(47, 170, 206, 0.6)", "rgb(255, 128, 13, 0.6)", "rgb(39, 222, 85, 0.6)", "rgb(255, 222, 91, 0.6)"];
	
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
		h1.style.background = colourArr[Math.floor(Math.random() * colourArr.length)];

		$("h1").stop().animate({opacity: "1"}, 1500);
		console.log(x, y);
	}

	var last_key = arr_data[Object.keys(arr_data)[Object.keys(arr_data).length - 1]];
	var prev_key = arr_data[Object.keys(arr_data)[Object.keys(arr_data).length - 2]];
	console.log("prev key: " + JSON.stringify(prev_key) + " " + "last key: " + JSON.stringify(last_key));

	if (h1.innerHTML == last_key) {

		h1.style.color = "#000";
		h1.style.background = "rgb(255, 255, 255)";
	}

}
