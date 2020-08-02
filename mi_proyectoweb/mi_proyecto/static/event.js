//<p>
//<button id="boton2">&#9655;</button>
//</p>

//-- Traza de prueba
console.log("Hola!")

//-- Obtener audio del DOM
const audio = document.getElementById('audio');

//Control de clicks si comprobar si ya se está reproduciendo o no.
function reproducir() {
  if(!audio.paused && !audio.ended)   {
     audio.pause();
  }else{
       audio.play();
    }

}



//Obtener audio del microfono del ordenador y grabarlo
var list_recorders_srcs=[]
window.addEventListener('DOMContentLoaded', () => {
        const getMic = document.getElementById('mic');
        const recordButton = document.getElementById('record');
        const list = document.getElementById('recordings');
        if ('MediaRecorder' in window) {
          getMic.addEventListener('click', async () => {
            getMic.setAttribute('hidden', 'hidden');
            try {
              const stream = await navigator.mediaDevices.getUserMedia({
                audio: true,
                video: false
              });
              const mimeType = 'audio/webm';
              let chunks = [];
              const recorder = new MediaRecorder(stream, { type: mimeType });
              recorder.addEventListener('dataavailable', event => {
                if (typeof event.data === 'undefined') return;
                if (event.data.size === 0) return;
                chunks.push(event.data);
              });
              recorder.addEventListener('stop', () => {  //Blob representa un objeto tipo fichero de  datos planos inmutables.
                const recording = new Blob(chunks, {

                  type: mimeType
                });
                renderRecording(recording, list);
                chunks = [];
              });
              recordButton.removeAttribute('hidden');
              recordButton.addEventListener('click', () => {
                if (recorder.state === 'inactive') {
                  recorder.start();
                  recordButton.innerText = 'Stop';
                } else {
                  recorder.stop();
                  recordButton.innerText = 'Record';
                }
              });
            } catch {
              renderError(
                'You denied access to the microphone.'
              );
            }
          });
        } else {
          renderError(
            "Sorry, your browser doesn't support mediaDevices.getUserMedia()."
          );
        }
      });

      function renderError(message) {
        const main = document.querySelector('main');
        main.innerHTML = `<div class="error"><p>${message}</p></div>`;
      }

      function renderRecording(blob, list) {

        const blobUrl = URL.createObjectURL(blob);
        list_recorders_srcs.push(blobUrl);
        const li = document.createElement('li');
        const audio = document.createElement('audio');

        audio.setAttribute('src', blobUrl);
        audio.setAttribute('controls', 'controls');
        li.appendChild(audio);
        console.log(blobUrl);  //audio src que se graba ultimo
        //Acceder a los recursos grabados
        //console.log(list_recorders_srcs);
        //console.log(list_recorders_srcs[0]);
        list.appendChild(li);
      }

///ANALIZADOR AUDIO
// variables para el audio
var audioCtx = new (window.AudioContext || window.webkitAudioContext)();
var analyser = audioCtx.createAnalyser();

//  Inicializa el canvas
var canvas = document.querySelector("canvas");
canvasCtx = canvas.getContext("2d");
var cw = canvas.width = 700; // la anchura del canvas
var ch = canvas.height = 350;// la altura del canvas

navigator.mediaDevices
  .getUserMedia({ audio: true, video: false })
  .then(function(stream) {
    var fuenteDeSonido = audioCtx.createMediaStreamSource(stream);
    //nodos que vamos a usar
    fuenteDeSonido.connect(analyser);
    draw();
  }).catch(function(err) {
  txt("E R R O R")
});



analyser.fftSize = 128;
var bufferLength = analyser.frequencyBinCount;
console.log(bufferLength);
var dataArray = new Uint8Array(bufferLength);

canvasCtx.clearRect(0, 0, cw , ch);

function draw() {
   window.requestAnimationFrame(draw);

  analyser.getByteFrequencyData(dataArray);

  //canvasCtx.fillStyle = 'rgb(40, 40, 40)';
  canvasCtx.fillStyle = "rgb(245,245,245)";
  canvasCtx.fillRect(0, 0, cw, ch);

  var barWidth = (cw / bufferLength) //* 2.5;
  var barHeight;
  var x = 0;

  for(var i = 0; i < bufferLength; i++) {
    barHeight = dataArray[i];
    //console.log(barHeight)
    canvasCtx.fillStyle = 'rgb(100,0,' + (barHeight+100) + ')';
    canvasCtx.fillRect(x,ch-barHeight/2,barWidth,barHeight/2);

    x += barWidth + 1;
  }
};

draw();
