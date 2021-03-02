function run_fisicas() {

    // Se carga las físicas del mundo
    var world = $('a-scene')[0].systems.physics.driver.world;
    // Se establece la gravedad
    world.gravity.y = -9.8
    }
document.addEventListener('robot-loaded', (evt)=>{
  localRobot = evt.detail;
  console.log(localRobot);

  var sceneEl = document.querySelector('a-scene');

$(document).ready(function(){
//console.log(document.querySelector("#izq").body);
run_fisicas();
var choque_izq = false;
var choque_der = false;
var choque_pinzas = false;
var pinza_izquierda = document.querySelector('#izquierda');
var pinza_derecha = document.querySelector('#derecha');
var objeto = document.querySelector('#objeto');
var mbot = document.querySelector('#a-pibot');
var base = ""
var superior = ""
var interval = null;
var moveInterval = null;
var max = 1;
var nogiro =true;
var p0 = Math.hypot(pinza_izquierda.body.position.x-(pinza_izquierda.body.position.x+pinza_derecha.body.position.x)/2,
                          pinza_izquierda.body.position.z-(pinza_izquierda.body.position.z+pinza_derecha.body.position.z)/2)

  pinza_izquierda.body.position.x = 1.75*Math.cos(mbot.getAttribute('rotation').y*(Math.PI/180))
                                            - p0*Math.sin(mbot.getAttribute('rotation').y*(Math.PI/180)) + mbot.body.position.x
        pinza_izquierda.body.position.z = -1.75*Math.sin(mbot.getAttribute('rotation').y*(Math.PI/180))-
                                              p0*Math.cos(mbot.getAttribute('rotation').y*(Math.PI/180)) + mbot.body.position.z
        pinza_derecha.body.position.x = 1.75*Math.cos(mbot.getAttribute('rotation').y*(Math.PI/180))
                                            + p0*Math.sin(mbot.getAttribute('rotation').y*(Math.PI/180))+ mbot.body.position.x
        pinza_derecha.body.position.z = -1.75*Math.sin(mbot.getAttribute('rotation').y*(Math.PI/180))+
                                            p0*Math.cos(mbot.getAttribute('rotation').y*(Math.PI/180))+ mbot.body.position.z

// Se definene los eventos de teclado
document.addEventListener('keydown', (event)=>{
  // Tecla para cerrar la pinza (C), se verifica si hay colisión con el objeto a atrapar
  if (event.keyCode == 67 && (choque_der == false || choque_izq == false) && choque_pinzas == false){
    // Se revisa si hay un evento lanzado, si lo hay se resetea
    if (interval != null){
      clearInterval(interval);
    }
	
    // Se lanza set interval para mover cada ms la pinza
      interval = setInterval(function(){

        close(pinza_izquierda,pinza_derecha,mbot,nogiro)
        // Si hay colisión se para el movimiento
        if (choque_izq && choque_der){
          clearInterval(interval);
          interval = null;
        // Si hay colisión entre ambas pinzas, se para el cierre
        } else if (choque_pinzas) {
          clearInterval(interval);
          interval == null;
        }
      },1);
    // Tecla para movimiento hacia adelante (tecla 8 del teclado númerico)
  } else if(event.keyCode == 56){
    // Se revisa si hay un movimiento del mbot lanzado, si lo hay se resetea
    if (moveInterval != null){
      clearInterval(moveInterval);
    }
    // Se lanza set interval para mover cada ms el mbot hacia delante
      moveInterval = setInterval(function(){
        front(pinza_izquierda, pinza_derecha, mbot);
        // si está activa la colisión (hay agarre), se reubica el objeto agarrado
        if (choque_izq && choque_der){
          update_agarre(pinza_izquierda,pinza_derecha,mbot,objeto,1)
        }
      },1);
  // Tecla para movimiento hacia atras (tecla 2 del teclado númerico)
  } else if (event.keyCode == 50){
    if (moveInterval != null){
      clearInterval(moveInterval);
    }
      moveInterval = setInterval(function(){
        back(pinza_izquierda, pinza_derecha, mbot);
        if (choque_izq && choque_der){
          update_agarre(pinza_izquierda,pinza_derecha,mbot,objeto,0)
        }
      },1);
  // Tecla para apertura de la pinza (tecla v)
  } else if (event.keyCode == 86) {
    if (interval!= null){
      clearInterval(interval);
    }
     interval = setInterval(function(){
        // Se abre la pinza y se pasan a false los detectores de colisión
        open(pinza_izquierda,pinza_derecha,mbot,max,nogiro)
        choque_izq = false;
        choque_der = false;
        choque_pinzas = false;
      },1);
  // Tecla para parar cualquier movimiento (tecla X)
} else if (event.keyCode == 88){

    clearInterval(moveInterval);
    clearInterval(interval);
    nogiro =true;
    mbot.body.angularVelocity.y = 0;
    interval = null;
    moveInterval = null;
   
  
    // Tecla para girar el mbot a la derecha (6 del teclado númerico)
  } else if (event.keyCode==54){
   if (moveInterval != null){
      clearInterval(moveInterval);
    }
	nogiro =false;
      moveInterval = setInterval(function(){
        // se obtine la posición del mbot
        p0 = Math.hypot(pinza_izquierda.body.position.x-(pinza_izquierda.body.position.x+pinza_derecha.body.position.x)/2,
                          pinza_izquierda.body.position.z-(pinza_izquierda.body.position.z+pinza_derecha.body.position.z)/2)

        // se rota el mbot
        mbot.body.angularVelocity.y = -1;
        // se rotan las pinzas
        pinza_derecha.body.angularVelocity.y=pinza_izquierda.body.angularVelocity.y = -1;
        // Se recalculan las posiciones de las pinzas mediante las formulas del M.R.C
        pinza_izquierda.body.position.x = 1.75*Math.cos(mbot.getAttribute('rotation').y*(Math.PI/180))
                                            - p0*Math.sin(mbot.getAttribute('rotation').y*(Math.PI/180)) + mbot.body.position.x
        pinza_izquierda.body.position.z = -1.75*Math.sin(mbot.getAttribute('rotation').y*(Math.PI/180))-
                                              p0*Math.cos(mbot.getAttribute('rotation').y*(Math.PI/180)) + mbot.body.position.z
        pinza_derecha.body.position.x = 1.75*Math.cos(mbot.getAttribute('rotation').y*(Math.PI/180))
                                            + p0*Math.sin(mbot.getAttribute('rotation').y*(Math.PI/180))+ mbot.body.position.x
        pinza_derecha.body.position.z = -1.75*Math.sin(mbot.getAttribute('rotation').y*(Math.PI/180))+
                                            p0*Math.cos(mbot.getAttribute('rotation').y*(Math.PI/180))+ mbot.body.position.z

        if (choque_izq && choque_der){
          update_agarre(pinza_izquierda,pinza_derecha,mbot,objeto,2)
        }
      },1);
  // Tecla para girar el mbot a la izquierda (4 del teclado númerico)
  } else if (event.keyCode==52){
     if (moveInterval != null){
      clearInterval(moveInterval);
    }
	nogiro =false;
      moveInterval = setInterval(function(){
	 // se obtine la posición del mbot
        p0 = Math.hypot(pinza_izquierda.body.position.x-(pinza_izquierda.body.position.x+pinza_derecha.body.position.x)/2,
                          pinza_izquierda.body.position.z-(pinza_izquierda.body.position.z+pinza_derecha.body.position.z)/2)


        // se rota el mbot
        mbot.body.angularVelocity.y = 1;
        // se rotan las pinzas
        pinza_derecha.body.angularVelocity.y=pinza_izquierda.body.angularVelocity.y = 1;
        // Se recalculan las posiciones de las pinzas mediante las formulas del M.R.C
        pinza_izquierda.body.position.x = 1.75*Math.cos(mbot.getAttribute('rotation').y*(Math.PI/180))
                                            - p0*Math.sin(mbot.getAttribute('rotation').y*(Math.PI/180)) + mbot.body.position.x
        pinza_izquierda.body.position.z = -1.75*Math.sin(mbot.getAttribute('rotation').y*(Math.PI/180))-
                                              p0*Math.cos(mbot.getAttribute('rotation').y*(Math.PI/180)) + mbot.body.position.z
        pinza_derecha.body.position.x = 1.75*Math.cos(mbot.getAttribute('rotation').y*(Math.PI/180))
                                            + p0*Math.sin(mbot.getAttribute('rotation').y*(Math.PI/180))+ mbot.body.position.x
        pinza_derecha.body.position.z = -1.75*Math.sin(mbot.getAttribute('rotation').y*(Math.PI/180))+
                                            p0*Math.cos(mbot.getAttribute('rotation').y*(Math.PI/180))+ mbot.body.position.z


        if (choque_izq && choque_der){
          update_agarre(pinza_izquierda,pinza_derecha,mbot,objeto,3)
        }
      },1);
  }


});

// Se deffine el escuchador del evento colisión para la pinza izquierda
pinza_izquierda.addEventListener("collide",
  function(e){
    // Se veriffica que la colisión es con el objeto a agarrar.
    if (e.detail.body.el.id == "objeto"){

      // Si el valor del contacto es 0 en el eje z, pasamos a true el detector de colisión
      if(Math.round(e.detail.contact.ni.z) == 0 || Math.round(e.detail.contact.ni.z) == -0){;
        choque_izq = true;

      // Si el valor del contacto es 0 en el eje x, pasamos a true el detector de colisión
      } else if (Math.round(e.detail.contact.ni.x) == 0 || Math.round(e.detail.contact.ni.x) == -0){
        choque_izq = true;

      // Si el valor del contacto es > 0 en el eje z y x ó
      // el valor del contacto es < 0 en el eje z y x
      // pasamos a true el detector de colisión, porque indica que estamos agarrando desde otro angulo
      } else if ((Math.round(e.detail.contact.ni.x) > 0 && Math.round(e.detail.contact.ni.z) > 0) ||
                  (Math.round(e.detail.contact.ni.x) < -0 && Math.round(e.detail.contact.ni.z) < -0)){
                    choque_izq = true;

      }
    // Si la colisión es con la otra pinza, pase lo que pase tenemos contacto para parar el cirre
    } else if (e.detail.body.el.id == "derecha"){
      choque_pinzas = true;
    }
  });



// Funcionamiento igual que para la pinza izquierda
pinza_derecha.addEventListener("collide",
    function(e){
      if (e.detail.body.el.id == "objeto"){

        if(Math.round(e.detail.contact.ni.z) == 0 || Math.round(e.detail.contact.ni.z) == -0){;
          choque_der = true;

        } else if (Math.round(e.detail.contact.ni.x) == 0 || Math.round(e.detail.contact.ni.x) == -0){
          choque_der = true;

        } else if ((Math.round(e.detail.contact.ni.x) > 0 && Math.round(e.detail.contact.ni.z) > 0) ||
                    (Math.round(e.detail.contact.ni.x) < -0 && Math.round(e.detail.contact.ni.z) < -0)){
                      choque_der = true;

        }

      } else if (e.detail.body.el.id == "izquierda"){
        choque_pinzas = true;
      }
    });

});


// Funcionaes para mover el mbot y las pinzas
function close (pi,pd,mbot,nogiro){
 var d = Math.sqrt(Math.pow(Math.abs(pi.body.position.z-pd.body.position.z), 2)+Math.pow(Math.abs(pi.body.position.x-pd.body.position.x), 2));
  if(nogiro && d >= 0.5){
  let z = 0.0005 * Math.cos(mbot.getAttribute('rotation').y * Math.PI / 180);
  let x = 0.0005 * Math.sin(-mbot.getAttribute('rotation').y * Math.PI / 180);
  pi.body.position.x -= x*10;
  pi.body.position.z += z*10;
  pd.body.position.x += x*10;
  pd.body.position.z -= z*10;
 }
}

function stop (pi,pd,mbot){
  //base.body.velocity.set(0, 0, 0);
  //superior.body.velocity.set(0, 0, 0);
  pi.body.velocity.set(0, 0, 0);
  pd.body.velocity.set(0, 0, 0);
  mbot.body.angularVelocity.y = 0;
  pi.body.angularVelocity.y=pd.body.angularVelocity.y = 0;

}

function open(pi,pd,mbot,max,nogiro){
  var d = Math.sqrt(Math.pow(Math.abs(pi.body.position.z-pd.body.position.z), 2)+Math.pow(Math.abs(pi.body.position.x-pd.body.position.x), 2));
console.log(d)
  if ( nogiro && d <=1.55 ){
    let z = 0.0005 * Math.cos(mbot.getAttribute('rotation').y * Math.PI / 180);
    let x = 0.0005 * Math.sin(-mbot.getAttribute('rotation').y * Math.PI / 180);
    pi.body.position.x += x*10;
    pi.body.position.z -= z*10;
    pd.body.position.x -= x*10;
    pd.body.position.z += z*10;
  }
}

function back(pi,pd,mbot){
  //base.body.position.z += 0.0005;
  //superior.body.position.z += 0.0005;
  let x = 0.0005 * Math.cos(mbot.getAttribute('rotation').y * Math.PI / 180);
  let z = 0.0005 * Math.sin(-mbot.getAttribute('rotation').y * Math.PI / 180);

  mbot.body.position.x += x*50;
  mbot.body.position.z += z*50;
  pi.body.position.x += x*50;
  pi.body.position.z += z*50;
  pd.body.position.x += x*50;
  pd.body.position.z += z*50;
}

function front(pi,pd,mbot){
  let x = 0.0005 * Math.cos(mbot.getAttribute('rotation').y * Math.PI / 180);
  let z = 0.0005 * Math.sin(-mbot.getAttribute('rotation').y * Math.PI / 180);
  mbot.body.position.x -= x*50;
  mbot.body.position.z -= z*50;
  pi.body.position.x -= x*50;
  pi.body.position.z -= z*50;
  pd.body.position.x -= x*50;
  pd.body.position.z -= z*50;
}

//Función para mover el objeto agarrado y no haya rebotes no deseados
function update_agarre(pi,pd,mbot,obj,move){
  p0 = Math.hypot(obj.body.position.x-mbot.body.position.x,obj.body.position.z-mbot.body.position.z)
  if (move == 0){
    let x = 0.0005 * Math.cos(mbot.getAttribute('rotation').y * Math.PI / 180);
    let z = 0.0005 * Math.sin(-mbot.getAttribute('rotation').y * Math.PI / 180);
    obj.body.position.x+= x*50;
    obj.body.position.z+= z*50;
  } else if(move == 1){
    let x = 0.0005 * Math.cos(mbot.getAttribute('rotation').y * Math.PI / 180);
    let z = 0.0005 * Math.sin(-mbot.getAttribute('rotation').y * Math.PI / 180);
    obj.body.position.x-= x*50;
    obj.body.position.z-= z*50;
  } else if(move==2){
    obj.body.angularVelocity.y = -1;
    obj.body.position.x = p0*Math.cos(mbot.getAttribute('rotation').y*(Math.PI/180))+ mbot.body.position.x
    obj.body.position.z = -p0*Math.sin(mbot.getAttribute('rotation').y*(Math.PI/180))+ mbot.body.position.z
  } else if(move==3){
    obj.body.angularVelocity.y = 1;
    obj.body.position.x = p0*Math.cos(mbot.getAttribute('rotation').y*(Math.PI/180))+ mbot.body.position.x
    obj.body.position.z = -p0*Math.sin(mbot.getAttribute('rotation').y*(Math.PI/180))+ mbot.body.position.z
  }
}
})

