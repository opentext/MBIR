
  var initReport = (authToken, bireportingjs_ServiceUrl, reportPath) => {
    clearErrors();
    actuate.load("viewer");
    var reqOps = new actuate.RequestOptions( );
    reqOps.setRepositoryType(actuate.RequestOptions.REPOSITORY_ENCYCLOPEDIA);
    reqOps.setVolumeProfile("enterprise");
    reqOps.setExternalToken(authToken);
    if(actuate.isInitialized()) {
        actuate.authenticate(bireportingjs_ServiceUrl, reqOps, null, null,null, () => runReport(reportPath), handleError);
    } else {
        actuate.initialize(bireportingjs_ServiceUrl, reqOps, null, null, () => runReport(reportPath), handleError);
    }
}

const runReport = (report) => {
    clearErrors();
    var config = new actuate.viewer.UIConfig();
    config.setContentPanel(new actuate.viewer.BrowserPanel());
    var vwr = new actuate.Viewer("reportpane", config);
    vwr.setReportName(report);
    vwr.setSize( "100%", "100%");

    vwr.registerEventHandler(actuate.viewer.EventConstants.ON_EXCEPTION, reportErrorHandle);
    vwr.registerEventHandler(actuate.viewer.EventConstants.ON_SESSION_TIMEOUT, timeoutHandle);

    vwr.submit( );
}

const handleError = (exception) => {
    clearErrors();
    console.log("Error: fail to authenticate user");
    writeError("Error: fail to authenticate user");
    if(exception.getErrCode()) {
        console.error('Error Code: ' + exception.getErrCode());
        writeError('Error Code: ' + exception.getErrCode());
    }
    console.error('Error Message: ' + exception.getMessage());
    writeError('Error Message: ' + exception.getMessage());
}

const reportErrorHandle = (viewInstance, exception) => {
    clearErrors();
    console.error("Error: fail to render report");
    writeError("Error: fail to render report");
    if(exception.getErrCode()) {
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
    document.querySelector("#reportpane #report_error_section").innerHTML = "";
}

const writeError = (errorText) => {
    var el = document.createElement("p");
    el.innerHTML = errorText;
    document.querySelector("#reportpane #report_error_section").appendChild(el);
}

module.exports = {initReport}
