//intial global variables
var hours = document.getElementById("hours");
var minutes = document.getElementById("minutes");
var seconds = document.getElementById("seconds");
var h, m, s, today;

//function to retrieve the local time and date then convert it into the correct format
function getTimeandDate() {

	today = new Date();
	var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
	var days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

	document.getElementById("date").textContent = [today.getDate(), months[today.getMonth()], today.getFullYear()].join(" / ");
	m = today.getMinutes();
	s = today.getSeconds();

	minutes.textContent = m;
	seconds.textContent = s;

	hours.style.color = "#ff6961";
	minutes.style.color = "#aec6cf";
	seconds.style.color = "#11ff88";

	document.getElementById("progress-bar-h").style.width = h + "%";
	document.getElementById("progress-bar-m").style.width = m + "%";
	document.getElementById("progress-bar-s").style.width = s + "%";

	setTimeout(getTimeandDate, 1000);
}

//initialize new time/date to dettach from the settimeout function and update time for the 
//functions below
today = new Date();
h = today.getHours();
hours.textContent = h - 12;

//increase, decrease buttons and counter(multiplier) by which the hour number increases
var inc_btn = document.getElementById("inc-btn");
var dec_btn = document.getElementById("dec-btn");
var multiplier = 0;

//function to be called when inc_btn is clicked, comes with two parameters: time and x
function changeTime(time, x) {

	inc_btn.style.opacity = 1;
	dec_btn.style.opacity = 1;

	multiplier++;

	today = new Date();
	h = today.getHours();

	x = x - 12;

	inc_btn.onclick = function(event) {

		console.log(multiplier);

		x = x + multiplier;
		time.textContent = x;

		if (time.textContent >= 24 || time.textContent >= 12) {

			if (time.textContent == 23) {

				time.textContent = 11;
			}

			x = 0;

		} else {

			time.textContent = x;
		}

		console.log(x);
	}

	dec_btn.onclick = function(event) {

		console.log(multiplier);
		console.log(x);

		x = x - multiplier;
		time.textContent = x;

		if (time.textContent == 0) {
			
			time.textContent = 12;

			if (time.textContent == 12) {

				x = x + 12;
			}		
		}		
	}
}

//hours global variable click event handler
hours.onclick = function(event) {

	console.log("hours");
	changeTime(this, h);
}

getTimeandDate();



