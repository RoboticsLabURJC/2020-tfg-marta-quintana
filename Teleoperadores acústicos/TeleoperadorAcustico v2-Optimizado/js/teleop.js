var localRobot = null;

$(document).ready(()=>{

    $("#cambtn").click(()=>{
      toggleCameraDisplay();
    });

    // $("#spectatorCamera").click(()=>{
    //   var subjCamera = document.querySelector("#subjCamera");
    //   var spectatorCamera = document.querySelector("#primaryCamera");
    //   var firstPersonCamera = document.querySelector("#firstPersonCamera");
    //   var camera1 = subjCamera.getAttribute('camera','active');
    //   var camera2 = spectatorCamera.getAttribute('camera','active');
    //   var camera3 = firstPersonCamera.getAttribute('camera','active');
    //   if(camera1.active===true){
    //     spectatorCamera.setAttribute('camera', 'active', true);
    //   }else if(camera2.active===true){
    //     firstPersonCamera.setAttribute('camera', 'active', true);
    //   }else if(camera3.active==true){
    //     subjCamera.setAttribute('camera', 'active', true);
    //   }
    // });

    document.addEventListener('robot-loaded', (evt)=>{
      localRobot = evt.detail;
      console.log(localRobot);

  
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
