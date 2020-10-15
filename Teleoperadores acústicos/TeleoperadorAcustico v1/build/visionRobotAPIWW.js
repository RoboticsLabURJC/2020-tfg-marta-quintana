function addVisionMethods(myRobot) {

    myRobot.getObjectColorPosition = async function(color) {
        postMessage({message: "coloredObject", function: "getColoredObject", color: color});
        this.finished.status = false;
        while (!this.finished.status) {
            await this.sleep(0.1);
        }
        return this.sensors.object;
    };

    myRobot.getColoredObject = async function(colorAsString) {
        postMessage({message: "camera", function: "getColoredObject", color: colorAsString});
        this.finished.status = false;
        while (!this.finished.status) {
            await this.sleep(0.1);
        }
        return this.sensors.object;
    };

    myRobot.getObjectColorRGB = async function(lowval, highval) {
        postMessage({message: "cameraRGB", function: "getObjectColorRGB", color: [lowval, highval]});
        this.finished.status = false;
        while (!this.finished.status) {
            await this.sleep(0.1);
        }
        return this.sensors.object;
    };

    myRobot.getImage = async function(cameraID) {
        postMessage({message: "image", function: "getImage", id: cameraID});
        this.finished.status = false;
        while (!this.finished.status) {
            await this.sleep(0.1);
        }
        return this.sensors.camera;
    };

    myRobot.dameObjeto = function(lowFilter, highFilter) {
        return this.getObjectColorRGB(lowFilter, highFilter);
    };

    myRobot.dameImagen = function() {
        return this.getImage();
    };

    return myRobot;
}