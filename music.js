



var beat = 1;
var part = [];
var nrOfNotes;




function initMusic(tones = [], callback){


	iMusic.set("tempo", 40);
	iMusic.set("timeSign", "1/4");
	iMusic.set("audioPath", "audio");
	iMusic.set("suffix", "mp3");
	iMusic.set("partLength", "1/4");
	iMusic.set("retrig", "repeat");
	iMusic.set("quantize", "1/128");
	iMusic.set("fadeTime", 0);


	// iMusic.debug = true;	
	
	tones = new Array(25).fill(0).map((el, i) => i+48);
	tones.forEach(function(tone){
		// var fileName = tone.noteNumber.toString() + ".mp3";

		let url = `audio/${tone}.mp3`;
		
		// for looped tracks
		part.push(url);
		
		// För Live keyboard:
		iMusic("A").addMotif(url).set("tags", `note${tone}`);
	});
	
	let section = iMusic.querySelector("A");
	section.addLoopTrack().set("tags", "track1").set("volume", 0.7);
		
}

function updateTrack(nrOfN){
		
	nrOfNotes = nrOfN || nrOfNotes || 1;
	var sequence = [];

	for(var i = 0; i < nrOfNotes; i++){
		sequence.push(part);
	}
	var loopEnd = (nrOfNotes*2+1) + ".1";
	iMusic("track1").update(sequence).set("loopEnd", loopEnd);
	
}

function setActiveVariations(selection){
	
	iMusic("track1").setActiveVariations(selection);
}



function callReplay(){
	
	
	if(!iMusic.isPlaying()){return}
	
	if(replay){clearTimeout(replay)}
	//iMusic.setOffset(-5);
	iMusic("A").stop();
	
	replay = setTimeout(function(){
		
		iMusic("A").play();
	}, 1500);
	
}
