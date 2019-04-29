// alert("suwa surprise");

var prevtime = new Date().getTime();
var previd = "lol";
chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    url = tab.url;
    if(url.indexOf("youtube.com") != -1 && url.indexOf("v=" != -1)) {
        var video_id = url.split('v=')[1];
        var ampersandPosition = video_id.indexOf('&');
        if(ampersandPosition != -1) {
          video_id = video_id.substring(0, ampersandPosition);
        }
        if(previd != video_id || new Date().getTime() - prevtime > 3000) {
            previd = video_id;
            prevtime = new Date().getTime();
            chrome.storage.local.get([video_id], function(items){
                console.log(video_id + " " + JSON.stringify(items));
                console.log(tab.title);
                if(JSON.stringify(items) == "{}") {
                    var setdict = {};
                    setdict[video_id] = 1;
                    chrome.storage.local.set(setdict, function(){
                        console.log("it doesnt exist.");
                        chrome.storage.local.get(video_id, function(items){ console.log(JSON.stringify(items))})
                    });
                }
                else {
                    var setdict = {};
                    setdict[video_id] = items[video_id] + 1;
                    chrome.storage.local.set(setdict, function(){
                        console.log(items[video_id] + 1);
                    });
                }
            });
        }
        chrome.storage.local.get([video_id], function(items){
            var setdict = {};
            setdict[video_id+"name"] = tab.title;
            chrome.storage.local.set(setdict, function(){
            });
        });
    }
});
