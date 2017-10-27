

function List_select() {
    var head_list = document.getElementsByClassName('head_list')[0].getElementsByTagName("a");
    if (window.location.pathname === '/'||window.location.pathname.indexOf('block')!==-1) {
        head_list[0].setAttribute("class", "select");
    }else if(window.location.pathname.indexOf('service')!==-1){
        head_list[1].setAttribute("class", "select");
    }

}
function errorShow(event) {
    event.parentNode.childNodes[1].setAttribute("class", "toolTips toolTips_show");
    // event.parentNode.childNodes[1].style.display= "block";
}
function errorHide(event) {
    event.parentNode.childNodes[1].setAttribute("class", "toolTips toolTips_hide");
    // / event.parentNode.childNodes[1].style.display= "none";
}

window.onload = function () {
    List_select();
}

