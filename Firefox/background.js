// Listen to contextMenu when selected
browser.contextMenus.onClicked.addListener(contextMenuAction);


function contextMenuAction(info, tab){
	if(info != null){
    var correctSelenoidURL = extractSessionId(info.linkUrl);
    console.log("Force close Selenoid session using "+correctSelenoidURL);
    var req = new XMLHttpRequest;
    req.open("DELETE",correctSelenoidURL , true);
    req.onreadystatechange = function() {
    if (req.readyState == 4) {
            if(req.status!=200){
                console.log("Requested url: " +correctSelenoidURL+ "\n" + "HTTP Status Code: "+req.status);
                browser.tabs.executeScript({code : `alert("Incorect HTTP Status Code was received")` });
                // console.log("Raw response data: "+ "\n" +req.responseText);
            }
        }
    }   
    req.send();
	}
}


browser.contextMenus.create({
  title: "Close Selenoid session",
  contexts: ["link"]
});


function extractSessionId(fullUrl){
    var urlSplitted = fullUrl.split('/');
    return urlSplitted[0]+"//"+urlSplitted[2]+"/wd/hub/session/"+ fullUrl.split('/').pop();
}

