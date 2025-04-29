let dpViewer = null;
let newconfig = null;

const initDataProvisioning = (authToken, iportalURL) => {
    //console.log("JSAPI Version: " + actuate.getVersion());
    actuate.load("dataprovision.ui");
    const reqOps = new actuate.RequestOptions();
    reqOps.setRepositoryType(actuate.RequestOptions.REPOSITORY_ENCYCLOPEDIA);
    reqOps.setVolumeProfile("enterprise");
    reqOps.setExternalToken(authToken);

    actuate.initialize(iportalURL, reqOps, "", "", initViewer);
}

const initViewer = () => {

    newconfig = new actuate.dataprovision.viewer.UIConfig();
    newconfig.setHideHeader(false);
    dpViewer = new actuate.dataprovision.Viewer("dpContainer", newconfig);
    //dpViewer.setDataDesignName("[[${dataDesignFilePath}]]");

    const options = {
        debugWindowType: "CONSOLE", //"CONSOLE", "BROWSER_WINDOW"
        logLevel: "FINEST", //  "SEVERE", "WARNING", "INFO", "CONFIG", "FINE", "FINER", "FINEST"
        enable: true // true, false,

    };

    // attempt to register an event handler
    dpViewer.registerEventHandler(actuate.dataprovision.EventConstants.ON_EXCEPTION, eventHandler)
    dpViewer.setDebugOptions(options);
    dpViewer.setWidth(1024);
    dpViewer.setHeight(768);
    dpViewer.submit(function () {
        sendText("Data Provision has been loaded successfully.");
    });
}

const sendText = (thisText) => {
    const newText = thisText + "<br />";
    document.getElementById("output").innerHTML += newText;
}

const eventHandler = (error) => {
    sendText("[Error]: " + error.getType());
    sendText("[Error]: " + error.getMessage());
    sendText("[Error]: " + error.getErrCode());
    sendText("[Error]: " + error.getDescription());
}

const clearText = () => {
    document.getElementById("output").innerHTML = "";
}

const getHideHeader = () => {
    sendText(newconfig.getHideHeader());
}

const setSize = () => {

    const w = document.getElementById("width").value;
    const h = document.getElementById("height").value;
    dpViewer.setSize(w, h);
    dpViewer.submit(function () {
        sendText("changed size to " + w + " and " + h);
    });
}

const onUnload = () => {

    dpViewer.onUnload();
    sendText("unloaded");
}

const reload = () => {

    initViewer();
}

const HideHeaderTrue = () => {

    newconfig.setHideHeader(true);
    dpViewer.submit(function () {
        sendText("Data Provision has update Hide Header successfully.");
    });
}

const HideHeaderFalse = () => {

    newconfig.setHideHeader(false);
    dpViewer.submit(function () {
        sendText("Data Provision has update Hide Header successfully.");
    });
}
module.exports = {
    initDataProvisioning,
    clearText,
    onUnload,
    reload,
    setSize,
    HideHeaderTrue,
    HideHeaderFalse,
    getHideHeader
}
