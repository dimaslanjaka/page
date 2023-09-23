import * as cookies from '../../utils/cookie';

(function () {
  // save cookie
  $('#create').on('submit', function (e) {
    e.preventDefault();
    // var form = $(this);
    // var url = form.attr('action');
    var data = $(this).serialize().split('&');
    // console.log(data);
    var obj = {};
    for (var key in data) {
      console.log(data[key]);
      obj[data[key].split('=')[0]] = data[key].split('=')[1];
    }
    cookies.setCookie(`cookie_${obj.name}`, obj.value, 60);
    //console.log(obj);
  });

  // get unique id
  if (!cookies.getCookie('___current_id')) {
    cookies.setCookie(
      '___current_id',
      Math.random()
        .toString(36)
        .substring(2, 7 + 2),
      3,
    );
  }
  document.getElementById('uniqueHash').textContent = cookies.getCookie('___current_id');

  $('#deleteAllCookie').on('click', function (e) {
    e.preventDefault();
    cookies.deleteAllCookies();
  });

  // console.clear();
  var browserData = {};
  $.get('https://www.cloudflare.com/cdn-cgi/trace', function (data) {
    const object1 = data.split('\n');
    object1.forEach(element => {
      var key = element.split('=')[0];
      var value = element.split('=')[1];
      //console.log(key, value);
      browserData[key] = value;
    });
    //console.log(browserData);
  });

  // auto update pretext
  setInterval(() => {
    var tobeprinted = getCookies();
    tobeprinted.localStorageAvailable = localStorageAvailable();
    tobeprinted.userAgent = navigator.userAgent;
    tobeprinted.ip = browserData.ip;
    $('#allcookies').text(JSON.stringify(tobeprinted, null, 4));
  }, 1000);
})();

function getCookies() {
  var pairs = document.cookie.split(';');
  var cookies = {};
  for (var i = 0; i < pairs.length; i++) {
    var pair = pairs[i].split('=');
    cookies[(pair[0] + '').trim()] = unescape(pair.slice(1).join('='));
  }
  return cookies;
}

function localStorageAvailable() {
  var test = 'test';
  try {
    localStorage.setItem(test, test);
    localStorage.removeItem(test);
    return true;
  } catch (e) {
    return false;
  }
}
