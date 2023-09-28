import React from 'react';
import timezones from '../shared/timezones.json';
import moment from 'moment-timezone';

function FullTimezoneList() {
  React.useEffect(() => {
    const table = document.getElementById('table-timezones');

    if (table) {
      const theadInner = timezones
        .flatMap(timezone => {
          return Object.keys(timezone);
        })
        .filter(function (elem, index, self) {
          return index === self.indexOf(elem);
        })
        .map(str => `<th>${str}</th>`)
        .join('');

      table.querySelector('thead').innerHTML = `<tr>${theadInner}<th>clock</th><th>moment-timezone</th></tr>`;

      const tbodyInner = timezones
        .map(timezone => {
          return `<tr><td>${timezone.value}</td><td>${timezone.abbr}</td><td>${timezone.offset}</td><td>${
            timezone.isdst
          }</td><td>${timezone.text}</td><td>${timezone.utc
            .map(zone => {
              return `<li>${zone}</li>`;
            })
            .join('')}</td><td>${timezone.utc
            .map(zone => {
              return `<li><span timezone="${zone}">${moment().tz(zone).format()}</span></li>`;
            })
            .join('')}</td><td>${timezone.utc
            .map(zone => {
              return `<li><code code="${zone}">moment().tz("${zone}").format()</code></li>`;
            })
            .join('')}</td></tr>`;
        })
        .join('');

      table.querySelector('tbody').innerHTML = tbodyInner;
    }
  });
  return (
    <section className="mx-auto p-2">
      <h2>World-wide timezone</h2>
      <p>
        all timezone format for <kbd>moment-timezone</kbd>. But, you need import <kbd>moment-timezone</kbd>
      </p>
      <pre>
        <code className="language-typescript">{`import moment from 'moment-timezone'; // const moment = require('moment-timezone');`}</code>
      </pre>
      <div className="table-responsive">
        <table className="table" id="table-timezones">
          <thead></thead>
          <tbody></tbody>
        </table>
      </div>
    </section>
  );
}

export default FullTimezoneList;
