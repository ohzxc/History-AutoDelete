//Fills the popup page
function fillPopup(tabs) {
    var activeTab = tabs[0];
	hostUrl = page.getHostname(activeTab.url);
	//Sets the Host site placeholder
	document.getElementById("hostwebsite").innerHTML = hostUrl;
	//Sets the checkbox depending on the if it exists in the set
	if(page.hasHost(hostUrl)) {
		switchToAutoDelete.checked = true; 
	} else {
		switchToAutoDelete.checked = false; 
	}
	
}


//Initialize variables
var hostUrl;
var switchToAutoDelete = document.getElementById("switch1");
var page = browser.extension.getBackgroundPage();
browser.tabs.query({currentWindow: true, active: true})
.then(fillPopup);


//Checkbox Event Handling
switchToAutoDelete.addEventListener("click", function() {
	if(switchToAutoDelete.checked) {
		page.addURL(hostUrl);
	} else {
		page.removeURL(hostUrl);
		
	}
});

//Setting Click Handling
document.getElementById("settings").addEventListener("click", function() {
	browser.runtime.openOptionsPage();
});

//Handler for clearing the history but will not be used because of #1
// function clearAll(e) {
// 	getActiveTab().then((tabs) => {
// 		if (!hostUrl) {
//       // Don't try and delete history when there's no hostname.
//       return;
//   }

//     // Search will return us a list of histories for this domain.
//     // Loop through them and delete them one by one.
//     var searchingHistory = browser.history.search({text: hostUrl})
//     searchingHistory.then((results) => {
//     	for (k = 0; k < results.length; k++) {
//     		browser.history.deleteUrl({url: results[k].url});
//     	}
//     }
//     );
// });
// 	e.preventDefault();
// }

//document.getElementById('clear').addEventListener('click', clearAll);