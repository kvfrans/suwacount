// chrome.storage.local.get([video_id], function(items){
//     console.log(video_id + " " + JSON.stringify(items));
//     if(JSON.stringify(items) == "{}") {
//         var setdict = {};
//         setdict[video_id] = 1;
//         chrome.storage.local.set(setdict, function(){
//             console.log("it doesnt exist.");
//             chrome.storage.local.get(video_id, function(items){ console.log(JSON.stringify(items))})
//         });
//     }
//     else {
//         var setdict = {};
//         setdict[video_id] = items[video_id] + 1;
//         chrome.storage.local.set(setdict, function(){
//             console.log(items[video_id] + 1);
//         });
//     }
// });


chrome.storage.local.get(null, function(items) {
    // Create items array
    var items2 = Object.keys(items).map(function(key) {
      return [key, items[key]];
    });
    console.log(items2[0]);
    var i = items2.length;
    while (i--) {
        if (items2[i][0].includes("name")) {
            items2.splice(i, 1);
        }
    }
    console.log(items2);

    // Sort the array based on the second element
    items2.sort(function(first, second) {
      return second[1] - first[1];
    });

    for(var i = 0; i < items2.length; i++) {
        var p = document.createElement('span');

        document.body.appendChild(p);

        var a = document.createElement('span');
        a.appendChild(document.createTextNode(items2[i][1]+" times viewed by me "));
        a.style.color = "grey";
        if(items2[i][0]+"name" in items) {
            // a.appendChild(document.createTextNode("[ " + items[items2[i][0]+"name"]));
            p.appendChild(document.createTextNode(items[items2[i][0]+"name"]));
        }
        else {
            p.appendChild(document.createTextNode("[Title not found]"));
        }
        p.appendChild(document.createElement("br"));

        a.title = "?";
        a.href = "https://www.youtube.com/watch?v="+items2[i];
        document.body.appendChild(a);

        var ar = document.createElement('a');
        ar.appendChild(document.createTextNode("[view]"));
        ar.title = "?";
        ar.href = "https://www.youtube.com/watch?v="+items2[i];
        ar.appendChild(document.createElement("br"));
        ar.appendChild(document.createElement("br"));
        document.body.appendChild(ar);

    }
});
