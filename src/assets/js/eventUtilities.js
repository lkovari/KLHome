/**
 * Created by LKovari on 2/5/2016.
 */

var eventUtility = {
addEvent : function (el, type, fn, isUseCapture) {

    if (typeof addEventListener !== "undefined") {
        // standard IE
        el.addEventListener(type, fn, isUseCapture);
    }
    else if (typeof attachEvent !== "undefined") {
        // Legacy IE
        el.attachEvent("on" + type, fn);
    }
    else {
        el["on" + type] = fn;
    }

},

removeEvent : function(el, type, fn, isUseCapture) {

    if (typeof removeEventListener !== "undefined") {
        // standard IE
        el.removeEventListener(type, fn, isUseCapture);
    }
    else if (typeof detachEvent !== "undefined") {
        // Legacy IE
        el.detachEvent("on" + type, fn);
    }
    else {
        el["on" + type] = fn;
    }

},

getTarget : function(event) {
    if (typeof event.target !== "undefined") {
        return event.target;
    }
    else {
        return event.srcElement;
    }
},

preventDefault : function(event) {
    if (typeof event.preventDefault !== "undefined") {
        event.preventDefault();
    }
    else {
        event.returnValue = false;
    }
}
};



