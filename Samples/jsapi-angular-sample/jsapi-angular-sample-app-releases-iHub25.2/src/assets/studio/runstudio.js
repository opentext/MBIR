studio = null;
const loadStudio = (authToken, iportalUrl) => {
    unload();

    actuate.load("studio");
    const reqOps = new actuate.RequestOptions();
    reqOps.setRepositoryType(actuate.RequestOptions.REPOSITORY_ENCYCLOPEDIA);
    reqOps.setVolumeProfile("enterprise");
    reqOps.setExternalToken(authToken);

    actuate.initialize(iportalUrl, reqOps, null, null, runStudio);
}

const runStudio = () => {
    var uiConfig = new actuate.studio.UIConfig( );
    studio = new actuate.Studio("report-studio");
    studio.setUIConfig( uiConfig );
    studio.registerEventHandler(actuate.studio.EventConstants.ON_EXCEPTION,
        eventHandle);
    studio.submit(submitcallback);
}

const unload = () => {
    if(studio) {
        studio.unloadDesign();
    }
}

const eventHandle = (viewInstance, exception) => {
    console.log(viewInstance);
    console.log("[Error]: " + exception.getErrorMessage());
}

const submitcallback = () => {
    console.log("loaded brs successfully");
}

module.exports = {loadStudio}


