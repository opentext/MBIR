/**
 * Configuration file
 */

var url = "https://dev.ca.api.opentext.com/bireportingjs/iportal";
var jsapi = url + "/jsapi";
var volumeProfile = "Default Volume";
var volume = "Default Volume";

// Dashboard to be tested
var testDashboard = '/Resources/UserData/Dashboard/SampleDashboard.dashboard';

// add the CSS style to the test pages
function appendStyle() {

	var css = "input[type='button'] { height: 22px; font-family: 'Verdana', 'Helvetica', 'Arial', 'sans-serif'; font-size: 70%; }";
	var css2 = "input[type='text'] { height: 18px; font-family: 'Verdana', 'Helvetica', 'Arial', 'sans-serif'; font-size: 70%; }";
	var css3 = "select { height: 22px; font-family: 'Verdana', 'Helvetica', 'Arial', 'sans-serif'; font-size: 70%; }";
	var css4 = "div[id='output'] { font-family: 'Verdana', 'Helvetica', 'Arial', 'sans-serif'; font-size: 90%; }";

	var head = document.head || document.getElementsByTagName('head')[0];
	var style = document.createElement('style');

	style.type = 'text/css';
	style.appendChild(document.createTextNode(css));
	style.appendChild(document.createTextNode(css2));
	style.appendChild(document.createTextNode(css3));
	style.appendChild(document.createTextNode(css4));

	head.appendChild(style);
}

// Get the URL parameters
function GetUrlParms() {
    var args=new Object();
    var query=location.search.substring(1);
    var pairs=query.split("&");
    for(var i=0;i<pairs.length;i++)
    {
        var pos=pairs[i].indexOf('=');
            if(pos==-1)
            	continue;
            var argname=pairs[i].substring(0,pos);
            var value=pairs[i].substring(pos+1);
            args[argname]=unescape(value);
    }
    return args;
}

// Load JSAPI dynamically
function loadJs(authToken, dashboardPath, iportalUrl) {
	if(dashboardPath) {
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
		script.onreadystatechange = function() {
			if (script.readyState == "loaded" || script.readyState == "complete") {
				script.onreadystatechange = null;
				init(authToken);
			} else {
				console.log("Fail to load JSAPI");
			}
		};
	} else { //Others
		script.onload = function() {
			init(authToken);
		};
	}
	appendStyle();
}

// Function to initialize iPortal
function init(authToken) {
	actuate.load("dashboard");
	var reqOps = new actuate.RequestOptions( );
	reqOps.setRepositoryType(actuate.RequestOptions.REPOSITORY_ENCYCLOPEDIA); // ENTERPRISE mode
	reqOps.setVolumeProfile("enterprise");
	reqOps.setExternalToken(authToken);
	
	actuate.initialize(url, reqOps, "", "", runDashboard);
}

// Add text to the output DIV
function sendText(thisText) {
	var newText = thisText + "<br />";
	document.getElementById("output").innerHTML += newText; 
}

// Clear all text in the output DIV
function clearText()
{
	document.getElementById("output").innerHTML = "";
}

// Create Request Options
function createRequestOptions(url, volume, locale, isEnterprise) {
	var options = new actuate.RequestOptions();
	if (locale) {
		options.setLocale(locale);
	}
	if (url) {
		options.setIServerUrl(url);
	}
	if (volume) {
		options.setVolume(volume);
	}
	if (isEnterprise) {
		options.setRepositoryType(actuate.RequestOptions.REPOSITORY_ENCYCLOPEDIA);
	} else {
		options.setRepositoryType(actuate.RequestOptions.REPOSITORY_STANDALONE);
	}
	return options;
}

// get data from the output data DIV
function getDIVData() {
	return document.getElementById("output").innerHTML;
}
