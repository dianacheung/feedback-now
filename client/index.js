$(document).ready(function() {
	console.log('doc ready');
	// check if user is logged in
	isLoggedIn();
});

function isLoggedIn() {
	var ssid = getCookie("ssid");
	console.log('ssid', ssid);
	
	if(ssid !== "") { // there is user
	  // hide login and signup
	  $('#div-login').hide();
	  $('#div-signup').hide();
	  
	  $('#div-user').show();
	  showEvents();
	  
	} else { // no user
	  // show login and signup
	  $('#div-login').show();
	  $('#div-signup').show();
	  
	  $('#div-user').hide();
	}
}

function showEvents() {
	// make ajax call to get list of events for this user
	$.ajax({
		method: "GET",
		url: "/events",
		success: function(results) {
			console.log('results', results);
			
			var htmlStr = "";
			
			for(var i = 0; i < results.length; i++) {
				var evt = results[i];
				
				var hrefStr = "/event?id=" + evt._id;
				
				htmlStr += "<a href=\'" + hrefStr + "\'>" + evt.summary + " (" + evt.start  + " to " + evt.end + ")</a>";
				htmlStr += "<br>";
			}
			
			$('#div-user').append(htmlStr);
		}
	});
}

/**
 reference: http://www.w3schools.com/js/js_cookies.asp
 */
function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}