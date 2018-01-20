/**
 * Created by LKovari on 2/5/2016.
 **/

(function() {

/**
 * markDiv - mark a div with a red border
 * @param elem
 */
var markDiv = function(elem) {
    elem = elem || event;
    var target = eventUtility.getTarget(elem);
    this.style.border = "2px solid red";
    alert("Target = " + target.className + ", this = " + this.className);
    this.style.backgroundColor = '';
    this.style.border = '';
};

// controlling event dispatch mode
var isUseCapturing = true;

// get each radio buttons
var radioBubbling = document.getElementById('radioBubbling');
var radioCapturing = document.getElementById('radioCapturing');

/**
 * radioClick - called when clicked to radio button
 * @param elem
 */
var radioClick = function(elem) {
    // remove previous listener
    removeListeners(isUseCapturing);
    if (radioBubbling.checked) {
        isUseCapturing = false;
    }
    else if (radioCapturing.checked) {
        isUseCapturing = true;
    }
    // add new listener
    addListeners(isUseCapturing);
};


/*
var d1 = document.getElementById("box1"),
    d2 = document.getElementById("box2");
    d3 = document.getElementById("box3");

    eventUtility.addEvent(d1, "click", hightLight(d1), false);
    eventUtility.addEvent(d2, "click", hightLight(d2), false);
    eventUtility.addEvent(d3, "click", hightLight(d3), false);
*/

// add radioClick event listeners
eventUtility.addEvent(radioBubbling, "click", radioClick, true);
eventUtility.addEvent(radioCapturing, "click", radioClick, true);

/**
 * Add listeners to the div
 * @param useCapturing
 */
function addListeners(useCapturing) {
    // get all div in list
    var divList = document.getElementsByTagName('div');
    // set event to each div
    for(var i = 0, len = divList.length; i < len; i++) {
        var element = divList[i];
        eventUtility.addEvent(element, "click", markDiv, useCapturing);
    }
};

/**
 * Remove listeners from div
 */
function removeListeners(useCapturing) {
    // get all div in list
    var divList = document.getElementsByTagName('div');
    // set event to each div
    for(var i = 0, len = divList.length; i < len; i++) {
        var element = divList[i];
        eventUtility.removeEvent(element, "click", markDiv, useCapturing);
    }
};

// initially use capturing
addListeners(isUseCapturing);

}());