const containerid = 'dashboard';
let dashboardObject = null;
let testDashboard = '';

let toolbarState = true;
let tabNavigationState = true;
let designerState = true;

// dashboardDefinition, tabs and active tab
let dashboardDefinition = null;
let tabs;
let activeTab;

let url = "";
let jsapi = url + "/jsapi";

const runDashboard = () => {
    dashboardObject = new actuate.Dashboard(containerid);

    // register the event handler
    dashboardObject.registerEventHandler(actuate.dashboard.EventConstants.ON_EXCEPTION, errorHandle);
    dashboardObject.registerEventHandler(actuate.dashboard.EventConstants.ON_SESSION_TIMEOUT, timeoutHandle);

    // Set dashboard dimension
    dashboardObject.setSize(1024, 768);

    // Set dashboard to be in embedded mode
    dashboardObject.setIsStandalone(false);

    // set dashboard name
    dashboardObject.setDashboardName(testDashboard);

    // Use edit mode to show the toolbar menu and toolbar icons
    dashboardObject.setIsDesigner(true);

    // Show the tab navigation bar
    dashboardObject.showTabNavigation(true);

    dashboardObject.downloadDashboard(downloadCallback);
}

var downloadCallback = function (dashDef) {
    dashboardDefinition = dashDef;
    tabs = dashboardDefinition.getTabs();
    activeTab = dashboardDefinition.getDefaultActiveTab();
    addTabsList();
    dashboardObject.renderContent(dashboardDefinition, function () {
        sendText("Finished loading dashboard.");
        sendText("Dashboard filename: " + dashboardObject.getDashboardName());
    });
}

const timeoutHandle = () => {
    sendText("Dashboard has timed-out. Refresh this page to continue.");
}

const errorHandle = (exception) => {
    sendText('Error Code: ' + exception.getErrCode());
    sendText('Error Message: ' + exception.getMessage());
}

const toggleToolbar = () => {
    if (toolbarState) {
        dashboardObject.showToolbar(false);
        var state = dashboardObject.isToolbarVisible() ? "visible" : "invisible";
        sendText("Toolbar is curently " + state); // is a bug. See JSAPI-357
        toolbarState = false;
    } else {
        dashboardObject.showToolbar(true);
        var state = dashboardObject.isToolbarVisible() ? "visible" : "invisible";
        sendText("Toolbar is curently " + state);
        toolbarState = true;
    }
}

const toggleTabNavigation = () => {
    if (tabNavigationState) {
        dashboardObject.showTabNavigation(false);
        tabNavigationState = false;
        sendText("Tab navigation is now disabled.")
    } else {
        dashboardObject.showTabNavigation(true);
        tabNavigationState = true;
        sendText("Tab navigation is now enabled.")
    }

}

const toggleIsDesigner = () => {
    // dashboardObject.onUnload();
    if (designerState) {
        dashboardObject.setIsDesigner(false);
        designerState = false;
    } else {
        dashboardObject.setIsDesigner(true);
        designerState = true;
    }

    dashboardObject.renderContent(dashboardDefinition, function () {
        sendText("Finished toggling designer state.");
    });
}

const addTabsList = () => {
    var select = document.getElementById("tabs");
    var tabSize = tabs.length;

    var activeTabIndex;

    for (var i = 0; i < tabSize; i++) {
        var option = document.createElement('option');
        option.text = tabs[i].getTitle();
        option.value = tabs[i].getName();
        if (option.value === activeTab) {
            sendText("Current Selected tab is: " + tabs[i].getTitle());
            activeTabIndex = i;
        }
        select.add(option, document.getElementById("tabs").length);
    }
    document.getElementById("tabs").selectedIndex = activeTabIndex;
}

const setActiveTab = () => {
    var activeTab = document.getElementById("tabs");
    dashboardObject.setActiveTab(activeTab.value);

    var selectedIndex;

    for (var i = 0; i < tabs.length; i++) {
        if (tabs[i].getName() === activeTab.value)
            selectedIndex = i;
    }

    var compare = (tabs[selectedIndex].getName() === dashboardObject.getActiveTab()) ? "is" : "is not";

    sendText("Name of selected tab " + compare + " the same as current active tab: " + tabs[selectedIndex].getName());
    sendText("Type of selected tab: " + tabs[selectedIndex].getTabType());
    sendText("Title of selected tab: " + tabs[selectedIndex].getTitle());
}

const save = () => {
    var compare = dashboardObject.isSavingNeeded() ? "was" : "was not";
    sendText("Saving " + compare + " required.");
    dashboardObject.save(function () {
        sendText("Finished saving the dashboard.");
    }, true)
}

const saveAs = () => {
    var newDashboardFilename = document.getElementById("saveAsFilename").value;
    var replace = document.getElementById("saveAsOverwrite").checked;
    var overwriteString = replace ? "Finished replacing the latest version of the file: " : "Finished creating a new version of the file: ";

    var compare = dashboardObject.isSavingNeeded() ? "was" : "was not";
    sendText("Saving " + compare + " required.");

    dashboardObject.saveAs(function () {
        sendText(overwriteString + newDashboardFilename);
    }, newDashboardFilename, replace, true)
}

const autoSaveDelay = () => {
    var delay = document.getElementById("autoSaveDelay").value;
    dashboardObject.setAutoSaveDelay(delay);
    var state = dashboardObject.isAutoSaveEnabled() ? "is" : "is not";
    sendText("Auto save " + state + " enabled.");
    sendText("Auto save value: " + delay + " seconds.");
}

const changeAutoSave = () => {
    var delay = document.getElementById("autoSaveDelayChange").value;
    dashboardObject.setAutoSaveDelay(delay);
    var state = dashboardObject.isAutoSaveEnabled() ? "is" : "is not";
    sendText("Auto save " + state + " enabled.");
    sendText("Auto save value: " + delay + " seconds.");
}

const changeDimension = () => {
    var width = document.getElementById("width").value;
    var height = document.getElementById("height").value;

    dashboardObject.setWidth(width);
    dashboardObject.setHeight(height);
    dashboardObject.renderContent(dashboardDefinition);
}

// Load JSAPI dynamically
const loadDesigner = (authToken, dashboardPath, iportalUrl) => {
    if (dashboardPath) {
        testDashboard = dashboardPath;
    }
    url = iportalUrl;
    jsapi = iportalUrl + "/jsapi";
    var args = new Object();
    args = GetUrlParms();

    if (args.dashboard) {
        testDashboard = args.dashboard;
    }

    var script = document.createElement('script');
    script.setAttribute('type', 'text/javascript');
    script.setAttribute('language', 'JavaScript');
    script.setAttribute('src', jsapi);
    document.getElementsByTagName("head")[0].appendChild(script)

    if (script.readyState) { //IE
        script.onreadystatechange = function () {
            if (script.readyState == "loaded" || script.readyState == "complete") {
                script.onreadystatechange = null;
                init(authToken);
            } else {
                console.log("Fail to load JSAPI");
            }
        };
    } else { //Others
        script.onload = function () {
            init(authToken);
        };
    }
    appendStyle();
}

// Get the URL parameters
const GetUrlParms = () => {
    var args = new Object();
    var query = location.search.substring(1);
    var pairs = query.split("&");
    for (var i = 0; i < pairs.length; i++) {
        var pos = pairs[i].indexOf('=');
        if (pos == -1)
            continue;
        var argname = pairs[i].substring(0, pos);
        var value = pairs[i].substring(pos + 1);
        args[argname] = unescape(value);
    }
    return args;
}

// add the CSS style to the test pages
const appendStyle = () => {
    const css = "input[type='button'] { height: 22px; font-family: 'Verdana', 'Helvetica', 'Arial', 'sans-serif'; font-size: 70%; }";
    const css2 = "input[type='text'] { height: 18px; font-family: 'Verdana', 'Helvetica', 'Arial', 'sans-serif'; font-size: 70%; }";
    const css3 = "select { height: 22px; font-family: 'Verdana', 'Helvetica', 'Arial', 'sans-serif'; font-size: 70%; }";
    const css4 = "div[id='output'] { font-family: 'Verdana', 'Helvetica', 'Arial', 'sans-serif'; font-size: 90%; }";

    const head = document.head || document.getElementsByTagName('head')[0];
    const style = document.createElement('style');

    style.type = 'text/css';
    style.appendChild(document.createTextNode(css));
    style.appendChild(document.createTextNode(css2));
    style.appendChild(document.createTextNode(css3));
    style.appendChild(document.createTextNode(css4));

    head.appendChild(style);
}

// Add text to the output DIV
const sendText = (thisText) => {
    const newText = thisText + "<br />";
    document.getElementById("output").innerHTML += newText;
}

// Clear all text in the output DIV
const clearText = () => {
    document.getElementById("output").innerHTML = "";
}


// Function to initialize iPortal
const init = (authToken) => {
    actuate.load("dashboard");
    var reqOps = new actuate.RequestOptions();
    reqOps.setRepositoryType(actuate.RequestOptions.REPOSITORY_ENCYCLOPEDIA); // ENTERPRISE mode
    reqOps.setVolumeProfile("enterprise");
    reqOps.setExternalToken(authToken);

    actuate.initialize(url, reqOps, "", "", runDashboard);
}

module.exports = {
    loadDesigner,
    clearText,
    toggleToolbar,
    toggleTabNavigation,
    changeDimension,
    save,
    saveAs,
    setActiveTab,
    toggleIsDesigner,
    changeAutoSave
}

