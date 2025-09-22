const initCrossTab = (authToken, iportalUrl, datamartPath) => {
    clearErrors();
    actuate.load("xtabAnalyzer");
    actuate.load("dialog");
    var reqOps = new actuate.RequestOptions();
    reqOps.setRepositoryType(actuate.RequestOptions.REPOSITORY_ENCYCLOPEDIA);
    reqOps.setVolumeProfile("enterprise");
    reqOps.setExternalToken(authToken);

    if (actuate.isInitialized()) {
        actuate.authenticate(iportalUrl, reqOps, null, null, null, () => runCrosstab(datamartPath), handleError)
    } else {
        actuate.initialize(iportalUrl, reqOps, null, null, () => runCrosstab(datamartPath), handleError);
    }
}

const runCrosstab = (crosstab) => {
    var myXtab = new actuate.XTabAnalyzer("xtabpane");
    myXtab.setDatamartFile(crosstab);
    myXtab.registerEventHandler(actuate.xtabanalyzer.EventConstants.ON_EXCEPTION, xTabErrorHandle);
    myXtab.registerEventHandler(actuate.xtabanalyzer.EventConstants.ON_SESSION_TIMEOUT, timeoutHandle);

    myXtab.submit();
}

const handleError = (exception) => {
    clearErrors();
    console.log("Error: fail to authenticate user");
    writeError("Error: fail to authenticate user");
    if (exception.getErrCode()) {
        console.error('Error Code: ' + exception.getErrCode());
        writeError('Error Code: ' + exception.getErrCode());
    }
    console.error('Error Message: ' + exception.getMessage());
    writeError('Error Message: ' + exception.getMessage());
}

const xTabErrorHandle = (viewInstance, exception) => {
    clearErrors();
    console.error("Error: fail to run crosstab analyzer");
    writeError("Error: fail to run crosstab analyzer");
    if (exception.getErrCode()) {
        console.error('Error Code: ' + exception.getErrCode());
        writeError('Error Code: ' + exception.getErrCode());
    }
    console.error('Error Message: ' + exception.getMessage());
    writeError('Error Message: ' + exception.getMessage());
}

const timeoutHandle = () => {
    clearErrors();
    console.log("session timed out, refreshing");
    writeError("session timed out, refreshing the page.");
    location.reload();
}


const clearErrors = () => {
    document.querySelector("#xtab_error_section").innerHTML = "";
}

const writeError = (errorText) => {
    var el = document.createElement("p");
    el.innerHTML = errorText;
    document.querySelector("#xtab_error_section").appendChild(el);
}

module.exports = {initCrossTab}


