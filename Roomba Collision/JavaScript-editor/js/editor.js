var editorRobot = '';
var robIDs = [];
var defaultCode = `
while(true){
    await myRobot.advanceTo(3);
    await myRobot.turnUpTo(90);
}
`;
var robotCode = {};
var code = "";

$(document).ready(async () => {
    AceEditor.editor.setup();
    AceEditor.editor.ui.session.setMode("ace/mode/javascript");

    /*$("#cambtn").click(() => {
        editor.toggleCamera();
    });*/

    $("#spectatorCamera").click(() => {
        changeSpectatorCamera();
    });

    $("#runbtn").click(() => {
        /**
         * Function to execute when run button clicked, multiple options
         * supported:
         * - Take the id of the selected robot
         * - Creates thread for a robot if not exists and runs
         * - Stop thread for a robot if exists and running
         * - Resume thread for a robot if exists and not running
         */

        var iconRunBtn = document.querySelector("#runbtn").firstChild;
        if ($(iconRunBtn)[0].getAttribute("src") === "icons/play-icon.png") {
            $(iconRunBtn).attr("src", "icons/stop-icon.png");
        } else {
            $(iconRunBtn).attr("src", "icons/play-icon.png");
        }
        var codejs = AceEditor.editor.getCode();
        robotCode[editorRobot] = codejs

        if (WebSim.brains.threadExists(robIDs[0])) {
            if (WebSim.brains.isThreadRunning(robIDs[0])) {
                Websim.simulation.pauseSimulation();
                for(var editor in robotCode) {
                    WebSim.brains.stopWorker(editor);
                    //WebSim.brains.pauseBrain(editorRobot1);
                }
            } else {
                //WebSim.brains.resumeBrain(editorRobot1, code);
                for(var editor in robotCode) {
                    WebSim.brains.resumeWorker(editor, robotCode[editor]);
                }
                Websim.simulation.playSimulation();
            }
        } else {
            //WebSim.brains.runBrain(editorRobot1, code);
            for(var editor in robotCode) {
                WebSim.brains.runWorkerBrain(editor, robotCode[editor]);
            }
            Websim.simulation.playSimulation();
        }
    });

    $('#resetRobot').click(() => {
        Websim.simulation.resetSimulation();
        robIDs.forEach(robID => WebSim.brains.resetWorker(robID));
        let iconRunBtn = document.querySelector("#runbtn").firstChild;
        $(iconRunBtn).attr("src", "icons/play-icon.png");
    });

    /**
     * Event to read the user configuration file
     */
    document.getElementById('file-input')
        .addEventListener('change', leerArchivo, false);
    /**
     * Change Robot:
     * - Stop thread for a previus robot if exists and running
     * - Change editorRboot
     */
    document.getElementById('miDiv').addEventListener('change',function (){
        code = AceEditor.editor.getCode();
        robotCode[editorRobot]  = code
        var pos = document.getElementById('myRobot').options.selectedIndex;
        editorRobot = document.getElementById('myRobot').options[pos].text;
        if(robotCode[editorRobot]){
            AceEditor.editor.insertCode(robotCode[editorRobot])
        }else{
            AceEditor.editor.insertCode(defaultCode)
        }
        var iconRunBtn = document.querySelector("#runbtn").firstChild;
        $(iconRunBtn).attr("src", "icons/play-icon.png");
        if (WebSim.brains.isThreadRunning(robIDs[0])) {
            Websim.simulation.pauseSimulation();
            for (var editor in robotCode) {
                WebSim.brains.stopWorker(editor);
            }
        }
    });
});

/**
 * - Get the robots ids
 * - Create the dropdown with robots ids
 * - Start the simulation
 */
async function creatRobots(contenido){
    var listener = function(e){
        e.options[e.selectedIndex].value;
    }
    let robot = await parseRobotIds(contenido)
    var opciones =[]
    for(let i=0; i < robot.length; i++){
        opciones.push({titulo: robot[i], value: robot[i]})
        robotCode[robot[i]] = defaultCode;
        robIDs.push(robot[i]);
    }
    if ( document.getElementById( "myRobot" )) {
        document.getElementById("myRobot").remove();
    }
    editorRobot = opciones[0]['value']
    var desp = new miDesplegable({
        target : '#miDiv',
        opciones : opciones,
        listener : listener
    });
    await Websim.config.init(contenido);
    $("#buttons").show();
    if (typeof config_evaluator !== "undefined") {
        evaluators.runEvaluator([editorRobot], config_evaluator);
    }
}

/**
 * Read the configuration file loaded by the user
 * And create the menu with the available robots
 */
function leerArchivo(e) {
    const archivo = e.target.files[0];
    if (!archivo) {
        return;
    }
    const lector = new FileReader();
    lector.onload = function(e) {
        let contenido = e.target.result;
        document.getElementById("loadFile").style.display = 'none'
        creatRobots(contenido);
    };
    lector.readAsText(archivo);

}

/**
 * Parse the robots ids from the configuration file:
 *  - First load the configuration file
 *  - Parse the ids and return them as a list of String
 */
async function parseRobotIds(contenido){
    var robotIds = []
    var data = await loadJson(contenido)
    robotIds = await parse(data)
    return robotIds
}
async function loadJson(contenido){
    return JSON.parse(contenido)
}
async function parse(data)
{
    var ids = []
    for (var pos in data["robots_config"]){
        ids.push(data["robots_config"][pos]["id"])
    }
    return ids
}

/**
 * Create a drop-down menu with the list of robot ids
 */
class miDesplegable {
    constructor({
                    target = 'body',
                    opciones = [],
                    listener = new Function(),
                    nombre = ''} = {}) {
        this.target = $(target);
        this.form = $('<form/>');
        this.element = $('<select/>');
        this.element.attr('id', 'myRobot');
        //this.opcion_no_seleccionable = $('<option disabled selected>Robots</option>');
        this.element.append(this.opcion_no_seleccionable);
        this.form.append(this.element);
        opciones.map(e=>{
            var opcion = $(`<option value="${e.value}">${e.titulo}</option>`);
            this.element.append(opcion);
            console.log(opcion)
        });
        this.listener = typeof listener === 'function' ? listener : new Function();
        this.element.on('change', this.listener.bind(null, this.element.get(0)));
        this.target.append(this.form);

    }
}
