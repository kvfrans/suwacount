function getCurrentTabUrl(callback) {
// Query filter to be passed to chrome.tabs.query - see
// https://developer.chrome.com/extensions/tabs#method-query
    var queryInfo = {
        active: true,
        currentWindow: true
    };

    chrome.tabs.query(queryInfo, (tabs) => {
        // chrome.tabs.query invokes the callback with a list of tabs that match the
        // query. When the popup is opened, there is certainly a window and at least
        // one tab, so we can safely assume that |tabs| is a non-empty array.
        // A window can only have one active tab at a time, so the array consists of
        // exactly one tab.
        var tab = tabs[0];

        // A tab is a plain object that provides information about the tab.
        // See https://developer.chrome.com/extensions/tabs#type-Tab
        var url = tab.url;

        // tab.url is only available if the "activeTab" permission is declared.
        // If you want to see the URL of other tabs (e.g. after removing active:true
        // from |queryInfo|), then the "tabs" permission is required to see their
        // "url" properties.
        console.assert(typeof url == 'string', 'tab.url should be a string');

        callback(url);
    });
}

var i;

document.addEventListener('DOMContentLoaded', () => {

    var suwa = document.getElementById('suwa');
    suwa.src = chrome.extension.getURL('suwa3.png')

    var dropdown = document.getElementById('thelink');
    dropdown.innerHTML = "<a href="+chrome.extension.getURL('dashboard.html')+">See video counts</a>";

    getCurrentTabUrl((url) => {

        if(url.indexOf("youtube.com") != -1 && url.indexOf("v=" != -1)) {
            var video_id = url.split('v=')[1];
            var ampersandPosition = video_id.indexOf('&');
            if(ampersandPosition != -1) {
                video_id = video_id.substring(0, ampersandPosition);
            }
            chrome.storage.local.get([video_id], function(items){
                var dropdown = document.getElementById('thehead');
                dropdown.innerHTML = "You've watched this video <font color='red'>"+items[video_id]+"</font> times";


            });
        }

        // chrome.storage.local.set({ "phasersTo": "awesome" }, function(){});

    });

    var links = document.getElementsByTagName("a");
    for (var i = 0; i < links.length; i++) {
        (function () {
            var ln = links[i];
            var location = ln.href;
            ln.onclick = function () {
                chrome.tabs.create({active: true, url: location});
            };
        })();
    }
});
