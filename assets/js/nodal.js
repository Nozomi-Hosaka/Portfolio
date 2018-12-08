class Nodal {
  constructor() {
    this.isShow = false;
  }
  show(id) {
    var targetNodal = document.getElementById(id);
    targetNodal.classList.add("show");
    document.body.classList.add("shadow");
    this.isShow = true;
  }
  hide(id) {
    var targetNodal = document.getElementById(id);
    targetNodal.classList.remove("show");
    document.body.classList.remove("shadow");
    this.isShow = false;
  }
  createTitle(obj) {
    var title = obj.getAttribute("title");
    console.log(title);
    var titleElement = obj.createElement("div");
    titleElement.textContent = title;
  }
}
var g_e = function(e) {
  e.preventDefault();
};
function scrollOff() {
  var scroll_event =
    "onwheel" in document
      ? "wheel"
      : "onmousewheel" in document
      ? "mousewheel"
      : "DOMMouseScroll";
  document.addEventListener(scroll_event, g_e);
  document.addEventListener("touchmove.noScroll", g_e);
}
function scrollOn() {
  var scroll_event =
    "onwheel" in document
      ? "wheel"
      : "onmousewheel" in document
      ? "mousewheel"
      : "DOMMouseScroll";
  document.removeEventListener(scroll_event, g_e);
  document.removeEventListener(".noScroll", g_e);
}

window.addEventListener("DOMContentLoaded", function(e) {
  console.log("Init Nodal.");
  var nodal = new Nodal();
  var nodalIsThisSite = document.getElementById("nodal-is-this-site");
  var nodalElements = document.getElementsByClassName("nodal");
  Object.keys(nodalElements).forEach(key => {
    nodalElements[key].addEventListener("click", function() {
      console.log("Nodal click.");
    });
  });

  document.addEventListener("click", function(event) {
    var targetElement = event.target.closest(".nodal");
    if (!targetElement) {
      // ノーダル以外をクリックした時
      if (event.target.getAttribute("nodal") == null) {
        // ノーダルリンクではない
        if (nodal.isShow) {
          nodal.hide("nodal-site-dispriction");
          scrollOn();
        }
      }
    }
  });
  nodalIsThisSite.addEventListener("click", function(event) {
    if (nodal.isShow == false) {
      nodal.show("nodal-site-dispriction");
      scrollOff();
    }
  });
});
