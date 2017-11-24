
let SpeechRecognition = SpeechRecognition || webkitSpeechRecognition
let SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList
let SpeechRecognitionEvent = SpeechRecognitionEvent || webkitSpeechRecognitionEvent


let output, capture, recognition, speechRecognitionList;

const matches = {
  positive: ["yes", "yeah", "right"],
  negative: [ "no", "nope", "left" ]
}

// var grammar = '#JSGF V1.0; grammar triggerWords; public <triggerWords> = ' + triggerWords.join(' | ') + ' ;'

window.onload = function() {

  SpeechRecognition = SpeechRecognition || webkitSpeechRecognition
  SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList
  SpeechRecognitionEvent = SpeechRecognitionEvent || webkitSpeechRecognitionEvent

  output = document.querySelector('.result');
  capture = document.querySelector('.speech');

  recognition = new SpeechRecognition();
  speechRecognitionList = new SpeechGrammarList();
  recognition.grammars = speechRecognitionList;
  recognition.continuous = false;
  recognition.lang = 'en-US';
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;

  document.onclick = function() {
    recognition.start();
    console.log('Click event.');
  }


recognition.onresult = function(e) {
      recognition.stop();

    // The SpeechRecognitionEvent results property returns a SpeechRecognitionResultList object
    // The SpeechRecognitionResultList object contains SpeechRecognitionResult objects.
    // It has a getter so it can be accessed like an array
    // The [last] returns the SpeechRecognitionResult at the last position.
    // Each SpeechRecognitionResult object contains SpeechRecognitionAlternative objects that contain individual results.
    // These also have getters so they can be accessed like arrays.
    // The [0] returns the SpeechRecognitionAlternative at position 0.
    // We then return the transcript property of the SpeechRecognitionAlternative object

    var last = event.results.length - 1;
    var lastWord = e.results[last][0].transcript;
    var totalCapture = e.results[0][0].transcript;

    console.log( "Captured string: " + totalCapture );
    console.log('Confidence: ' + e.results[0][0].confidence);

    let result = "No match for positives or negatives."

    // Iterate the library of words listened for and compare against totalCapture for a match
    for( let resultType in matches ){
        if( matchType( resultType, matches[resultType], totalCapture ) ){
        result = resultType;
          }
    }

    displayResult( result, totalCapture )
  };

  recognition.onspeechend = function() {
    // recognition.stop();
    // recognition.start();
    console.log("Detection ended.");
  };
};

const matchType = ( type, wordList, currentCapture ) => {
  for( let i = 0; i < wordList.length; i++ ){
    if( currentCapture.indexOf( wordList[i] ) >= 0 ){
      return type;
    }
  }
};

const displayResult = ( result, string ) => {
  output.textContent = result;
  capture.textContent = string;
  // debugger
  if( result === "positive" ){
    output.style.backgroundColor = "rgba(0,255,0,0.7)";
  } else {
    output.style.backgroundColor = "rgba(255,0,0,0.7)";
  }

  // recognition.start();
};

// recognition.onerror = function(event) {
//   diagnostic.textContent = 'Error occurred in recognition: ' + event.error;
// }