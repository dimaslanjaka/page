import 'bootstrap/dist/css/bootstrap.css';
import '@popperjs/core/dist/umd/popper.min.js';
import 'bootstrap/dist/js/bootstrap.min.js';

document.querySelectorAll('.dropdown-toggle').forEach(item => {
  item.addEventListener('click', event => {
    console.log('click dropdown');
    if (event.target.classList.contains('dropdown-toggle')) {
      event.target.classList.toggle('toggle-change');
    } else if (event.target.parentElement.classList.contains('dropdown-toggle')) {
      event.target.parentElement.classList.toggle('toggle-change');
    }
  });
});
