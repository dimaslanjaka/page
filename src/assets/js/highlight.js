if ("cdpn.io" == location.host) {
  console.clear();
}

document.addEventListener("DOMContentLoaded", initHljs);

// start highlight pre code
function startHighlighter(block) {
  // validate hljs
  if ("hljs" in window === false) return loadHljs();
  // fix mysql highlight
  if (block.classList.contains("language-mysql")) {
    block.classList.remove("language-mysql");
    block.classList.add("language-sql");
  }
  // start highlight pre code[data-highlight]
  if (block.hasAttribute("data-highlight")) {
    if (block.getAttribute("data-highlight") != "false") {
      // highlight on data-highlight="true"
      hljs.highlightBlock(block);
    }
  } else {
    // highlight no attribute data-highlight
    hljs.highlightBlock(block);
  }
}

function loadHljs() {
  // validate hljs already imported
  if ("hljs" in window === true) return;
  // otherwise create one
  const scr = document.createElement("script");
  scr.src =
    "//cdnjs.cloudflare.com/ajax/libs/highlight.js/11.8.0/highlight.min.js";
  scr.onload = initHljs;
  const referenceNode = document.querySelectorAll("script").item(0);
  referenceNode.parentNode.insertBefore(scr, referenceNode.nextSibling);
}

function initHljs() {
  // highlight pre code
  document.querySelectorAll("pre code").forEach(startHighlighter);

  // highlight all pre code elements
  // when use below syntax, please remove above syntax
  /*
  if ("initHighlightingOnLoad" in hljs) {
    hljs.initHighlightingOnLoad();
  } else if ("highlightAll" in hljs) {
    hljs.highlightAll();
  }
  */
}
