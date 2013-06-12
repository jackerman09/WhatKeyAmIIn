$(document).ready(function(){
	//Number of input boxes currently in the DOM
	var numChords = 2;
	//The key(s) you are in (returned to the screen)
	
	///////////////////////////////////
	//////////Static Data//////////////
	///////////////////////////////////

	var keys = {
		'C, Am': ['c','dm','em','f','g','am','bdim','cmaj7','dm7','em7','fmaj7','g7','am7','bm7b5'],
		'C#/Db, A#m/Bbm': ['c#','d#m','e#m','f#','g#','a#m','b#dim', 'db','ebm','fm','gb','ab','bbm','cdim', 'c#maj7','d#m7','e#m7','f#maj7','g#7','a#m7','b#m7b5', 'dbmaj7','ebm7','fm7','gbmaj7','ab7','bbm7','cm7b5'],
		'D, Bm': ['d','em','f#m','g','a','bm','c#dim', 'dmaj7','em7','f#m7','gmaj7','a7','bmin7','c#m7b5'],
		'Eb, Cm': ['eb','fm','gm','ab','bb','cm','ddim', 'd#','g#','a#','ebmaj7','fm7','gm7','abmaj7','bb7','cm7','dm7b5', 'd#maj7','g#maj7','a#7'],
		'E, C#m': ['e','f#m','g#m','a','b','c#m','d#dim','emaj7','f#m7','g#m7','amaj7','b7','c#m7','d#m7b5'],
		'F, Dm': ['f','gm','am','bb','c','dm','edim','fmaj7','gm7','am7','bbmaj7','c7','dm7','em7b5'],
		'F#/Gb, Ebm/D#m' : ['f#','g#m','a#m','b','c#','d#m','e#dim','gb','abm','bbm','cb','db','ebm','fdim','f#maj7','g#m7','a#m7','bmaj7','c#7','d#m7','e#m7b5','gbmaj7','abm7','bbm7','cbmaj7','db7','ebm7','fm7b5'],
		'G, Em' : ['g','am','bm','c','d','em','f#dim','gmaj7','am7','bm7','cmaj7','d7','em7','f#m7b5'],
		'Ab, Fm' : ['ab','bbm','cm','db','eb','fm','gdim', 'g#', 'a#m','c#','d#','abmaj7','bbm7','cm7','dbmaj7','eb7','fm7','gm7b5', 'g#maj7', 'a#m7','c#maj7','d#7'],
		'A, F#m' : ['a','bm','c#m','d','e','f#m','g#dim','amaj7','bm7','c#m7','dmaj7','e7','f#m7','g#m7b5'],
		'Bb, Gm' : ['bb','cm','dm','eb','f','gm','adim', 'a#', 'd#','bbmaj7','cm7','dm7','ebmaj7','f7','gm7','am7b5', 'a#maj7', 'd#maj7'],
		'B, Abm/G#m' : ['b','c#m','d#m','e','f#','g#m','a#dim','abm','bbdim','cb','dbm','ebm','fb','gb','bmaj7','c#m7','d#m7','emaj7','f#7','g#m7','a#m7b5','abm7','bbm7b5','cbmaj7','dbm7','ebm7','fbmaj7','gb7']
	};
	var availKeys = {
		'C':['C, Am'],
		'Am':['C, Am'],
		'C#/Db':['C#/Db, A#m/Bbm'],
		//'Db':['C#/Db, A#m/Bbm'],
		'A#m/Bbm':['C#/Db, A#m/Bbm'],
		//'Bbm':['C#/Db, A#m/Bbm'],
		'D':['D, Bm'],
		'Bm':['D, Bm'],
		'Eb':['Eb, Cm'],
		'Cm':['Eb, Cm'],
		'E':['E, C#m'],
		'C#m':['E, C#m'],
		'F':['F, Dm'],
		'Dm':['F, Dm'],
		'F#/Gb':['F#/Gb, Ebm/D#m'],
		//'Gb':['F#/Gb, Ebm/D#m'],
		'Ebm/D#m':['F#/Gb, Ebm/D#m'],
		//'D#m':['F#/Gb, Ebm/D#m'],
		'G':['G, Em'],
		'Em':['G, Em'],
		'Ab':['Ab, Fm'],
		'Fm':['Ab, Fm'],
		'A':['A, F#m'],
		'F#m':['A, F#m'],
		'Bb':['Bb, Gm'],
		'Gm':['Bb, Gm'],
		'B':['B, Abm/G#m'],
		'Abm/G#m':['B, Abm/G#m']
		//'G#m':['B, Abm/G#m']
	};
	var majorScales = {
		'C, Am': ['c','d','e','f','g','a','b'],
		'C#/Db, A#m/Bbm': ['g#','ab','a#','bb','b#','c','c#','db','d#','eb','e#','f','f#','gb'],
		'D, Bm': ['g','a','b','c#','db','d','e','f#','gb'],
		'Eb, Cm': ['g','g#','ab','a#','bb','c','d','d#','eb','f'],
		'E, C#m': ['g#','ab','a','b','c#','db','d#','eb','e','f#','gb'],
		'F, Dm': ['g','a','a#','bb','c','d','e','f'],
		'F#/Gb, Ebm/D#m': ['g#','ab','a#','bb','b','c#','db','d#','eb','e#','f','f#','gb'],
		'G, Em': ['c','d','e','f#','gb','g','a','b'],
		'Ab, Fm': ['g#','ab','a#','bb','b#','c','c#','db','d#','eb','e#','f','g'],
		'A, F#m': ['g#','ab','a','b','c#','db','d','e','f#','gb'],
		'Bb, Gm':['a#','bb','c','d','d#','eb','f','g','a'],
		'B, Abm/G#m': ['g#','ab','a#','bb','b','c#','db','d#','eb','e','f#','gb']					
	};
	var upOneNote = {
		'C':'Db',
		'C#':'D',
		'Db':'D',
		'D':'Eb',
		'D#':'Eb',
		'Eb':'E',
		'E':'F',
		'F':'Gb',
		'F#':'G',
		'Gb':'G',
		'G':'Ab',
		'G#':'A',
		'Ab':'A',
		'A':'Bb',
		'A#':'B',
		'Bb':'B',
		'B':'C'
	}
	var downOneNote = {
		'C':'B',
		'C#':'C',
		'Db':'C',
		'D':'Db',
		'D#':'D',
		'Eb':'D',
		'E':'Eb',
		'F':'E',
		'F#':'F',
		'Gb':'F',
		'G':'Gb',
		'G#':'G',
		'Ab':'G',
		'A':'Ab',
		'A#':'A',
		'Bb':'A',
		'B':'Bb'
	}

	///////////////////////////////////
	//////////Music Functions//////////
	///////////////////////////////////

	//Transpose function - Currently Unused
	function transpose(inputNote, numMoves, upOrDown){
		var transposedNote = inputNote;
		for(i=0; i<numMoves; i++){
			if(upOrDown==="Up" || upOrDown==="up"){
				transposedNote = upOneNote[transposedNote];
			} else if(upOrDown==="Down" || upOrDown==="down"){
				transposedNote = downOneNote[transposedNote];
			}
		}
		return transposedNote;
	}

	//TransposeUp function
	function transposeUp(inputNote, numMoves){
		var transposedNote = inputNote;
		for(i=0; i<numMoves; i++){
			transposedNote = upOneNote[transposedNote];
		}
		return transposedNote;
	}

	//TransposeDown function
	function transposeDown(inputNote, numMoves){
		var transposedNote = inputNote;
		for(i=0; i<numMoves; i++){
			transposedNote = downOneNote[transposedNote];
		}
		return transposedNote;
	}

	///////////////////////////////////
	//////////Click Functions//////////
	///////////////////////////////////

	//Add another row of drop-down boxes when 'Add Another Chord' is clicked
	function addAChord(e){
		if(numChords<8){
			var ordNumChords = ordinal(numChords + 1);
			$('div#errorDiv p#errorP').hide();
			$('#chordInputForm tr:nth-child('+ numChords + ')').after(
				'<tr>' + 
					'<td>'+ (ordNumChords) + ':</td>' +
					'<td>' + 
						'<select id="' + ordNumChords + 'Chord" name="' + ordNumChords + 'Chord" class="inputChord">' + 
							'<option value="a">A</option>' +
							'<option value="b">B</option>' +
							'<option value="c">C</option>' +
							'<option value="d">D</option>' +
							'<option value="e">E</option>' +
							'<option value="f">F</option>' +
							'<option value="g">G</option>' +
						'</select>' +
					'</td>' +
					'<td>' +
						'<select id="' + ordNumChords + 'ForB" name="' + ordNumChords + 'ForB" class="inputChord">' + 
							'<option value="">Natural</option>' +
							'<option value="#">#</option>' +
							'<option value="b">b</option>' +
						'</select>' +
					'</td>' + 
					'<td>' +
						'<select id="' + ordNumChords + 'mOrM" name="' + ordNumChords + 'mOrM" class="inputChord">' + 
							'<option value="Maj">Major</option>' +
							'<option value="m">Minor</option>' +
							'<option value="dom">Dominant</option>' +
						'</select>' +
					'</td>' + 
					'<td>' +
						'<select id="' + ordNumChords + 'Other" name="' + ordNumChords + 'Other" class="inputChord">' + 
							'<option value=""> -- </option>' +
							'<option value="5">5th</option>' +
							'<option value="7">7th</option>' +
							'<option value="7b5">7b5th</option>' +
							// '<option value="9">9th</option>' +
							// '<option value="11">11th</option>' +
							// '<option value="sus">Sus</option>' +
							// '<option value="dim">Dim</option>' +
						'</select>' +
					'</td>' +
				'</tr>'
				);
			numChords+=1;
		} else{
			$('div#errorDiv p#errorP').html('8 chords is the max.').show();
		}
	}

	//Add a row of drop-down boxes when 'Remove a Chord' is clicked
	function removeChord(e){
		e.preventDefault();
		if(numChords>1){
			$('div#errorDiv p#errorP').hide();
			$('#chordInputForm tr:nth-child('+ (numChords) + ')').remove();
			numChords-=1;
		} else{
			$('div#errorDiv p#errorP').html('1 chord is the minimum.').show();
		}
	}

	function getKey(e){
		//Get the DOM inputText fields from the screen
		var chordInputs = $('.inputChord').get();
		
		//Hide the error div
		$('div#errorDiv p#errorP').hide();

		//Call collectChords to return an array of chords that the user input
		var chords = collectChords();
		//Pass the collected chords to giveKeys to get back a list of keys the chords are in
		retKeys = giveKeys(chords);
		if(retKeys.length>0){
			retKeys = retKeys.split(", ");
		}

		//Build and add the return div to the DOM (if it is empty, indicate this in the div)
		if(retKeys.length !== 0){
			//Build the message that goes in the div
			var outputDiv;
			// outputDiv = buildOutputDiv(retKeys);
			outputDiv = '<div id="giveKeys" class="leftDivs outputDivs">';
			if(numChords > 1){
				outputDiv += '<p>The following chords:</p>';
			} else{
				outputDiv += '<p>The following chord:</p>';
			}
			outputDiv += '<p>' + chords.join(", ") + '</p>';
			//Determine plurality of chord(s) and key(s) for the output message
			if(numChords > 1){
				if(retKeys.length > 1){
					outputDiv += '<p>are in the following keys:</p>';
				} else {
					outputDiv += '<p>are in the following key:</p>';
				}
			} else {
				if(retKeys.length > 1){
					outputDiv += '<p>is in the following keys:</p>';
				} else {
					outputDiv += '<p>is in the following key:</p>';
				}
			}
			outputDiv += '<p id="outputKeyPara">';
			for(key in retKeys){
				outputDiv += '<span class="outputKey"><a href="#">' + retKeys[key] + '</a></span>   //   ';	
			}
			outputDiv = outputDiv.substr(0,outputDiv.length-7);
			outputDiv += '</p>';
			outputDiv += '<p style="font-size:12px;">(Select a key to display the fretBoard)</p>';
			outputDiv += '</div>';
			$('div#errorDiv').after(outputDiv);
		} else {
			$('div#errorDiv').after('<div id="giveKeys" class="leftDivs outputDivs">' +
				'<p>The following group of chord or group of chords:</p>' + 
				'<p>' + chords.join(", ") + '</p>' +
				'<p>is not in any key.</p>' +
			'</div>');
		}
	}

	function clearResults(e){
		$('.outputDivs').remove();
		for(i=1;i<numChords+1;i++){
			$('#' + ordinal(i) + 'Chord').val($('#' + ordinal(i) + 'Chord option:first').val());
			$('#' + ordinal(i) + 'ForB').val($('#' + ordinal(i) + 'ForB option:first').val());
			$('#' + ordinal(i) + 'mOrM').val($('#' + ordinal(i) + 'mOrM option:first').val());
			$('#' + ordinal(i) + 'Other').val($('#' + ordinal(i) + 'Other option:first').val());
		}
		$('div#errorDiv p#errorP').hide();
	}

	function outputKeyClicked(e){
		//Make the selected key white
		$('.activeKey').removeClass('activeKey');
		$(this).addClass('activeKey');
		
		$('.activeNote').removeClass('activeNote');
		
		//Make the fretboard only show the notes in the clicked key
		var clickedKey = $(this).text();
		var selectedNotes = majorScales[availKeys[clickedKey]];

		//Remove 'activeNote' from all notes so that they can be added to the selected key's notes
		$('.activeNote').removeClass('activeNote');

		//Add 'activeNote' to the notes in the selected key 
		for(note in selectedNotes){
			var useNote = selectedNotes[note];
			if(useNote.substr(useNote.length-1) !=='#'){
			 	$('div.' + useNote).addClass('activeNote');	
		 	}
		}

		//Show the fretboard
		$('div#keyBoard').hide();
		$('div#fretBoard').show();
		$('div#guitarPop').show();

		//Add the fretBoardSelectedKey class to the selected key on the fretBoard - bug #1 not in this block
		var clickedKeyToTransferToFretboard = $(this).text();
		$('div#fretBoardSelectKey ul li a#fretBoard' + clickedKeyToTransferToFretboard.replace("/","_").toLowerCase().replace("#","S")).click();
	}

	function guitarPopFretBoardLinkClicked(e){
		$('#fretBoardHeader').text('What Key Am I In - fretBoard');
		$('div#keyBoard').hide();
		$('div#fretBoard').show();
	}

	function guitarPopKeyBoardLinkClicked(e){
		$('#fretBoardHeader').text('What Key Am I In - keyBoard');
		$('div#fretBoard').hide();
		$('div#keyBoard').show();
	}

	//Display the fretBoard with no key selected
	function fretBoardLinkClicked(e){
		$('div#keyBoard').hide();
		$('.activeNote').removeClass('activeNote');
		$('div.note').addClass('activeNote');

		$('.fretBoardSelectedKey').removeClass('fretBoardSelectedKey');

		$('#fretBoardHeader').text('What Key Am I In - fretBoard');

		$('div#fretBoard').show();
		$('div#guitarPop').show();
	}

	//Display the keyBoard with no key selected
	function keyBoardLinkClicked(e){
		$('div#fretBoard').hide();
		$('.activeNote').removeClass('activeNote');
		$('div.note').addClass('activeNote');

		$('.fretBoardSelectedKey').removeClass('fretBoardSelectedKey');

		$('#fretBoardHeader').text('What Key Am I In - keyBoard');

		$('div#keyBoard').show();
		$('div#guitarPop').show();
	}

	function fretBoardKeySelectorClicked(e){
		//Make the selected key have a gray background
		$('.fretBoardSelectedKey').removeClass('fretBoardSelectedKey');
		$(this).addClass('fretBoardSelectedKey');

		//Make the fretboard only show the notes in the clicked key
		var clickedKey = $(this).text();
		var selectedNotes = majorScales[availKeys[clickedKey]];

		//Remove 'activeNote' from all notes so that they can be added to the selected key's notes
		$('.activeNote').removeClass('activeNote');

		//Add 'activeNote' to the notes in the selected key 
		for(note in selectedNotes){
			var useNote = selectedNotes[note];
			if(useNote.substr(useNote.length-1) !=='#'){
			 	$('div.' + useNote).addClass('activeNote');
		 	}
		}
	}

	function fretBoardTunerUpArrowClicked(e){
		var tunerToChange;
		var stringToChange;
		var fretsToChange;
		if($(this).attr('id').substr(0,1)==="h" || $(this).attr('id').substr(0,1)==="l"){
			tunerToChange = $('#tuner' + $(this).attr('id').substr(0,2));
			stringToChange = $(this).attr('id').substr(0,2) + 'String';
		} else {
			tunerToChange = $('#tuner' + $(this).attr('id').substr(0,1));
			stringToChange = $(this).attr('id').substr(0,1) + 'String';
		}
		fretsToChange = $('.' + stringToChange);

		//Get tuner's current value
		var currentHTML;
		currentHTML = $(tunerToChange).text();

		//Transpose the value 1 note up
		var transposedHTML = transposeUp(currentHTML, 1);
		var fretNum = 0;
		//Put the transposed value onto the tuner
		$(tunerToChange).text(transposedHTML);
		$(fretsToChange).each(function(index){
			//Change the text of the note showing on the fret
			currentHTML = $(this).text();
			transposedHTML = transposeUp(currentHTML, 1);
			$(this).text(transposedHTML);
			// $('p#testP').append('</br>Fret #: ' + fretNum + ', Currently: ' + currentHTML + ', transposed to: ' + transposedHTML);
			fretNum++;
			//Change the class on the fret, which should adjust for key selection
			$(this).removeClass();
			$(this).addClass('note');
			$(this).addClass('activeNote');
			$(this).addClass(stringToChange);
			$(this).addClass(transposedHTML.toLowerCase());
			// $('p#testP').append('</br>Added class: ' + transposedHTML.toLowerCase() + ', now has classes: ' + $(this).attr('class'));
		});

		//Click the selected key again to adjust display for new tuning
		$('.fretBoardSelectedKey').click();
	}

	function fretBoardTunerDownArrowClicked(e){
		var tunerToChange;
		var stringToChange;
		var fretsToChange;
		if($(this).attr('id').substr(0,1)==="h" || $(this).attr('id').substr(0,1)==="l"){
			tunerToChange = $('#tuner' + $(this).attr('id').substr(0,2));
			stringToChange = $(this).attr('id').substr(0,2) + 'String';
		} else {
			tunerToChange = $('#tuner' + $(this).attr('id').substr(0,1));
			stringToChange = $(this).attr('id').substr(0,1) + 'String';
		}
		fretsToChange = $('.' + stringToChange);

		//Get tuner's current value
		var currentHTML;
		currentHTML = $(tunerToChange).text();

		//Transpose the value 1 note down
		var transposedHTML = transposeDown(currentHTML, 1);
		//Put the transposed value onto the tuner
		$(tunerToChange).text(transposedHTML);
		$(fretsToChange).each(function(index){
			//Change the text of the note showing on the fret
			currentHTML = $(this).text();
			transposedHTML = transposeDown(currentHTML, 1);
			$(this).text(transposedHTML);

			//Change the class on the fret, which should adjust for key selection
			$(this).removeClass(currentHTML.toLowerCase());
			$(this).addClass(transposedHTML.toLowerCase());
		});

		//Click the selected key again to adjust display for new tuning
		$('.fretBoardSelectedKey').click();
	}

	function closeGuitarPop(e){
		$('.fretBoardSelectedKey').removeClass('fretBoardSelectedKey');
		$('div#guitarPop').hide();
		$('div#fretBoard').hide();
		$('div#keyBoard').hide();
	}

	//Function to get each chord from the textInput fields, called by the 'Get the Key' button
	function collectChords(){
		var chords = [];
		for(i=1;i<numChords+1;i++){
			//Create the chord from the 4 dropdown lists
			var letter = $('#' + ordinal(i) + 'Chord option:selected').val().toLowerCase();
			var ForB = $('#' + ordinal(i) + 'ForB option:selected').val().toLowerCase();
			var mOrM = $('#' + ordinal(i) + 'mOrM option:selected').val().toLowerCase();
			var other = $('#' + ordinal(i) + 'Other option:selected').val().toLowerCase();

			var chord = letter;
			
			chord += ForB;
			
			if(other!=='5'){
				if(mOrM==='maj' && other==='7'){
					//If it's a major 7th chord, display and test 'maj'
					//No change
				} else if(mOrM==='dom' && other==='7'){
					//If it's a dominant 7th chord, do not display or test 'dom'
					mOrM="";
				} else {
					//If it's not a 7th chord, do not display or test 'maj'
					if(mOrM==='maj'){
						mOrM="";
					}
				}	
				chord += mOrM;
			}
			
			chord += other;
			
			//Add created chord to chords array
			chords.push(chord);
		}
		return chords;
	}
	//Function to take the chords, see which keys they are in, and return the keys
	function giveKeys(chords){
		var addKey = true;
		var retKeys = [];
		for(var key in keys){
			for(var chord in chords){
				if(chords[chord].substr(chords[chord].length-1)==='5' && chords[chord].substr(chords[chord].length-3,3)!=='7b5'){
					if(jQuery.inArray(chords[chord].substr(0,chords[chord].length-1),majorScales[key])===-1) {
						addKey = false;
					}
				} else {
					if(jQuery.inArray(chords[chord],keys[key])===-1) {
						addKey = false;
					}
				}
			}
			if(addKey===true){
				retKeys.push(key);
			}						
			addKey = true;						
		}

		return retKeys.join(", ");
	}

	///////////////////////////////////
	//////////Helper Functions/////////
	///////////////////////////////////

	//Helper function to make numbers ordinal
	function ordinal(n){
	   var s = [ "th", "st", "nd", "rd" ],
	       v = n % 100;
	   return n + ( s[ (v-20) % 10 ] || s[ v ] || s[ 0 ] );
	}

	///////////////////////////////////
	//////////Click Listeners//////////
	///////////////////////////////////

	//Add another row of drop-down boxes when 'Add Another Chord' is clicked
	$('div#chordInputDiv').on('click','a#addAChord',addAChord);

	//Remove a row of drop-down boxes when 'Remove a Chord' is clicked
	$('div#chordInputDiv').on('click','a#removeChord',removeChord);

	//Return the key(s) in the given chord(s) when 'Get the Key' is clicked
	$('div#chordInputDiv').on('click','button#getKey',getKey);
	
	//Clear the results (keys) when the button 'Clear Results' button is clicked
	$('div#chordInputDiv').on('click','button#clearResults',clearResults);

	//Show the fretBoard when fretBoardLink is clicked with no key selected
	$('header#banner').on('click','li#fretBoardLink',fretBoardLinkClicked);	

	//Show the keyBoard when keyBoardLink is clicked with no key selected
	$('header#banner').on('click','li#keyBoardLink',keyBoardLinkClicked);	
	
	//Add click listener for the 'X' to close the fretBoard
	$('body').on('click','div#guitarPop div#closeGuitarPop',closeGuitarPop);		
	
	//Show the fretboard with the active key set to the outputKey that was clicked
	$('body').on('click','.outputKey',outputKeyClicked);

	//Show the fretBoard with the active key maintained when the guitarPop fretBoardLink is clicked
	$('body').on('click','li#guitarPopFretBoardLink',guitarPopFretBoardLinkClicked);

	//Show the keyBoard with the active key maintained when the guitarPop keyBoardLink is clicked
	$('body').on('click','li#guitarPopKeyBoardLink',guitarPopKeyBoardLinkClicked);

	//Add click listeners to the key selectors on the guitarPop window
	$('body').on('click','div#fretBoardSelectKey ul li a',fretBoardKeySelectorClicked);

	//Add click listeners to the up arrows on the fretBoard tuner
	$('body').on('click','div#guitarPop div.string div.upArrowDiv a',{upOrDown: "Up"},fretBoardTunerUpArrowClicked);

	//Add click listeners to the down arrows on the fretBoard tuner
	$('body').on('click','div#guitarPop div.string div.downArrowDiv a',{upOrDown: "Down"},fretBoardTunerDownArrowClicked);	
	
	$('body').on('click','div.note',showNotesClasses);
	function showNotesClasses(e){
		// $('p#testP').html($(this).text() + ' gives: ' + $(this).attr('class'));
	}

});