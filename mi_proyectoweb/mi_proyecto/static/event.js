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
        const li = document.createElement('li');
        const audio = document.createElement('audio');

        audio.setAttribute('src', blobUrl);
        audio.setAttribute('controls', 'controls');
        li.appendChild(audio);
        list.appendChild(li);
        console.log(list)
      }
