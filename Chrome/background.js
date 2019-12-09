// Listen to contextMenu when selected
chrome.contextMenus.onClicked.addListener(contextMenuAction);

//More info - https://developer.chrome.com/extensions/contextMenus#event-onClicked
function contextMenuAction(info, tab){
	if(info != null){
    var correctSelenoidURL = extractSessionId(info.linkUrl);
    var req = new XMLHttpRequest;
    req.open("DELETE",correctSelenoidURL , true);
    req.onreadystatechange = function() {
    if (req.readyState == 4) {
            if(req.status!=200){
                alert("Requested url: " +correctSelenoidURL+ "\n" + "HTTP Status Code: "+req.status);      
                alert("Raw response data: "+ "\n" +req.responseText);
            }
        }
    }   
    req.send();
	}
}


//More info - https://developer.chrome.com/extensions/contextMenus#method-create
chrome.contextMenus.create({
  title: "Close Selenoid session",
  contexts: ["link"]
});


function extractSessionId(fullUrl){
    var urlSplitted = fullUrl.split('/');
    return urlSplitted[0]+"//"+urlSplitted[2]+"/wd/hub/session/"+ fullUrl.split('/').pop();
}
