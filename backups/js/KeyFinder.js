$(document).ready(function(){
	//Number of input boxes currently in the DOM
	var numChords = 2;
	//The key(s) you are in (returned to the screen)
	
	var keys = {
		//'a': ['a','asus','aadd9','a6','am7','am9','bm','bm6','bm7','bm9','bm11','bm13','c#m','c#m7','c#m11','d','dadd9','d6','dm7','dm9','dm7#11','e','esus','eadd9','e6','e7','e7sus','e9','e11','e13','f#m','f#m7','f#m11','g#m7b5'],
		'C/Am': ['c','d','e','f','g','a','b'],
		'G/Em': ['c','d','e','f#', 'gb','g','a','b'],
		'D/Bm': ['g','a','b','c#','db','d','e','f#','gb'],
		'A/F#m': ['g#','ab','a','b','c#','db','d','e','f#','gb'],
		'E/C#m': ['g#','ab','a','b','c#','db','d#','eb','e','f#','gb'],
		'B/G#m': ['g#','ab','a#','bb','b','c#','db','d#','e','f#','gb'],
		'F# or Gb/Eb or D#m': ['g#','ab','a#','bb','b','c#','db','d#','eb','e#','f','f#','gb'],
		'Db/Bbm': ['g#','ab','a#','bb','b#','c','c#','db','d#','eb','e#','f','f#','gb'],
		'Ab/Fm': ['g#','ab','a#','bb','b#','c','c#','db','d#','eb','e#','f','f#','gb'],
		'Eb/Cm': ['g','g#','ab','a#','bb','c','d','d#','eb','f#','gb'],
		'Bb/Gm':['a#','bb','c','d','d#','eb','f','g','a'],
		'F/Dm': ['g','a','a#','bb','c','d','e','f']
	};
	var scales = {
		//'a': ['a','asus','aadd9','a6','am7','am9','bm','bm6','bm7','bm9','bm11','bm13','c#m','c#m7','c#m11','d','dadd9','d6','dm7','dm9','dm7#11','e','esus','eadd9','e6','e7','e7sus','e9','e11','e13','f#m','f#m7','f#m11','g#m7b5'],
		'C/Am': ['c','d','e','f','g','a','b'],
		'G/Em': ['c','d','e','f#', 'gb','g','a','b'],
		'D/Bm': ['g','a','b','c#','db','d','e','f#','gb'],
		'A/F#m': ['g#','ab','a','b','c#','db','d','e','f#','gb'],
		'E/C#m': ['g#','ab','a','b','c#','db','d#','eb','e','f#','gb'],
		'B/G#m': ['g#','ab','a#','bb','b','c#','db','d#','e','f#','gb'],
		'F# or Gb/Eb or D#m': ['g#','ab','a#','bb','b','c#','db','d#','eb','e#','f','f#','gb'],
		'Db/Bbm': ['g#','ab','a#','bb','b#','c','c#','db','d#','eb','e#','f','f#','gb'],
		'Ab/Fm': ['g#','ab','a#','bb','b#','c','c#','db','d#','eb','e#','f','f#','gb'],
		'Eb/Cm': ['g','g#','ab','a#','bb','c','d','d#','eb','f#','gb'],
		'Bb/Gm':['a#','bb','c','d','d#','eb','f','g','a'],
		'F/Dm': ['g','a','a#','bb','c','d','e','f']
	};
	//Function to get each chord from the textInput fields, called by the 'Get the Key' button
	function collectChords(){
		var chords = [];
		for(i=1;i<numChords+1;i++){
			if($('input[name="' + ordinal(i) + 'Chord"]').val() !== ''){
				chords.push($('input[name="' + ordinal(i) + 'Chord"]').val().toLowerCase());
			}
		}
		return chords;
	}
	//Function to take the chords, see which keys they are in, and return the keys
	function giveKeys(chords){
		var addKey = true;
		var retKeys = [];
		for(var key in keys){
			for(var chord in chords){
				//TESTING ONLY --- //$('div#testDiv p#testP').append(' --- Testing' + ' ' + chords[chord] + ' in ' + keys[key] + ', and the result is: ' + jQuery.inArray(chords[chord],keys[key])); //testing//
				
				if(jQuery.inArray(chords[chord],keys[key])===-1) {
					addKey = false;
				}
			} 
			if(addKey===true){
				retKeys.push(key);
			}						
			addKey = true;						
		}
		return retKeys;
	}
	//Helper function to make numbers ordinal
	function ordinal(n){
	   var s = [ "th", "st", "nd", "rd" ],
	       v = n % 100;
	   return n + ( s[ (v-20) % 10 ] || s[ v ] || s[ 0 ] );
	}

	///////////////////////////////////
	//////////Click Listeners//////////
	///////////////////////////////////

	//Add another input box when 'Add Another Chord' is clicked
	$('#addAChord').click(function(e){
		if(numChords<8){
			$('div#errorDiv p#errorP').hide();
			$('#chordInputForm tr:nth-child('+ numChords + ')').after('<tr><td>'+ (ordinal(numChords+1)) + ':</td><td><input class="inputChord" type="text" name="' + ordinal(numChords+1) + 'Chord"></td></tr>');
			numChords+=1;
		} else{
			$('div#errorDiv p#errorP').html('8 chords is the max.').show();
		}
	});

	//Remove an input box when 'Remove a Chord' is clicked
	$('#removeChord').click(function(e){
		if(numChords>1){
			$('div#errorDiv p#errorP').hide();
			$('#chordInputForm tr:nth-child('+ (numChords) + ')').remove();
			numChords-=1;
		} else{
			$('div#errorDiv p#errorP').html('1 chord is the minimum.').show();
		}
	});

	//Return the key(s) when 'Get the Key' is clicked
	$('#getKey').click(function(e){
		//Get the DOM inputText fields from the screen
		var chordInputs = $('.inputChord').get();

		//Make sure the 1st input is not empty, and if it is, output an error message
		if($('input[name="' + ordinal(1) + 'Chord"]').val()===''){
			$('div#errorDiv p#errorP').html('Please enter a chord in the 1st Chord input box.').show();
		} else{
		//Call collectChords to return an array of chords that the user input
		$('div#errorDiv p#errorP').hide();
		var chords = collectChords();
		retKeys = giveKeys(chords);
		//Build and add the return div to the DOM
		$('div#errorDiv').after('<div id="giveKeys" class="leftDivs outputDivs">' +
			'<table><tr><td>The following chords:</td></tr></table>' + 
			'<p>' + chords.join(", ") + '</p>' +
			'<p>are in the following keys:</p>' +
			'<p>' + retKeys + '</p>' +
		'</div>');
		}
	});
});