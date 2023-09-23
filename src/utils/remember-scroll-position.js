/* remember scroll position start - https://stackoverflow.com/a/65746118 */

window.onbeforeunload = function () {
  var scrollPos;
  if (typeof window.pageYOffset != 'undefined') {
    scrollPos = window.pageYOffset;
  } else if (typeof document.compatMode != 'undefined' && document.compatMode != 'BackCompat') {
    scrollPos = document.documentElement.scrollTop;
  } else if (typeof document.body != 'undefined') {
    scrollPos = document.body.scrollTop;
  }
  document.cookie = 'scrollTop=' + scrollPos + 'URL=' + window.location.href;
};

window.onload = function () {
  if (document.cookie.includes(window.location.href)) {
    if (document.cookie.match(/scrollTop=([^;]+)(;|$)/) != null) {
      var arr = document.cookie.match(/scrollTop=([^;]+)(;|$)/);
      document.documentElement.scrollTop = parseInt(arr[1]);
      document.body.scrollTop = parseInt(arr[1]);
    }
  }
};
