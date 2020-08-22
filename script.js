//Default Settings
var modelId = "";
var viewerParameters = [];

updateSelectedWorkflow("Metalness");
updateSketchfabWindow(true);
function updateSketchfabWindow(forceHardRefresh) {
    //Update Model ID
    modelId = document.getElementById('modelId').value;
    if(modelId == ""){
        document.getElementById("sketchfabContainer").innerHTML = "Enter a valid sketchfab model ID to get started."
        return;
    }

    //update viewerParameters
    viewerParameters['autostart'] = (document.getElementById("autostart").checked ? 1 : 0 );
    viewerParameters['autospin'] = document.getElementById("autospin").value;
    viewerParameters['camera'] = (document.getElementById("camera").checked ? 1 : 0 );

    //Generate URL
    var viewerParameterString = "";
    Object.keys(viewerParameters).forEach(key => {
        viewerParameterString += key + "=" + viewerParameters[key]+"&";
    });
    var iframeUrl = "https://sketchfab.com/models/" + modelId + "/embed?"+viewerParameterString+"#";
    var elements = document.getElementById('materialMaps').elements;
    for (var i = 0, element; element = elements[i++];) {
        if(element.type == "url" && element.disabled == false){
            if (element.value != ""){
                iframeUrl += "material_"+element.name+"="+element.value+(document.getElementById("randomHttpParameter").checked ? "?"+Math.floor(Math.random() * 100000) : '')+",";
            }
        }
    }
    iframeUrl += "material_showcase=1,material_names="+document.getElementById('materialName').value;
    if(forceHardRefresh){
        document.getElementById("sketchfabContainer").innerHTML='<iframe id="sketchfabWindow" height="400px" width="800px"></iframe>'
    }
    document.getElementById("sketchfabWindow").src=iframeUrl;
    document.getElementById("sketchfabUrl").value=iframeUrl;
}
function updateSelectedWorkflow(workflow){
    if(workflow == "Metalness"){
        document.getElementById("specular").value="";
        document.getElementById("specular").disabled = true;
        document.getElementById("metalness").disabled = false;
        updateSketchfabWindow(true);
    }
    if(workflow == "Specular"){
        document.getElementById("metalness").value="";
        document.getElementById("metalness").disabled = true;
        document.getElementById("specular").disabled = false;
        updateSketchfabWindow(true);
    }
}