function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;

}

document.addEventListener('robot-loaded', (evt)=>{
  localRobot = evt.detail;
  console.log(localRobot);

  var sceneEl = document.querySelector('a-scene');

 // CREATE CONFETI
  var n = 0;
  var n_confetis = 99;
  score = 0;
  //array=[];
  var array = JSON.parse(data);

  for ( n = 0; n <=n_confetis ; n++) {
    var c = document.createElement('a-cylinder');
    var num_conf="confeti"+ String(n)
    console.log(num_conf)
    c.setAttribute('id', num_conf);
    //c.setAttribute('position', {x:(Math.floor(Math.random() * 98) - 49), y:0,z:(Math.floor(Math.random() * 98) - 49)});
    //pos = {x:(Math.floor(Math.random() * 88) - 39), y:0,z:(Math.floor(Math.random() * 88) - 39)}
    pos = {x:array[n].x, y:0,z:array[n].z}

    c.setAttribute('position',pos);
    //c.setAttribute('position', {x:0, y:0,z:(20+(n*2))});
    var color = getRandomColor();
    c.setAttribute('color', color);
    c.setAttribute('height', "0.25");
    c.setAttribute('radius', 1);
    sceneEl.appendChild(c);
    //array.push(pos);
}



console.log(array)
//const json_array = JSON.stringify(array);
//console.log(json_array);
//const array_confetipos = JSON.parse(json_array);
//console.log(array_confetipos);


roomba=sceneEl.querySelector('#a-pibot')


     setInterval(function(){
       //console.log("Roomba",roomba.getAttribute('position').z);
      // console.log("Confeti",confeti.getAttribute('position'));
       //console.log("Confeti",confeti.getAttribute('position').z)
       for ( n = 0; n <=n_confetis ; n++) {
        d = Math.sqrt(Math.pow((array[n].z-roomba.getAttribute('position').z), 2)+Math.pow((array[n].x-roomba.getAttribute('position').x), 2));

       //distancez= Math.abs(Math.round(roomba.getAttribute('position').z) - )
       //distancex= Math.abs(Math.round(roomba.getAttribute('position').x) - array[n].x)
       //console.log(roomba.getAttribute('position').x, roomba.getAttribute('position').z);
       if ( d <= 3 ){
         num_conf="#confeti"+ String(n)
         confeti=sceneEl.querySelector(num_conf)
         if (confeti.getAttribute('visible') == true) {
              score+=1;
         }
         confeti.setAttribute('visible', false);

         console.log(score)
        }
      }

    }, 500);

  //console.log('Robot has collided!',e.target);
  //console.log(e.target.id)
  //if (e.target.id == 'confeti'){
    //var sceneEl = document.querySelector('a-scene');
    //conf=sceneEl.querySelector('#confeti')

    //console.log(conf.getAttribute('position'));
    //conf.setAttribute('visible', false);
    //conf.setAttribute('position', { "x":0, "y":0, "z":20});
   //console.log(conf)
 });


