/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./JavaScript-editor/js/editor.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./JavaScript-editor/js/editor-methods.js":
/*!************************************************!*\
  !*** ./JavaScript-editor/js/editor-methods.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("var editor = {};\n\n// Used to store current UI context for later use\neditor.ui = {};\n\neditor.setup = () => {\n  editor.ui = ace.edit(\"ace\");\n  editor.ui.setTheme(\"ace/theme/monokai\");\n  editor.ui.session.setMode(\"ace/mode/javascript\");\n};\n\neditor.toggleCamera = () => {\n  var opencvCam = document.querySelector(\"#outputCanvas\");\n  var imageCamBtn = document.querySelector(\"#cambtn\").firstChild;\n  $(\"#outputCanvas, #spectatorDiv\").toggle();\n  if (opencvCam.style.display !== \"none\") {\n    imageCamBtn.src = \"../../assets/resources/stop-camera-icon.png\";\n  } else {\n    imageCamBtn.src = \"../../assets/resources/play-camera-icon.png\";\n  }\n};\n\neditor.insertCode = textToInject => {\n  // Reloads the code inside the editor erasing all content\n  editor.ui.setValue(textToInject);\n};\n\neditor.sendEvent = (eventName, eventDetail = '') => {\n  var ev = new CustomEvent(eventName, {\n    'detail': eventDetail\n  });\n  document.dispatchEvent(ev);\n};\n\neditor.getCode = () => {\n  /**\n   * Function that extracts code of the current context\n   * of the editor\n   */\n  return editor.ui.getValue();\n};\n\nfunction sleep2(ms) {\n  return new Promise(resolve => setTimeout(resolve, ms));\n}\n\nmodule.exports = editor;\n\n//# sourceURL=webpack:///./JavaScript-editor/js/editor-methods.js?");

/***/ }),

/***/ "./JavaScript-editor/js/editor.js":
/*!****************************************!*\
  !*** ./JavaScript-editor/js/editor.js ***!
  \****************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _editor_methods_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./editor-methods.js */ \"./JavaScript-editor/js/editor-methods.js\");\n/* harmony import */ var _editor_methods_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_editor_methods_js__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _brains_brains_methods_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../brains/brains-methods.js */ \"./brains/brains-methods.js\");\n/* harmony import */ var _brains_brains_methods_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_brains_brains_methods_js__WEBPACK_IMPORTED_MODULE_1__);\n\n\n\nvar editorRobot1 = 'a-pibot';\nvar editorRobot2 = 'a-car2';\n\n$(document).ready(async () => {\n    _editor_methods_js__WEBPACK_IMPORTED_MODULE_0___default.a.setup();\n\n    $(\"#cambtn\").click(() => {\n        _editor_methods_js__WEBPACK_IMPORTED_MODULE_0___default.a.toggleCamera();\n    });\n\n    $(\"#spectatorCamera\").click(() => {\n        changeSpectatorCamera();\n    });\n\n    $(\"#runbtn\").click(() => {\n        /**\n         * Function to execute when run button clicked, multiple options\n         * supported:\n         * - Creates thread for a robot if not exists and runs\n         * - Stop thread for a robot if exists and running\n         * - Resume thread for a robot if exists and not running\n         */\n        var iconRunBtn = document.querySelector(\"#runbtn\").firstChild;\n        if ($(iconRunBtn)[0].getAttribute(\"src\") === \"../assets/resources/play-icon.png\") {\n            $(iconRunBtn).attr(\"src\", \"../assets/resources/stop-icon.png\");\n        } else {\n            $(iconRunBtn).attr(\"src\", \"../assets/resources/play-icon.png\");\n        }\n        var code = _editor_methods_js__WEBPACK_IMPORTED_MODULE_0___default.a.getCode();\n        if (_brains_brains_methods_js__WEBPACK_IMPORTED_MODULE_1___default.a.threadExists(editorRobot1)) {\n            if (_brains_brains_methods_js__WEBPACK_IMPORTED_MODULE_1___default.a.isThreadRunning(editorRobot1)) {\n                Websim.simulation.pauseSimulation();\n                _brains_brains_methods_js__WEBPACK_IMPORTED_MODULE_1___default.a.stopWorker(editorRobot1);\n                //brains.pauseBrain(editorRobot1);\n            } else {\n                //brains.resumeBrain(editorRobot1, code);\n                _brains_brains_methods_js__WEBPACK_IMPORTED_MODULE_1___default.a.resumeWorker(editorRobot1, code);\n                Websim.simulation.playSimulation();\n            }\n        } else {\n            //brains.runBrain(editorRobot1, code);\n            _brains_brains_methods_js__WEBPACK_IMPORTED_MODULE_1___default.a.arrayBrainsStatus.push({ id: editorRobot1, status: \"RUNNING\", blocking_instruction: false });\n            _brains_brains_methods_js__WEBPACK_IMPORTED_MODULE_1___default.a.runWorkerBrain(editorRobot1, code);\n        }\n    });\n\n    $('#resetRobot').click(() => {\n        Websim.simulation.resetSimulation();\n        var code = _editor_methods_js__WEBPACK_IMPORTED_MODULE_0___default.a.getCode();\n        _brains_brains_methods_js__WEBPACK_IMPORTED_MODULE_1___default.a.resetWorker(editorRobot1, code);\n        let iconRunBtn = document.querySelector(\"#runbtn\").firstChild;\n        $(iconRunBtn).attr(\"src\", \"../assets/resources/play-icon.png\");\n    });\n\n    // Init Websim simulator with config contained in the file passed\n    await Websim.config.init(config_file);\n    $(\"#buttons\").show();\n    if (typeof config_evaluator !== \"undefined\") {\n        evaluators.runEvaluator([editorRobot1], config_evaluator);\n    }\n});\n\n//# sourceURL=webpack:///./JavaScript-editor/js/editor.js?");

/***/ }),

/***/ "./brains/brains-methods.js":
/*!**********************************!*\
  !*** ./brains/brains-methods.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const utils = __webpack_require__(/*! ../simcore/utils/index.js */ \"./simcore/utils/index.js\");\nconst miniproxy = __webpack_require__(/*! ./miniproxy-worker.js */ \"./brains/miniproxy-worker.js\");\nconst sleep = utils.sleep;\nconst setIntervalSynchronous = utils.setIntervalSynchronous;\n\nvar brains = {};\nbrains.newCode;\nbrains.threadsBrains = [];\nbrains.workerActive = [];\nbrains.arrayBrainsStatus = [];\nbrains.reset = false;\nbrains.workers = [];\n\nconst PYTHON_WHILE = \"while(true)\";\nconst PYONBROWSER_WHILE = \"while ( (__PyTrue__).__bool__ () === __PyTrue__)\";\nconst START_USER_CODE = \"// START USER CODE\";\nconst END_USER_CODE = \"// END USER CODE\";\n\nfunction getLoopEnd(loop) {\n    let endWhile;\n    for (var char = 0, ignore = -1; char < loop.length; char++) {\n        if (loop[char] == '{') {\n            // another JS sentence starting ({) found\n            ignore += 1;\n        } else if (loop[char] == '}') {\n            if (ignore > 0) {\n                // if another sentence starting was found\n                // this (}) is not the end of the infinite loop\n                ignore -= 1;\n            } else {\n                // end of infinite loop found\n                endWhile = char;\n                break;\n            }\n        }\n    }\n    if (endWhile + 1 < loop.length - 1) {\n        console.log('Detectado código después del bucle infinito. Ese código se ignorará.');\n        /*Swal.fire({\n          type: 'info',\n          text: 'Ese código no se ejecutará',\n          title: 'Detectado código después del bucle infinito',\n        });*/\n    }\n    return endWhile;\n}\n\nfunction cleanCode(code) {\n    /* Remove anything subsequent to an infinite loop */\n    if (code.split(PYTHON_WHILE).length <= 2 && code.indexOf(PYTHON_WHILE) != -1) {\n        // only one infinite loop allowed\n        var loop = code.split(PYTHON_WHILE)[1];\n        let endWhile = getLoopEnd(loop);\n        loop = loop.substring(0, endWhile + 1); // removing anything after end of loop\n        // recovering the previous code and building the cleaned code\n        var newCode = code.split(PYTHON_WHILE)[0] + PYTHON_WHILE + loop;\n        return newCode;\n    } else {\n        return code;\n    }\n}\n\nbrains.createTimeoutBrain = (code, myRobot, id) => {\n    var iterative_code, sequential_code;\n    // SI+ Applications\n    if (code.split(PYTHON_WHILE).length <= 2 && code.split(PYONBROWSER_WHILE).length <= 2) {\n        // only one infinite loop allowed\n        if (code.indexOf(PYTHON_WHILE) !== -1) {\n            if (code.split(PYTHON_WHILE)[0] === \"async function myAlgorithm(){\\n\") {\n                sequential_code = null;\n            } else {\n                sequential_code = code.split(PYTHON_WHILE)[0] + '\\n}\\nmyAlgorithm();'; // S\n            }\n            iterative_code = \"async function myAlgorithm()\" + code.split(PYTHON_WHILE)[1]; // I\n            var pos = iterative_code.lastIndexOf('}');\n            iterative_code = iterative_code.substring(0, pos) + '' + iterative_code.substring(pos + 1);\n        } else if (code.indexOf(PYONBROWSER_WHILE) !== -1) {\n            let start_general_code = code.split(START_USER_CODE)[0];\n            let end_general_code = code.split(END_USER_CODE)[1];\n            let user_code = code.split(START_USER_CODE)[1];\n            user_code = user_code.split(END_USER_CODE)[0];\n            if (code.split(PYONBROWSER_WHILE)[0] === \"async function myAlgorithm(){\\n\") {\n                sequential_code = null;\n            } else {\n                sequential_code = user_code.split(PYONBROWSER_WHILE)[0];\n                sequential_code = start_general_code + sequential_code + end_general_code;\n            }\n            var loop = user_code.split(PYONBROWSER_WHILE)[1];\n            let endWhile = getLoopEnd(loop);\n            loop = loop.substring(0, endWhile + 1);\n            iterative_code = start_general_code + loop + end_general_code;\n        } else {\n            sequential_code = code;\n            iterative_code = null;\n        }\n        return setTimeout(async function iteration() {\n            if (sequential_code != null) {\n                await eval(sequential_code);\n                sequential_code = null;\n            }\n            if (iterative_code != null) {\n                await eval(iterative_code);\n                var threadBrain = brains.threadsBrains.find(threadBrain => threadBrain.id === id);\n                var brainStatus = brains.getBrainStatus(threadBrain.id);\n                if (brainStatus.status != \"RELOADING\") {\n                    var t = setTimeout(iteration, 100);\n                    threadBrain.iteration = t;\n                    brainStatus.status = \"RUNNING\";\n                } else {\n                    while (brainStatus.blocking_instruction) {\n                        await sleep(0.001);\n                    }\n                    brainStatus.status = \"RUNNING\";\n                    if (brains.newCode) {\n                        threadBrain.iteration = brains.createTimeoutBrain(brains.newCode, Websim.simulation.getHalAPI(brainStatus.id), brainStatus.id);\n                    } else {\n                        threadBrain.iteration = brains.createTimeoutBrain(code, Websim.simulation.getHalAPI(brainStatus.id), brainStatus.id);\n                    }\n                }\n            }\n        }, 100);\n    } else {\n        console.log('Error en el código.\\nSólo puedes poner un bucle infinito.');\n        /*Swal.fire({\n          type: 'error',\n          text: 'Modifica el código y vuelve a ejecutar',\n          title: 'Error en el código.\\nSólo puedes poner un bucle infinito',\n        });*/\n        return undefined;\n    }\n};\n\nbrains.runBrain = (robotID, code) => {\n    /**\n     * Function to create a \"thread\" and execute UI code\n     * also saves the \"thread\" on an array of running threadss\n     *\n     * @param {Object} myRobot RobotI object used to run code from UI\n     */\n    var brainStatus = brains.getBrainStatus(robotID);\n    brainStatus.id = robotID;\n    brainStatus.status = \"RUNNING\";\n    code = cleanCode(code);\n    code = 'async function myAlgorithm(){\\n' + code + '\\n}\\nmyAlgorithm();';\n    brains.threadsBrains.push({\n        \"id\": robotID,\n        \"running\": true,\n        \"iteration\": brains.createTimeoutBrain(code, Websim.simulation.getHalAPI(robotID), robotID),\n        \"codeRunning\": code\n    });\n};\n\nbrains.threadExists = robotID => {\n    return brains.threadsBrains.find(threadBrain => threadBrain.id == robotID);\n};\n\nbrains.isThreadRunning = robotID => {\n    /**\n     * Function to check if a thread is running\n     *\n     * @param {string} threadID ID of the thread to check if running\n     */\n    var threadBrain = brains.threadsBrains.find(threadBrain => threadBrain.id == robotID);\n    return threadBrain.running;\n};\n\nbrains.resumeBrain = (robotID, code) => {\n    let brainStatus = brains.getBrainStatus(robotID);\n    code = cleanCode(code);\n    var threadBrain = brains.threadsBrains.find(threadBrain => threadBrain.id == robotID);\n    code = 'async function myAlgorithm(){\\n' + code + '\\n}\\nmyAlgorithm();';\n    if (threadBrain.codeRunning !== code) {\n        brainStatus.status = \"RELOADING\";\n        clearTimeout(threadBrain.iteration);\n        brains.newCode = code;\n        if (!brainStatus.blocking_instruction) {\n            var myRobot = Websim.simulation.getHalAPI(robotID);\n            myRobot.parar();\n            threadBrain.iteration = brains.createTimeoutBrain(code, myRobot, robotID);\n        }\n    } else {\n        brainStatus.status = \"RUNNING\";\n    }\n    threadBrain.running = true;\n    threadBrain.codeRunning = code;\n};\n\nbrains.resetBrain = (robotID, code) => {\n    let brainStatus = brains.getBrainStatus(robotID);\n    code = cleanCode(code);\n    var threadBrain = brains.threadsBrains.find(threadBrain => threadBrain.id == robotID);\n    code = 'async function myAlgorithm(){\\n' + code + '\\n}\\nmyAlgorithm();';\n    brainStatus.status = \"RELOADING\";\n    clearTimeout(threadBrain.iteration);\n    brains.newCode = code;\n    if (!brainStatus.blocking_instruction) {\n        var myRobot = Websim.simulation.getHalAPI(robotID);\n        myRobot.parar();\n        threadBrain.iteration = brains.createTimeoutBrain(code, myRobot, robotID);\n    }\n    threadBrain.running = true;\n    threadBrain.codeRunning = code;\n};\n\nbrains.pauseBrain = robotID => {\n    /**\n     * Pause one thread running\n     */\n    let brainStatus = brains.getBrainStatus(robotID);\n    brainStatus.status = \"PAUSE\";\n    var threadBrain = brains.threadsBrains.find(threadBrain => threadBrain.id === robotID);\n    clearTimeout(threadBrain.iteration);\n    threadBrain.running = false;\n};\n\nbrains.runWorkerBrain = (robotID, code) => {\n    /**\n     * Function to create a webworker and send it user code\n     *\n     * @param {Object} myRobot RobotI object used to run code from UI\n     */\n    if (typeof Worker !== \"undefined\") {\n        brains.threadsBrains.push({ id: robotID, code: code, running: true });\n        startWorker(robotID, code);\n        brains.arrayBrainsStatus.push({ id: robotID, status: \"PAUSE\", blocking_instruction: false });\n    } else {\n        console.log(\"Your browser does not support web workers\");\n    }\n};\n\nbrains.stopWorker = robotID => {\n    var threadBrain = brains.threadsBrains.find(threadBrain => threadBrain.id === robotID);\n    threadBrain.running = false;\n    let brainStatus = brains.getBrainStatus(robotID);\n    brainStatus.status = \"PAUSE\";\n};\n\nbrains.resumeWorker = (robotID, code) => {\n    var threadBrain = brains.threadsBrains.find(threadBrain => threadBrain.id === robotID);\n\n    if (threadBrain.code !== code) {\n        let brainStatus = brains.getBrainStatus(robotID);\n        brainStatus.status = \"RELOADING\";\n        let worker = brains.getWorker(robotID);\n        worker.postMessage({ message: \"resume_code\", robotID: robotID, code: code });\n        brains.removeWorker(robotID, worker);\n        // brains.w = undefined;\n        startWorker(robotID, code);\n    } else if (brains.reset === true) {\n        startWorker(robotID, code);\n        brains.reset = false;\n    }\n    threadBrain.running = true;\n    threadBrain.codeRunning = code;\n};\n\nbrains.resetWorker = (robotID, code) => {\n    let threadBrain = brains.threadsBrains.find(threadBrain => threadBrain.id === robotID);\n    let brainStatus = brains.getBrainStatus(robotID);\n    brainStatus.status = \"RELOADING\";\n    let myRobot = Websim.simulation.getHalAPI(robotID);\n    myRobot.move(0, 0, 0);\n    let worker = brains.getWorker(robotID);\n    worker.postMessage({ message: \"resume_code\", robotID: robotID, code: code });\n    brains.removeWorker(robotID, worker);\n    brains.reset = true;\n    threadBrain.running = false;\n    threadBrain.codeRunning = code;\n};\n\nasync function startWorker(robotID, code) {\n    let brainStatus = brains.getBrainStatus(robotID);\n    while (brainStatus.blocking_instruction) {\n        await sleep(0.001);\n    }\n    var myRobot = Websim.simulation.getHalAPI(robotID);\n\n    if (window.location.hostname === \"localhost\" && window.location.port === \"8080\") {\n        brains.workers.push({ id: robotID, worker: new Worker(\"../../brains/worker.js?host=local\") });\n    } else {\n        brains.workers.push({ id: robotID, worker: new Worker(\"../../../static/websim/Scratch-editor/build/worker.js?host=production\") });\n    }\n    brainStatus.status = \"RUNNING\";\n    brains.workers[brains.workers.length - 1].worker.postMessage({ message: \"user_code\", robotID: robotID, code: code });\n    brains.workers[brains.workers.length - 1].worker.onmessage = function (e) {\n        miniproxy.reply(e.data, brains, myRobot);\n    };\n}\n\nbrains.removeWorker = (robotID, worker) => {\n    worker.terminate();\n    brains.workers = [];\n    console.log(\"List:\", brains.workers);\n};\n\nbrains.showThreads = () => {\n    /**\n     * Function used for debugging, prints all threads data\n     */\n    brains.threadsBrains.forEach(threadBrain => {\n        console.log(threadBrain);\n    });\n};\n\nbrains.getBrainStatus = robotID => {\n    var brain;\n    brains.arrayBrainsStatus.forEach(element => {\n        if (element.id === robotID) {\n            brain = element;\n        }\n    });\n    if (!brain) {\n        return brains.arrayBrainsStatus[0];\n    }\n    return brain;\n};\n\nbrains.getWorker = robotID => {\n    var worker;\n    brains.workers.forEach(element => {\n        if (element.id == robotID) {\n            worker = element.worker;\n        }\n    });\n    if (!worker) {\n        return worker;\n    }\n    return worker;\n};\n\nmodule.exports = brains;\n\n//# sourceURL=webpack:///./brains/brains-methods.js?");

/***/ }),

/***/ "./brains/miniproxy-worker.js":
/*!************************************!*\
  !*** ./brains/miniproxy-worker.js ***!
  \************************************/
/*! exports provided: reply */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"reply\", function() { return reply; });\nconst console = __webpack_require__(/*! ./robotAPIminiproxy/consoleRobotAPIminiproxy */ \"./brains/robotAPIminiproxy/consoleRobotAPIminiproxy.js\");\n\nasync function reply(message, brains, myRobot) {\n  /**\n  Miniproxy: To handler messages from worker and translate to HALapi\n  **/\n  var worker = brains.getWorker(myRobot.myRobotID);\n  switch (message.message) {\n    case \"lineal\":\n      eval(\"myRobot.\" + message.function + \"(\" + message.parameter + \")\");\n      worker.postMessage({ message: \"finished\" });\n      break;\n    case \"move\":\n      eval(\"myRobot.move(\" + message.v + \", \" + message.w + \", \" + message.h + \")\");\n      break;\n    case \"advanceTo\":\n      await eval(\"myRobot.\" + message.function + \"(\" + message.parameter + \")\");\n      worker.postMessage({ message: \"finished\" });\n      break;\n    case \"turnUpTo\":\n      await eval(\"myRobot.\" + message.function + \"(\" + message.parameter + \")\");\n      worker.postMessage({ message: \"finished\" });\n      break;\n    case \"land\":\n      await eval(\"myRobot.\" + message.function + \"()\");\n      worker.postMessage({ message: \"finished\" });\n      break;\n    case \"takeOff\":\n      await eval(\"myRobot.\" + message.function + \"()\");\n      worker.postMessage({ message: \"finished\" });\n      break;\n    case \"sensor\":\n      let sensor = eval(\"myRobot.\" + message.function + \"();\");\n      worker.postMessage({ message: \"sensor\", function: message.function, parameter: sensor });\n      break;\n    case \"camera\":\n      let camera = eval(\"myRobot.\" + message.function + \"(\\\"\" + message.color + \"\\\");\");\n      worker.postMessage({ message: \"camera\", function: message.function, parameter: camera });\n      break;\n    case \"cameraRGB\":\n      let cameraRGB = myRobot.getObjectColorRGB(message.color[0], message.color[1]);\n      worker.postMessage({ message: \"camera\", function: message.function, parameter: cameraRGB });\n      break;\n    case \"image\":\n      let image = myRobot.getImage(message.id);\n      worker.postMessage({ message: \"image\", function: message.function, parameter: image });\n      break;\n    case \"upTo\":\n      await eval(\"myRobot.\" + message.function + \"(\" + message.parameter + \")\");\n      worker.postMessage({ message: \"finished\" });\n      break;\n    case \"downTo\":\n      await eval(\"myRobot.\" + message.function + \"(\" + message.parameter + \")\");\n      worker.postMessage({ message: \"finished\" });\n      break;\n    case \"coloredObject\":\n      let imagePosition = myRobot.getColoredObject(message.color);\n      let value = [imagePosition.center[0], imagePosition.center[1], imagePosition.area];\n      worker.postMessage({ message: \"camera\", function: message.function, parameter: value });\n      break;\n    case \"print\":\n      if (message.function === \"print\") {\n        console.printConsole(message.parameter);\n      } else {\n        eval(\"myRobot.\" + message.function + \"(\\\"\" + message.parameter + \"\\\");\");\n      }\n      break;\n    case \"input\":\n      if (message.function === \"input\") {\n        let inputValue = await console.inputConsole(message.parameter, myRobot, brains, worker);\n        worker.postMessage({ message: \"input\", function: \"input\", parameter: inputValue });\n      } else {\n        await eval(\"myRobot.\" + message.function + \"(\\\"\" + message.parameter + \"\\\");\");\n      }\n      break;\n    default:\n      console.log(\"Message receive in proxy: \" + message);\n  }\n}\n\n//# sourceURL=webpack:///./brains/miniproxy-worker.js?");

/***/ }),

/***/ "./brains/robotAPIminiproxy/consoleRobotAPIminiproxy.js":
/*!**************************************************************!*\
  !*** ./brains/robotAPIminiproxy/consoleRobotAPIminiproxy.js ***!
  \**************************************************************/
/*! exports provided: printConsole, inputConsole */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"printConsole\", function() { return printConsole; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"inputConsole\", function() { return inputConsole; });\nconst utils = __webpack_require__(/*! ../../simcore/utils */ \"./simcore/utils/index.js\");\nconst sleep = utils.sleep;\n\nfunction printConsole(text) {\n  let oldLog = console.log;\n  console.log = function (message) {\n    const errorRegex = /\\[ERROR]/g;\n    if (typeof message === 'string' && message.match(errorRegex) !== null) {\n      document.getElementById('console_web').innerHTML += '<p style=\"color:red\">[ERROR]</p>';\n      document.getElementById('console_web').innerHTML += '<p>' + message.split(errorRegex)[1] + '</p>';\n    } else {\n      document.getElementById('console_web').innerHTML += '<p>' + message + '</p>';\n    }\n  };\n  console.log(text);\n  var consoleWeb = document.getElementById('console_web');\n  consoleWeb.scrollTop = consoleWeb.scrollHeight;\n  console.log = oldLog;\n}\n\nasync function inputConsole(text, myRobot, brains, worker) {\n  let oldLog = console.log;\n  var inputValue = \"\";\n  console.log = function (message) {\n    document.getElementById('console_web').innerHTML += '<p>' + message + '</p>';\n  };\n  console.log(text + '<input id =\"myInput\" type=\"text\" style=\"background-color:transparent;outline:none;border:none;\">');\n  var consoleWeb = document.getElementById('console_web');\n  consoleWeb.scrollTop = consoleWeb.scrollHeight;\n  console.log = oldLog;\n  var enterKeyPressed = false;\n  function keydownHandler(e) {\n    if (e.keyCode === 13) {\n      inputValue = document.getElementById(\"myInput\").value;\n      $('#myInput').remove();\n      let oldLog = console.log;\n      console.log = function (message) {\n        document.getElementById('console_web').innerHTML += '<p>' + message + '</p>';\n      };\n      console.log(inputValue);\n      var consoleWeb = document.getElementById('console_web');\n      consoleWeb.scrollTop = consoleWeb.scrollHeight;\n      console.log = oldLog;\n      document.removeEventListener('keydown', keydownHandler, false);\n      enterKeyPressed = true;\n    }\n  }\n  let brainStatus = brains.getBrainStatus(myRobot.myRobotID);\n  brainStatus.blocking_instruction = true;\n  document.addEventListener('keydown', keydownHandler, false);\n  while (brains.getBrainStatus(myRobot.myRobotID).status !== \"RELOADING\" && !enterKeyPressed) {\n    await sleep(0.1);\n  }\n  worker.postMessage({ message: \"finished\" });\n  brainStatus.blocking_instruction = false;\n  return inputValue;\n}\n\n//# sourceURL=webpack:///./brains/robotAPIminiproxy/consoleRobotAPIminiproxy.js?");

/***/ }),

/***/ "./simcore/utils/functions.js":
/*!************************************!*\
  !*** ./simcore/utils/functions.js ***!
  \************************************/
/*! exports provided: sleep, setIntervalSynchronous, arraysEqual */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"sleep\", function() { return sleep; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"setIntervalSynchronous\", function() { return setIntervalSynchronous; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"arraysEqual\", function() { return arraysEqual; });\nfunction sleep(s) {\n  /**\n   * Auxiliar function to implement a throttle of code.\n   * \n   * @param {integer} s Number of seconds to stop the code\n   */\n  var ms = s * 1000;\n  return new Promise(resolve => setTimeout(resolve, ms));\n}\n\n/*\nhttps://gist.github.com/AndersDJohnson/4385908\n*/\nvar setIntervalSynchronous = function (func, delay) {\n  /**\n   * This function sets interval synchronous\n   * \n   * @param {function} func Function to be executed when reached interval time\n   * @param {integer} delay Time to wait between executions\n   */\n  var intervalFunction,\n      timeoutId,\n      clear,\n      stopped = false;\n  // Call to clear the interval.\n  clear = function () {\n    stopped = true;\n    clearTimeout(timeoutId);\n  };\n  intervalFunction = async function () {\n    await func();\n    if (!stopped) {\n      timeoutId = setTimeout(intervalFunction, delay);\n    }\n  };\n  // Delay start.\n  timeoutId = setTimeout(intervalFunction, delay);\n  // You should capture the returned function for clearing.\n  return clear;\n};\n\nfunction arraysEqual(a, b) {\n  /**\n   * Function to check if to arrays are fully equals\n   * \n   * @param {array} a Input array to compare with B\n   * @param {array} b Input array to compare with A\n   */\n  if (a === b) return true;\n  if (a == null || b == null) return false;\n  if (a.length != b.length) return false;\n\n  // If you don't care about the order of the elements inside\n  // the array, you should sort both arrays here.\n  // Please note that calling sort on an array will modify that array.\n  // you might want to clone your array first.\n\n  for (var i = 0; i < a.length; ++i) {\n    if (a[i] !== b[i]) return false;\n  }\n  return true;\n}\n\n//# sourceURL=webpack:///./simcore/utils/functions.js?");

/***/ }),

/***/ "./simcore/utils/index.js":
/*!********************************!*\
  !*** ./simcore/utils/index.js ***!
  \********************************/
/*! exports provided: sleep, setIntervalSynchronous, arraysEqual */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _functions_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./functions.js */ \"./simcore/utils/functions.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"sleep\", function() { return _functions_js__WEBPACK_IMPORTED_MODULE_0__[\"sleep\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"setIntervalSynchronous\", function() { return _functions_js__WEBPACK_IMPORTED_MODULE_0__[\"setIntervalSynchronous\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"arraysEqual\", function() { return _functions_js__WEBPACK_IMPORTED_MODULE_0__[\"arraysEqual\"]; });\n\n\n\n//# sourceURL=webpack:///./simcore/utils/index.js?");

/***/ })

/******/ });