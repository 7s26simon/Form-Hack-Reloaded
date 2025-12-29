function hasClass(element, cls) {
    return (' ' + element.className + ' ').indexOf(' ' + cls + ' ') > -1;
}

function applyHiddenFields(enabled) {
    let code = `
        function hasClass(a,b){
            return(" "+a.className+" ").indexOf(" "+b+" ")>-1;
        }
        for(var arr=document.getElementsByTagName("input"),form_hacked="form_hacked",i=0;i<arr.length;i++){
            if(hasClass(arr[i],form_hacked)){
    `;
    
    if (!enabled) {
        code += `
                arr[i].setAttribute("type","hidden");
                var elem = document.getElementById("explainText");
                if(elem) elem.remove();
                arr[i].classList.remove("form_hacked");
        `;
    }
    
    code += `
            } else if(arr[i].type==="hidden"){
    `;
    
    if (enabled) {
        code += `
                arr[i].setAttribute("type","text");
                arr[i].classList.add("form_hacked");            
                var explainText = arr[i].getAttribute("name") || arr[i].id || "(not-set)";
                arr[i].insertAdjacentHTML("beforebegin", '<div id="explainText" style="color: gray;display: block;z-index: 999;">' + explainText + ':</div>');
        `;
    }
    
    code += `
            }
        }
    `;
    
    chrome.tabs.executeScript({code: code});
}

chrome.browserAction.onClicked.addListener(function(tab) {
    chrome.storage.local.get(['enabled'], function(result) {
        let enabled = !(result.enabled || false);
        chrome.storage.local.set({enabled: enabled}, function() {
            applyHiddenFields(enabled);
        });
    });
});
