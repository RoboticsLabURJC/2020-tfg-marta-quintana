var localRobot = null;

$(document).ready(()=>{

    $("#cambtn").click(()=>{
      toggleCameraDisplay();
    });


    document.addEventListener('robot-loaded', (evt)=>{
      localRobot = evt.detail;
      console.log(localRobot);

    let recognizer;

    function predictWord() {
     // Array of words that the recognizer is trained to recognize.
     const words = recognizer.wordLabels();
     recognizer.listen(({scores}) => {
       // Turn scores into a list of (score,word) pairs.
       scores = Array.from(scores).map((s, i) => ({score: s, word: words[i]}));
       console.log(scores);
       // Find the most probable word.
       scores.sort((s1, s2) => s2.score - s1.score);
       document.querySelector('#console').textContent = scores[0].word;
      //Te dice la palabra que es probable que sea
        console.log(scores[0].word);

        //Posicion de go:   words.indexOf(2)
        //'go'= words[words.indexOf('go')
        // 'stop'= words[words.indexOf('stop')
        // MI BACK ES SEVEN' seven '= words[words.indexOf('seven')

    //Aquí hay que poner que se mueva el robot
        if (scores[0].word == words[words.indexOf('go')]){
          var texto = 'ADELANTE!!';
          var h1 = document.getElementById("palabra");
          h1.innerHTML = texto;
          console.log(texto);
          localRobot.setV(0.9);


        }else if (scores[0].word == words[words.indexOf('stop')]){
          var texto = 'PARAAAA!!';
          var h1 = document.getElementById("palabra");
          h1.innerHTML = texto;
          console.log(texto);
          localRobot.setV(0);


        }else if (scores[0].word == words[words.indexOf('seven')]){
          var texto = 'Atrás!!';
          var h1 = document.getElementById("palabra");
          h1.innerHTML = texto;
          console.log(texto);
          localRobot.setV(-0.9);


        }else{
          var h1 = document.getElementById("palabra");
          h1.innerHTML = '';

        }
     }, {probabilityThreshold: 0.75});
    }

    async function app() {
     recognizer = speechCommands.create('BROWSER_FFT');
     await recognizer.ensureModelLoaded();
     predictWord();
    }

    app();
  });

function toggleCameraDisplay(){
  var opencvCam = document.querySelector("#outputCanvas");
  var imageCamBtn = document.querySelector("#cambtn").firstChild;
  $("#outputCanvas, #spectatorDiv").toggle();
  if(opencvCam.style.display != "none"){
    imageCamBtn.src = "assets/resources/stop-camera-icon.png"
  }else{
    imageCamBtn.src = "assets/resources/play-camera-icon.png"
  }
}
 Websim.config.init(config_file);

});
