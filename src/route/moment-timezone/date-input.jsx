import React from 'react';
import { Adsense } from '../../components/Adsense';
import { moment_format, setDateLocalValue } from './moment-timezone';
import { copyTextToClipboard } from '../../utils';

export function DateInput() {
  React.useEffect(() => {
    const date_input = document.querySelector('input#date');
    const date_text = document.querySelector('input#date-text');
    // const pattern = document.querySelector('input#pattern');
    const result = document.querySelector('#moment-result');
    // force update date input value on-load
    setDateLocalValue(date_input, new Date());
    const formatted = moment_format(date_input.value);
    result.textContent = formatted;
    date_text.value = formatted;
  });

  let interval;

  return (
    <section>
      <div className="mx-auto p-2">
        <div className="row">
          <div className="col-md-6">
            <label htmlFor="date">Date Input</label>
            <input
              type="datetime-local"
              defaultValue="2013-10-24T20:36:00+0700"
              id="date"
              className="form-control mb-2"
              step="1"
              onChange={function (e) {
                // update date text when date input changed
                const formatted = moment_format(e.target.value);
                console.log('date input', { value: e.target.value, formatted });
                const date_text = document.querySelector('input#date-text');
                const result = document.querySelector('#moment-result');

                result.textContent = formatted;
                date_text.value = formatted;
              }}
            />
            <input
              type="text"
              name=""
              id="date-text"
              className="form-control mb-2"
              onChange={function () {
                // update date input when date text changed
                const formatted = moment_format(this.value);
                const date_input = document.querySelector('input#date');
                const result = document.querySelector('#moment-result');
                console.log('date text', { value: this.value, formatted });
                setDateLocalValue(date_input, formatted);
                result.textContent = formatted;
              }}
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="pattern">Format Pattern</label>
            <input
              type="text"
              className="form-control mb-2"
              placeholder="LLLL"
              id="pattern"
              onChange={function (e) {
                // update result when pattern changed
                const date_input = document.querySelector('input#date');
                const result = document.querySelector('#moment-result');
                const formatted = moment_format(date_input.value, e.target.value);
                result.textContent = formatted;
              }}
            />
            <input type="text" name="" id="date-timezone" defaultValue="Asia/Jakarta" className="form-control mb-2" />
          </div>
          <div className="col-6">
            <div className="btn-group" role="group" aria-label="date input control">
              <button
                id="start-interval"
                className="btn btn-sm btn-warning"
                onClick={function (e) {
                  e.preventDefault();
                  const date_input = document.querySelector('input#date');
                  const date_text = document.querySelector('input#date-text');
                  const result = document.querySelector('#moment-result');
                  if (!interval) {
                    interval = setInterval(function () {
                      const formatted = moment_format(new Date());
                      result.textContent = formatted;
                      date_text.value = formatted;
                      setDateLocalValue(date_input, formatted);
                    }, 1000);
                  }
                }}
              >
                start interval
              </button>
              <button
                id="stop-interval"
                className="btn btn-sm btn-danger"
                onClick={function (e) {
                  e.preventDefault();
                  clearInterval(interval);
                  interval = null;
                }}
              >
                stop interval
              </button>
              <button
                id="copy-moment"
                className="btn btn-sm btn-success"
                onClick={function (e) {
                  e.preventDefault();
                  const result = document.querySelector('#moment-result');
                  copyTextToClipboard(result.textContent.trim());
                }}
              >
                Copy
              </button>
            </div>
          </div>
          <div className="col-md-6">
            <span className="mr-2">Result:</span> <span id="moment-result"></span>
          </div>
        </div>
      </div>

      <Adsense client="ca-pub-2188063137129806" slot="4695444437" format="auto" widthResponsive="true" />
    </section>
  );
}
