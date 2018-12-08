window.addEventListener("DOMContentLoaded", function(e) {
  // ノーダルを作成します。
  var nodalIsThisSite = document.getElementById("nodal-is-this-site");
  var nodalSiteDiscription = new Nodal(
    document.getElementById("nodal-site-dispriction")
  );
  nodalIsThisSite.addEventListener("click", function(event) {
    nodalSiteDiscription.show();
    scrollOff();
    return false;
  });
  /*
  var nodalWhoAmI = document.getElementById("nodal-who-am-i");
  var nodalProfile = new Nodal(
    document.getElementById("nodal-nozomi-hosaka-dispriction")
  );
  nodalWhoAmI.addEventListener("click", function() {
    nodalProfile.show();
    scrollOff();
    return false;
  });
  */

  // ノーダルにクリックイベントを登録します。
  var nodalElements = document.getElementsByClassName("nodal");
  Object.keys(nodalElements).forEach(key => {
    nodalElements[key].addEventListener("click", function() {
      console.log("Nodal click.");
    });
  });

  // ノーダルの解除のために全体のクリックイベントを登録します。
  document.addEventListener("click", function(event) {
    var targetElement = event.target.closest(".nodal");
    if (!targetElement) {
      // ノーダル以外をクリックした時
      if (event.target.getAttribute("nodal") == null) {
        // ノーダルリンクではない
        nodalSiteDiscription.hide();
        // nodalProfile.hide();
        scrollOn();
      }
    }
  });
});

class Nodal {
  constructor(targetNodal) {
    this.targetNodal = targetNodal;
    this.title = "";
    this.body = "";
    this.titleDiv = document.createElement("div");
    this.bodyDiv = document.createElement("div");
    this.buttonDiv = document.createElement("div");
    this.createContent();
    this.createButton();
  }
  setTitle() {
    if (
      this.targetNodal.getAttribute("title") == null ||
      this.targetNodal.getAttribute("title") == ""
    ) {
      return;
    }
    this.title = this.targetNodal.getAttribute("title");
  }
  setBody() {
    if (
      this.targetNodal.innerHTML == null ||
      this.targetNodal.innerHTML == ""
    ) {
      return;
    }
    var content = this.targetNodal.innerHTML;
    this.targetNodal.innerHTML = "";
    this.body = content;
  }
  createContent() {
    this.setTitle();
    this.setBody();
    if (this.title != "") {
      this.createTitle();
    }
    if (this.body != "") {
      this.createBody();
    }
  }
  createTitle() {
    this.titleDiv.classList.add("nodal-title");
    this.titleDiv.textContent = this.title;
    this.targetNodal.appendChild(this.titleDiv);
  }
  createBody() {
    this.bodyDiv.innerHTML = this.body;
    this.targetNodal.appendChild(this.bodyDiv);
  }
  createButton() {
    var ok = this.targetNodal.getAttribute("ok");
    if (ok != null) {
      this.buttonDiv.classList.add("nodal-button-container");
      var closeButton = document.createElement("a");
      closeButton.setAttribute("href", "#");
      closeButton.setAttribute("onclick", "return false;");
      closeButton.classList.add("primary");
      closeButton.classList.add("text-md");
      closeButton.textContent = ok;
      closeButton.style.width = 100;
      closeButton.addEventListener("click", function() {
        this.hide();
      }.bind(this));
      this.buttonDiv.appendChild(closeButton);
      this.targetNodal.appendChild(this.buttonDiv);
    }
  }
  show() {
    this.targetNodal.classList.add("show");
    document.body.classList.add("shadow");
  }
  hide() {
    this.targetNodal.classList.remove("show");
    document.body.classList.remove("shadow");
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
