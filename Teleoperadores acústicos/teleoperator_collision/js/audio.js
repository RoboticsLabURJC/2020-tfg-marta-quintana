document.addEventListener('robot-loaded', (evt)=>{
  localRobot = evt.detail;
  console.log(localRobot);
});

//var playerEl = document.querySelector("#a-pibot");
//playerEl.addEventListener('collide', function(e) {
  //    console.log('Player has collided with body '');

//});

// more documentation available at
// https://github.com/tensorflow/tfjs-models/tree/master/speech-commands

// the link to your model provided by Teachable Machine export panel
const URL = "https://teachablemachine.withgoogle.com/models/P3XdF5r5d/";
var connection = false;
async function createModel() {
    const checkpointURL = URL + "model.json"; // model topology
    const metadataURL = URL + "metadata.json"; // model metadata

    const recognizer = speechCommands.create(
        "BROWSER_FFT", // fourier transform type, not useful to change
        undefined, // speech commands vocabulary feature, not useful for your models
        checkpointURL,
        metadataURL);

    // check that model and metadata are loaded via HTTPS requests.
    await recognizer.ensureModelLoaded();

    return recognizer;
}

async function listen() {
    const recognizer = await createModel();
    const classLabels = recognizer.wordLabels(); // get class labels
    //const labelContainer = document.getElementById("label-container");
    const word = document.getElementById("prediction");
  //  for (let i = 0; i < classLabels.length; i++) {
    //    labelContainer.appendChild(document.createElement("div"));
    //}

    // listen() takes two arguments:
    // 1. A callback function that is invoked anytime a word is recognized.
    // 2. A configuration object with adjustable fields
    recognizer.listen(result => {
        const scores = result.scores; // probability of prediction for each class
        var word_index = 0;
        // render the probability scores per class
        for (let i = 0; i < classLabels.length; i++) {
            const classPrediction = classLabels[i] + ": " + result.scores[i].toFixed(2);
            //labelContainer.childNodes[i].innerHTML = classPrediction;
            //The most probable word
            if (result.scores[i].toFixed(2) >= result.scores[word_index].toFixed(2)) {
               word_index = i;

            }
        }
        var prediction = classLabels[word_index];
        word.innerHTML = "The most probable word: " + prediction;
        if (connection){
          if (String(prediction) == "Go") {
            localRobot.setV(0.9);
            //que se mueva el robot
          }else if (String(prediction) == "Stop") {
             localRobot.setV(0);
             localRobot.setW(0);
             localRobot.setL(0);
            //que se pare
          }else if (String(prediction) == "Back"){
             localRobot.setV(-0.9);
          }else if (String(prediction) == "Right"){
              localRobot.setW(-0.005);

          }else if (String(prediction) == "Left"){
              localRobot.setW(0.005);

          }else if (String(prediction) == "Up"){
              localRobot.setL(0.25);

          }else if (String(prediction) == "Down"){
                localRobot.setL(-0.25);
          }
          //For stop going down or going up, turn left or turn right say the word : STOP

        }
        //console.log(prediction);
    }, {
        includeSpectrogram: true, // in case listen should return result.spectrogram
        probabilityThreshold: 0.75,
        invokeCallbackOnNoiseAndUnknown: true,
        overlapFactor: 0.50 // probably want between 0.5 and 0.75. More info in README
    });

    // Stop the recognition in 5 seconds.
    // setTimeout(() => recognizer.stopListening(), 5000);
}


async function Connect_To_Robot() {
    if (connection){connection= false;
      document.getElementById("connection").style.backgroundColor= "red";
      console.log( "Desconectado");
    }else{
        connection = true;
        console.log( "CONECTADO AL ROBOT");
        document.getElementById("connection").style.backgroundColor= "green";
    }
}
