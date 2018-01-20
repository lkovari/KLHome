/**
 * Created by LKovari on 2/5/2016.
 */

var eventUtility = {
addEvent : function (el, type, fn, isBubbling) {

    if (typeof addEventListener !== "undefined") {
        // standard IE
        el.addEventListener(type, fn, isBubbling);
    }
    else if (typeof attachEvent !== "undefined") {
        // Legacy IE
        el.attachEvent("on" + type, fn);
    }
    else {
        el["on" + type] = fn;
    }

};

removeEvent : function(el, type, fn) {

    if (typeof removeEventListener !== "undefined") {
        // standard IE
        el.removeEventListener(type, fn, false);
    }
    else if (typeof detachEvent !== "undefined") {
        // Legacy IE
        el.detachEvent("on" + type, fn);
    }
    else {
        el["on" + type] = fn;
    }

};

getTarget : function(event) {
    if (typeof event.target !== "undefined") {
        return event.target;
    }
    else {
        return event.srcElement;
    }
};

preventDefault : function(event) {
    if (typeof event.preventDefault !== "undefined") {
        event.preventDefault();
    }
    else {
        event.returnValue = false;
    }
}
};