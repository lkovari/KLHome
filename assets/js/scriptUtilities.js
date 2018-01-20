/**
 * Created by lkovari on 2016.02.07..
 */

var cssUtility;
cssUtility = {

    loadFile: function (fileName, fileType) {
        var fileRef = null;
        if (fileType == "js") {
            // if filename is an external JavaScript file
            fileRef = document.createElement('script');
            fileRef.setAttribute("type", "text/javascript");
            fileRef.setAttribute("src", fileName);
        }
        else if (fileType == "css") {
            // if filename is an external CSS file
            fileRef = document.createElement("link");
            fileRef.setAttribute("rel", "stylesheet");
            fileRef.setAttribute("type", "text/css");
            fileRef.setAttribute("href", fileName);
        }
        if (typeof fileref != "undefined") {
            document.getElementsByTagName("head")[0].appendChild(fileref);
        }
    },

    removeFile: function (fileName, fileType) {
        // determine element type to create nodelist from
        var targetElement = (fileType == "js") ? "script" : (fileType == "css") ? "link" : "none";
        // determine corresponding attribute to test for
        var targetAttr = (fileType == "js") ? "src" : (fileType == "css") ? "href" : "none";
        var allSuspects = document.getElementsByTagName(targetElement);
        // search backwards within nodelist for matching elements to remove
        for (var i = allSuspects.length; i >= 0; i--) {
            if (allSuspects[i] && allSuspects[i].getAttribute(targetAttr) != null && allSuspects[i].getAttribute(targetAttr).indexOf(fileName) != -1) {
                // remove element by calling parentNode.removeChild()
                allSuspects[i].parentNode.removeChild(allSuspects[i]);
            }
        }
    }
};

(function() {
    // load CSS dynamically
    cssUtility.loadFile("style10119bub.css", "css");
}());
