// Längst upp på sidan är det bra att skriva globala variabler
var tones = [];
var toneCnt = 0;
var tonesInOctave = 12;
var root = 0;
var scaleID = 0;
var selectedTones;
var playing;
var activeIDs = [0,2,4,5,7,9,11,12,14,16,17,19,21,23,24];
var scaleSelector;


var replay;

function setSelectedTones(scale){

	// add octave
	scale = [...scale,...scale.map(el => el+12), scale[0]+24];
	setActiveVariations(scale);
	updateTrack();

	// update keyboard
	let keyboard = document.querySelector("#key-selector")
	let min = keyboard.min;
	let keys = scale.map(key => key + min);
	keyboard.pressedKeys = keys;


}




var scales = [
	{label: "All", id: "all", tones: [0,1,2,3,4,5,6,7,8,9,10,11]},
	{label: "7-note", id: "major", tones: [0,2,4,5,7,9,11]},
	{label: "5-note", id: "penta-major", tones: [0,2,4,7,9]}
];



document.addEventListener("DOMContentLoaded", e => {
		
		
	location.href = "#startpage"; // välj vilken sida som ska visas när sidan laddas
	
	document.querySelector("#play-btn").addEventListener("click", e => {

		if(playing){
			// e.target.classList.remove("bi-play-fill");
			// e.target.classList.add("bi-pause");

			e.target.classList.remove("btn-primary");
			e.target.classList.add("btn-outline-primary");
			
			iMusic("A").stop();
			// iMusic.setOffset(0);
		} else {
			// e.target.classList.add("bi-play-fill");
			// e.target.classList.remove("bi-pause");

			e.target.classList.add("btn-primary");
			e.target.classList.remove("btn-outline-primary");

			iMusic("A").play();
		}		
		playing = !playing;
	});
	
	// update the value box
	document.querySelectorAll("#settings input[type='range']").forEach(el => {
		el.addEventListener("input", e => {
			e.target.parentElement.querySelector("span").innerHTML = e.target.value;
		});
	});

	// update selected notes
	document.querySelector("#key-selector").addEventListener("up", e => {
		let selectedNotes = e.target.pressedKeys;
		let min = e.target.min;
		activeIDs = selectedNotes.map(el => el - min);
		setActiveVariations(activeIDs)
		updateTrack();
		// console.log(activeIDs);

	});
	
	// update the music on slider changes

	scaleSelector = document.querySelector("#scale-select");
	scaleSelector.addEventListener("change", e => {
		let scale = e.target.value.split(",").map(el => parseFloat(el));
		// console.log(scale);
		setSelectedTones(scale);
	});

	document.querySelector("#tempo-slider").addEventListener("input", e => {
		iMusic.set("tempo", parseFloat(e.target.value));
		updateTrack();
		callReplay();	
	});

	document.querySelector("#notes-slider").addEventListener("input", e => {
		let nrOfNotes = parseInt(e.target.value);
		updateTrack(nrOfNotes);
		callReplay();	
	});

	document.querySelector("#repeat-slider").addEventListener("input", e => {
		let repeatTimes = parseInt(e.target.value);
		iMusic("track1").set("repeat", repeatTimes);
		updateTrack();
		callReplay();	
	});

	waxml.addEventListener("init", e => {
		initMusic();

		let scale = scaleSelector.value.split(",").map(el => parseFloat(el));
		setSelectedTones(scale);
	});

	nodoubletapzoom(document.querySelector('body'));

	
});





const nodoubletapzoom = el => {
	el.addEventListener('touchstart', e => {
        var t2 = e.timeStamp;
        var t1 = el.dataset.lastTouch || t2;
        var dt = t2 - t1;
        var fingers = e.originalEvent.touches.length;
        el.dataset.lastTouch = t2;
        if (!dt || dt > 500 || fingers > 1) {
            return; // not double-tap
        }
        e.preventDefault(); // double tap - prevent the zoom
        // also synthesize click events we just swallowed up
        e.target.trigger('click');
    });
};



