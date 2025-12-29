// Auto-apply on page load based on stored state
chrome.storage.local.get(['enabled'], function(result) {
    if (result.enabled) {
        let code = `
            function hasClass(a,b){
                return(" "+a.className+" ").indexOf(" "+b+" ")>-1;
            }
            for(var arr=document.getElementsByTagName("input"),form_hacked="form_hacked",i=0;i<arr.length;i++){
                if(arr[i].type==="hidden" && !hasClass(arr[i],form_hacked)){
                    arr[i].setAttribute("type","text");
                    arr[i].classList.add("form_hacked");            
                    var explainText = arr[i].getAttribute("name") || arr[i].id || "(not-set)";
                    arr[i].insertAdjacentHTML("beforebegin", '<div id="explainText" style="color: gray;display: block;z-index: 999;">' + explainText + ':</div>');
                }
            }
        `;
        eval(code);
    }
});
