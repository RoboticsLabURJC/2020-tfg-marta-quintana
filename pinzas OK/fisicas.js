function run_fisicas() {

    // Se carga las físicas del mundo
    var world = $('a-scene')[0].systems.physics.driver.world;
    // Se establece la gravedad
    world.gravity.y = -9.8

    // Se definene los tres materiales de contacto (pinzas y objeto a agarrar)
    var firstMaterial = new CANNON.Material("firstMaterial");
    var secondMaterial = new CANNON.Material("secondMaterial");
    var thirdMaterial = new CANNON.Material("thirdMaterial");
    // Se modifica la elasticidad con restitution para que no haya rebotes al colisionar
    firstMaterial.restitution = -1
    // Se pone una masa alta para las pinzas
    firstMaterial.mass = 10000;
    secondMaterial.restitution = -1
    secondMaterial.mass = 10000;
    thirdMaterial.restitution = 1
    thirdMaterial.mass = 0.000001;
    thirdMaterial.friction = 0;
    // Se asignana los materiales a los objetos y a sus mallas de colisión
    document.querySelector("#izquierda").body.material=firstMaterial;
    document.querySelector('#derecha').body.material=secondMaterial;
    document.querySelector('#objeto').body.material=thirdMaterial;
    // Se definen los efectos de los contactos entre los materiales
    var cm1 = new CANNON.ContactMaterial(firstMaterial,secondMaterial,[restitution = 1]);
    var cm2 = new CANNON.ContactMaterial(firstMaterial,thirdMaterial, [restitution = 1]);
    var cm6 = new CANNON.ContactMaterial(secondMaterial,thirdMaterial, [restitution = 1]);
    var cm7 = new CANNON.ContactMaterial(thirdMaterial, secondMaterial, [restitution = 1]);
    var cm3 = new CANNON.ContactMaterial(secondMaterial,firstMaterial,[restitution = 1]);
    var cm4 = new CANNON.ContactMaterial(thirdMaterial, firstMaterial,[restitution = 1]);
    var cm5 = new CANNON.ContactMaterial(firstMaterial,document.querySelector('#floor').body.material,[restitution = 0]);
    var cm10 = new CANNON.ContactMaterial(thirdMaterial,document.querySelector('#floor').body.material,[restitution = -1],[friction = 0]);

    // Se añaden a la escena de aframe
    world.addContactMaterial(cm1);
    world.addContactMaterial(cm2);
    world.addContactMaterial(cm3);
    world.addContactMaterial(cm4);
    world.addContactMaterial(cm5);
    world.addContactMaterial(cm6);
    world.addContactMaterial(cm7);
    world.addContactMaterial(cm10);

};
