//buttons
var a_btn = document.getElementById("a-btn");
var s_btn = document.getElementById("s-btn");
var d_btn = document.getElementById("d-btn");
var f_btn = document.getElementById("f-btn");

//sound files
var sound1 = new Audio("sounds/Basic-ringtone.mp3");
var sound2 = new Audio("sounds/Cartoon-message-tone.mp3");
var sound3 = new Audio("sounds/Message-ringtone.mp3");
var sound4 = new Audio("sounds/Text-tone-sound-effect.mp3");

//two arrays one for for keydown and one for keyup(padding)
var btn_Arr_down = ["1.8%", "2.3%"];
var btn_Arr_up = ["2%", "2.5%"];

//two objects with padding properties both for keyup and keydown
var btn_down_obj = {
	padTopNeg: btn_Arr_down[0],
	padBotNeg: btn_Arr_down[0],
	padLeftNeg: btn_Arr_down[1],
	paddingRightNeg: btn_Arr_down[1],
	bg_color: "#ff6961",
	font_color: "#fff"
};

var btn_up_obj = {
	padTopPos: btn_Arr_up[0],
	padBotPos: btn_Arr_up[0],
	padLeftPos: btn_Arr_up[1],
	paddingRightPos: btn_Arr_up[1],
	bg_color: "#fff",
	font_color: "#000"
};

//counters for sound manipulation using if statements
var a_counter = 0;
var s_counter = 0;
var d_counter = 0;
var f_counter = 0;

//keydown function
function buttonStuffDown(button, sound) {

	button.style.paddingTop = btn_down_obj.padTopNeg;
	button.style.paddingBottom = btn_down_obj.padBotNeg;
	button.style.paddingLeft = btn_down_obj.padLeftNeg;
	a_btn.style.paddingRight = btn_down_obj.paddingRightNeg;

	button.style.backgroundColor = btn_down_obj.bg_color;
	button.style.color = btn_down_obj.font_color;
	sound.play();
}

//keyup function
function buttonStuffUp(button, sound) {

	button.style.paddingTop = btn_up_obj.padTopPos;
	button.style.paddingBottom = btn_up_obj.padBotPos;
	button.style.paddingLeft = btn_up_obj.padLeftPos;
	a_btn.style.paddingRight = btn_up_obj.paddingRightPos;

	button.style.backgroundColor = btn_up_obj.bg_color;
	button.style.color = btn_up_obj.font_color;

	sound.pause();
	sound.currentTime = 0;
}

//keydown activates the keydown function
document.onkeydown = function(event) {

	if (event.keyCode === 65) {
		a_counter = 1;

		if (a_counter == 1) {
			buttonStuffDown(a_btn, sound1);
			a_counter = 0;
		}
	
	}

	if (event.keyCode === 83) {
		s_counter = 1;

		if (s_counter == 1) {
			buttonStuffDown(s_btn, sound2);
			s_counter = 0;
		}
	
	}

	if (event.keyCode === 68) {
		d_counter = 1;

		if (d_counter == 1) {
			buttonStuffDown(d_btn, sound3);
			d_counter = 0;
		}
	
	}

	if (event.keyCode === 70) {
		f_counter = 1;

		if (f_counter == 1) {
			buttonStuffDown(f_btn, sound4);
			f_counter = 0;
		}
	}
}

//keyup activates the keyup function
document.onkeyup = function(event) {

	if (a_counter == 0) {
		buttonStuffUp(a_btn, sound1);
	}

	if (s_counter == 0) {
		buttonStuffUp(s_btn, sound2);
	}

	if (d_counter == 0) {
		buttonStuffUp(d_btn, sound3);
	}

	if (f_counter == 0) {
		buttonStuffUp(f_btn, sound4);
	}
}

