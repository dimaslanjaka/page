import moment from 'moment-timezone';
import React from 'react';

export function Clock() {
  React.useEffect(() => {
    // clock live
    setInterval(clock_update, 1000);
  });

  return (
    <section className="mx-auto p-2">
      <div className="table-responsive">
        <table className="table table-striped">
          <thead>
            <tr>
              <td>London</td>
              <td>Sydney</td>
              <td>Beijing</td>
              <td>Tokyo</td>
              <td>San Francisco</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <div className="clock" id="london"></div>
                <br />
              </td>
              <td>
                <div className="clock" id="sydney"></div>
                <br />
              </td>
              <td>
                <div className="clock" id="beijing"></div>
                <br />
              </td>
              <td>
                <div className="clock" id="tokyo"></div>
                <br />
              </td>
              <td>
                <div className="clock" id="la"></div>
                <br />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  );
}

function clock_update() {
  const london = moment.tz('Europe/London').format('MMMM Do YYYY, h:mm:ss a');
  const sydney = moment.tz('Australia/Sydney').format('MMMM Do YYYY, h:mm:ss a');
  const beijing = moment.tz('Asia/Shanghai').format('MMMM Do YYYY, h:mm:ss a');
  const tokyo = moment.tz('Asia/Tokyo').format('MMMM Do YYYY, h:mm:ss a');
  const la = moment.tz('America/Los_Angeles').format('MMMM Do YYYY, h:mm:ss a');

  document.querySelector('#london').textContent = london;
  document.querySelector('#sydney').textContent = sydney;
  document.querySelector('#beijing').textContent = beijing;
  document.querySelector('#tokyo').textContent = tokyo;
  document.querySelector('#la').textContent = la;
}
