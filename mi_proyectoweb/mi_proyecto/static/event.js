//Boton play html<p>
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
var analizador = audioCtx.createAnalyser();
analizador.fftSize = 2048; // [32, 64, 128, 256, 512, 1024, 2048]
var dataArray = new Uint8Array(analizador.frequencyBinCount);
//  Inicializa el canvas
var canvas = document.querySelector("canvas");
ctx = canvas.getContext("2d");
var cw = canvas.width = 700; // la anchura del canvas
var ch = canvas.height = 350;// la altura del canvas
ctx.fillStyle = "hsla(210,95%,45%,.75)"; //color del analizador

// crea el array de los puntos
var puntos = [];
var pNum = 25;// número de puntos
var puntoW = cw / pNum;// calcula la distribución de los puntos

  for (var i = 0; i < pNum + 1; i++) {
    var punto = {};
    punto.x = i * puntoW;
    punto.y = ch;
    puntos.push(punto);
  }


navigator.mediaDevices
  .getUserMedia({ audio: true, video: false })
  .then(function(stream) {
    var fuenteDeSonido = audioCtx.createMediaStreamSource(stream);
    fuenteDeSonido.connect(analizador);
    Animacion();
  }).catch(function(err) {
  txt("E R R O R")
});

function Animacion() {
  requestId = window.requestAnimationFrame(Animacion);
  /*el método getByteFrequencyData() toma como argumento un array de tipo Uint8Array*/
  analizador.getByteFrequencyData(dataArray);
  ctx.clearRect(0, 0, cw, ch);
  // la doble tilde (~~) es un operador equivalente a Math.floor() o casi
  var n = ~~(analizador.frequencyBinCount / pNum);
  // un bucle for calcula la coordenada en y de cada punto del array de puntos.
  for (var i = 0; i < puntos.length; i++) {
    puntos[i].y = ch - dataArray[i * n] - 50;
  }
  trazarCurvas(puntos);
  ctx.fillText("Tiempo", cw*.5, ch*.5);
}

//Animacion();

function trazarCurvas(puntos) {
  ctx.beginPath();
  ctx.moveTo(puntos[0].x, puntos[0].y);

  for (var i = 1; i < puntos.length - 2; i++) {
     var x = (puntos[i].x + puntos[i + 1].x) / 2;
     var y = (puntos[i].y + puntos[i + 1].y) / 2;
    ctx.quadraticCurveTo(puntos[i].x, puntos[i].y, x, y);
  }
  ctx.quadraticCurveTo(
    puntos[i].x,
    puntos[i].y,
    puntos[i + 1].x,
    puntos[i + 1].y
  );
  ctx.lineTo(cw, ch);
  ctx.lineTo(0, ch);
  ctx.closePath();
  ctx.fill();
}
