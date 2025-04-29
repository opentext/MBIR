
var initDashboard = (authToken, iportalurl, dashboardPath) => {
  clearErrors();

  actuate.load("dashboard");

  var username = "";
  var password = null;

  var reqOps = new actuate.RequestOptions( );
  reqOps.setRepositoryType(actuate.RequestOptions.REPOSITORY_ENCYCLOPEDIA); // ENTERPRISE mode
  reqOps.setVolumeProfile("enterprise");
  reqOps.setExternalToken(authToken);
  if (!actuate.isInitialized()) {
    actuate.initialize(iportalurl, reqOps, username, password, () => runDashboard(dashboardPath), handleError);
  } else {
    actuate.authenticate(iportalurl, reqOps, username, password, null, () => runDashboard(dashboardPath), handleError)
  }

}

const runDashboard = (dashboard) => {
  clearErrors();
  var dash = new actuate.Dashboard("mbir-dashboard-wrapper-example1");

  dash.setDashboardName(dashboard);

  var parent = document.getElementById("mbir-dashboard-wrapper-example1").parentNode;
  var width = parent.parentNode.clientWidth;
  var height = getHeight(parent.parentNode);
  dash.setSize("100%", height);

  dash.setIsDesigner(false);

  dash.registerEventHandler(actuate.dashboard.EventConstants.ON_EXCEPTION, dashboardErrorHandle);
  dash.registerEventHandler(actuate.dashboard.EventConstants.ON_SESSION_TIMEOUT, timeoutHandle);

  dash.submit();
}

const getHeight = (parentNode) => {
  var useFullBrowser = true;
  if (useFullBrowser) {
    parentNode = document.documentElement;
  }
  var style = window.getComputedStyle(parentNode);
  var height = parentNode.clientHeight;
  var margin = parseFloat(style.marginTop) + parseFloat(style.marginBottom);
  var padding = parseFloat(style.paddingTop) + parseFloat(style.paddingBottom);
  var border = 0; //?
  var finalHeight = height - margin - padding - border;
  return finalHeight;
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



const dashboardErrorHandle = (exception) => {
  clearErrors();
  console.error("Error: fail to render dashboard");
  writeError("Error: fail to render dashboard");
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
  document.querySelector("#dashboard_error_section").innerHTML = "";
}

const writeError = (errorText) => {
  var el = document.createElement("p");
  el.innerHTML = errorText;
  document.querySelector("#dashboard_error_section").appendChild(el);
}
module.exports = {initDashboard}




