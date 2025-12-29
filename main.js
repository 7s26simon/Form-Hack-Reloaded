function applyHiddenFields(enabled) {
    chrome.tabs.executeScript({
        code: `
            function hasClass(a,b){
                return(" "+a.className+" ").indexOf(" "+b+" ")>-1
            }
            for(var arr=document.getElementsByTagName("input"),form_hacked="form_hacked",i=0;i<arr.length;i++){
                if(hasClass(arr[i],form_hacked)){
                    ${enabled ? '' : `
                        arr[i].setAttribute("type","hidden");
                        let elem = document.getElementById("explainText");
                        if(elem) elem.remove();
                        arr[i].classList.remove("form_hacked");
                    `}
                } else if(arr[i].type==="hidden"){
                    ${enabled ? `
                        arr[i].setAttribute("type","text");
                        arr[i].classList.add("form_hacked");            
                        let explainText = arr[i].getAttribute("name") || arr[i].id || "(not-set)";
                        arr[i].insertAdjacentHTML("beforebegin", "<div id='explainText' style='color: gray;display: block;z-index: 999; '>" + explainText + ":</div>");
                    ` : ''}
                }
            }
        `
    });
}

chrome.browserAction.onClicked.addListener(function(tab) {
    chrome.storage.local.get(['enabled'], function(result) {
        let enabled = !result.enabled;
        chrome.storage.local.set({enabled: enabled}, function() {
            applyHiddenFields(enabled);
        });
    });
});
