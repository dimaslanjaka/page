//import 'bootstrap/dist/css/bootstrap.css';

export function initDropdown() {
  document.querySelectorAll('.dropdown-toggle').forEach(item => {
    item.addEventListener('click', event => {
      console.log('click dropdown');
      /** @type {HTMLElement} */
      let el = event.target;
      if (el.parentElement.classList.contains('dropdown-toggle')) {
        el = el.parentElement;
      }

      el.classList.toggle('toggle-change');
      if (el.classList.contains('toggle-change')) {
        el.classList.toggle('show');
        el.setAttribute('aria-expanded', 'true');
      } else {
        el.setAttribute('aria-expanded', 'false');
      }

      let menu = el.closest('.dropdown-menu');
      if (!menu) {
        menu = el.parentElement.querySelector('.dropdown-menu');
      }
      if (menu) {
        menu.classList.toggle('show');
      }
    });
  });
}

export async function loadBootstrapModule() {
  await import('@popperjs/core/dist/umd/popper.min.js');
  await import('bootstrap/dist/js/bootstrap.min.js');
}
