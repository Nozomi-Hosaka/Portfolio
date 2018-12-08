window.addEventListener("DOMContentLoaded", function(e) {
  // ノーダルを作成します。
  var nodalIsThisSite = document.getElementById("nodal-is-this-site");
  var nodalSiteDiscription = new Nodal(
    document.getElementById("nodal-site-dispriction")
  );
  nodalIsThisSite.addEventListener("click", function(event) {
    nodalSiteDiscription.show();
    return false;
  });

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
    this.createButton();
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
    this.bodyDiv.classList.add("nodal-body");
    this.bodyDiv.innerHTML = this.body;
    var bodyHeight =
      this.targetNodal.clientHeight -
      Dimension(this.titleDiv) -
      Dimension(this.buttonDiv) -
      50;
    this.bodyDiv.style.height = bodyHeight + "px";
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
      closeButton.classList.add("text-bg");
      closeButton.textContent = ok;
      closeButton.style.width = 100;
      closeButton.addEventListener(
        "click",
        function() {
          this.hide();
        }.bind(this)
      );
      this.buttonDiv.appendChild(closeButton);
      this.targetNodal.appendChild(this.buttonDiv);
    }
  }
  show() {
    this.targetNodal.classList.add("show");
    document.body.classList.add("shadow");
    if (this.targetNodal.clientHeight >= this.bodyDiv.scrollHeight) {
      scrollOff();
    }
  }
  hide() {
    this.targetNodal.classList.remove("show");
    document.body.classList.remove("shadow");
    if (this.targetNodal.clientHeight >= this.bodyDiv.scrollHeight) {
      scrollOn();
    }
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
function Dimension(targetObj) {
  var elmHeight,
    elmMargin,
    elm = targetObj;
  if (document.all) {
    // IE
    elmHeight = elm.currentStyle.height;
    elmMargin =
      parseInt(elm.currentStyle.marginTop, 10) +
      parseInt(elm.currentStyle.marginBottom, 10);
  } else {
    // Mozilla
    elmHeight = parseInt(
      document.defaultView.getComputedStyle(elm, "").getPropertyValue("height")
    );
    elmMargin =
      parseInt(
        document.defaultView
          .getComputedStyle(elm, "")
          .getPropertyValue("margin-top")
      ) +
      parseInt(
        document.defaultView
          .getComputedStyle(elm, "")
          .getPropertyValue("margin-bottom")
      );
  }
  return elmHeight + elmMargin;
}
