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
