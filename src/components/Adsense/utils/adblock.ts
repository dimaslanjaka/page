import 'src/utils/promise';

/**
 * @link {@url https://www.webmanajemen.com/assets/adblock-notify/}
 */
class adblock {
  /**
   * inject adblock dynamically
   */
  inject() {
    this.html();

    const ykrd1 = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    const ykrd2 = Math.random().toString(36).substring(2, 7);
    const adblockWrapper = document.getElementById('ykth');
    if (adblockWrapper instanceof HTMLElement) {
      adblockWrapper.setAttribute('id', ykrd1);
      if (!adblockWrapper.hasAttribute('class')) {
        adblockWrapper.setAttribute('class', '');
      }
      adblockWrapper.classList.add('ykwrp_' + ykrd2);
    }

    this.ajaxMethod().then(hideNotifAdblock).catch(showNotifAdblock);

    // make popup closable
    const closeId = document.getElementById('close-notif');
    if (closeId) {
      closeId.addEventListener('click', hideNotifAdblock);
    }

    function hideNotifAdblock() {
      const el = document.getElementById(ykrd1);
      el && el.classList.add('ykth-hide');
    }
    function showNotifAdblock() {
      const el = document.getElementById(ykrd1);
      el && el.classList.remove('ykth-hide');
    }
  }

  scriptMethod() {
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.id = 'adblock-script-test';
      script.async = !0;
      script.src = '//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js';
      script.onerror = function () {
        window.adblock = !0;
        console.log('adblock enabled');
        document.querySelector('#adblock-script-test').remove();
        reject(new Error('adblock enabled'));
      };
      script.onload = function () {
        console.log('adblock disabled');
        document.querySelector('#adblock-script-test').remove();
        resolve(null);
      };
      const firstScript = document.getElementsByTagName('script')[0];
      firstScript.parentNode.insertBefore(script, firstScript);
    });
  }

  ajaxMethod() {
    return new Promise((resolve, reject) => {
      fetch('//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js', {
        method: 'HEAD',
        mode: 'no-cors',
        credentials: 'include'
      })
        .then(response => response.text())
        .then(_response => {
          console.log('adblock disabled');
          resolve(null);
        })
        .catch(() => {
          console.log('adblock enabled');
          reject(new Error('adblock enabled'));
        });
    });
  }

  html() {
    const adblockElements = `<div id="ykth" class="ykth-hide">
    <div class="ykth-inner">
      <div class="ykth-head">
        <svg style="width: 30px; height: 30px" viewBox="0 0 26 26">
          <path
            fill="#FFFFFF"
            d="M13,13H11V7H13M12,17.3A1.3,1.3 0 0,1 10.7,16A1.3,1.3 0 0,1 12,14.7A1.3,1.3 0 0,1 13.3,16A1.3,1.3 0 0,1 12,17.3M15.73,3H8.27L3,8.27V15.73L8.27,21H15.73L21,15.73V8.27L15.73,3Z" />
        </svg>
        <b>Adblock Detect</b>
        <p>We have detected that you are using adblock in your browser</p>
        <i class="close" id="close-notif">&#215;</i>
      </div>
      <div class="ykth-body">
        <p>
          Our website is made possible by displaying online advertisements to our
          visitors.
        </p>
        <p>Please consider supporting us by disabling your ad blocker.</p>
      </div>
      <!-- Start Condition When JS Disable -->
      <noscript>
        <div class="ykth-body">
          <p>Javascript is disabled in your web browser.</p>
          <p>
            For full functionality of this site it is necessary to enable
            JavaScript. Here are the
            <a
              href="https://www.enable-javascript.com/"
              target="_blank"
              rel="nofollow noopener noreferer">
              instructions how to enable JavaScript in your web browser</a
            >.
          </p>
        </div>
        <style>
          #ykth {
            display: block !important;
          }

          .ykth-inner > .ykth-body {
            display: none;
          }

          .ykth-head > b,
          .ykth-head > p {
            font-size: 0;
          }

          .ykth-head > b:before {
            content: 'Javascript Detected';
            font-size: 16px;
          }

          .ykth-head > p:before {
            content: 'We have detected that you are disable javascript in your browser';
            font-size: 14px;
          }
        </style>
      </noscript>
      <!-- End Condition When JS Disable -->
    </div>
  </div>`;
    document.body.innerHTML += adblockElements;
  }
}

export default adblock;
