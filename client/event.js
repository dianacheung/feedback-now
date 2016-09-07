$(document).ready(function() {
	
	displayHeading();
	
	// check if user is logged in
	isLoggedIn();
});

function displayHeading() {
	// get eventid
	
	var qIndex = window.location.search.indexOf("=");
	if(qIndex > -1) {
		var eventId = window.location.search.slice(qIndex + 1);
		
		// make ajax call to get details for this event
		$.ajax({
			method: "GET",
			url: "/events/" + eventId,
			success: function(result) {
				
				var htmlStr =  "<p>" + result.summary + " (" + result.start  + " to " + result.end + ") cohort: " + result.cohort + "</p>";
								
				$('#event-heading').append(htmlStr);
				
			}
		});
	
	}
}

function isLoggedIn() {
	var ssid = getCookie("ssid");
	
	if(ssid !== "") { // there is user
	  // hide feedback form
	  $('#div-feedback').hide();

	  
	  $('#div-display-feedback').show();
	  showFeedback();
	  
	} else { // no user
	
	  $('#div-display-feedback').hide();
	
	  // show feedback form
	  $('#div-feedback').show();
	  setEventId();
	  
	}
}

function setEventId() {
	// get eventid
	
	var qIndex = window.location.search.indexOf("=");
	if(qIndex > -1) {
		var eventId = window.location.search.slice(qIndex + 1);
		$('#event_ref').attr('value', eventId);
	}
}

function showFeedback() {
	
	// get eventid
	
	var qIndex = window.location.search.indexOf("=");
	if(qIndex > -1) {
		var eventId = window.location.search.slice(qIndex + 1);
		
		// make ajax call to get list of feedback for this event
		$.ajax({
			method: "GET",
			url: "/feedback/" + eventId,
			success: function(results) {
				
				var htmlStr = "";
				
				for(var i = 0; i < results.length; i++) {
					var fb = results[i];
										
					htmlStr += "<p>sentiment: " + fb.sentiment + "; commentary: " + fb.commentary + "</p>";
					
				}
								
				$('#div-display-feedback').append(htmlStr);
				
			}
		});
	
	}

	

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