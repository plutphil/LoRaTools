
var characterslower = "0123456789abcdef";
var charactersupper = "0123456789ABCDEF";

function generateRandomHex(length,characters) {
var result = "";

for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
}

return result;
}
count = document.getElementById("count");
outtextarea = document.getElementById("outtextarea");
copymesg = document.getElementById("copymesg");
const splitpairs = (str)=>{
    pairs = [];
    while(str.length>0){
        pairs.push(str.substring(0, 2));
        str= str.substring(2);
    }
    return pairs;
}
numbers = []
lastcount = 0;
const update = ()=>{
    outtextarea.value="";
    for(let i = numbers.length; i < count.value; i++){
        var devEUI = generateRandomHex(16,charactersupper);
        var appKey = generateRandomHex(32,charactersupper);
        numbers.push([devEUI, appKey]);
    }
    if(document.getElementById("radio_ccpp").checked){
        for(let i = 0; i < count.value; i++){
            outtextarea.value += "{ "+"0x"+splitpairs(numbers[i][0]).join(", 0x") +" }"+"\n";
            outtextarea.value += "{ "+"0x"+splitpairs(numbers[i][1]).join(", 0x") +" }"+"\n";
        }
    }else if(document.getElementById("radio_json").checked){
        jsonarray = []
        for(let i = 0; i < count.value; i++){
            jsonarray.push({
                "deveui":numbers[i][0],
                "appkey":numbers[i][1]
            });
        }
        outtextarea.value = JSON.stringify(jsonarray,null,2);
    }else{
        for(let i = 0; i < count.value; i++){
            outtextarea.value += numbers[i][0] +"\n";
            outtextarea.value += numbers[i][1] +"\n";
        }
    }
}
update();
function saveTextAsFile(textToWrite, fileNameToSaveAs)
{
    var textFileAsBlob = new Blob([textToWrite], {type:'text/plain'}); 
    var downloadLink = document.createElement("a");
    downloadLink.download = fileNameToSaveAs;
    downloadLink.innerHTML = "Download File";
    if (window.webkitURL != null) {
        // Chrome allows the link to be clicked without actually adding it to the DOM.
        downloadLink.href = window.webkitURL.createObjectURL(textFileAsBlob);
      } else {
        // Firefox requires the link to be added to the DOM before it can be clicked.
        downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
        downloadLink.onclick = destroyClickedElement;
        downloadLink.style.display = "none";
        document.body.appendChild(downloadLink);
      }

    downloadLink.click();
}
const dltxt = ()=>{
    saveTextAsFile(outtextarea.value,"EUIsandAppKeys.txt");
};
const copyclipboard = ()=>{
    navigator.clipboard.writeText(outtextarea.value);
    copymesg.innerText = "Copied to clipboard!";
    setTimeout(()=>{
        copymesg.innerText = "";
    },2000);
};

einput = document.getElementById("einput");
eoutput = document.getElementById("eoutput");
const updateendianness = ()=>{
    eoutput.value="";
    einput.value.split("\n").forEach(e=>{
        eoutput.value+=splitpairs(e).reverse().join("")+"\n";
    });
}