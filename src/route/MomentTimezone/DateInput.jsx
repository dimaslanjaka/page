import React from 'react';
import Adsense from '../../components/Adsense';
import { moment_format, setDateLocalValue } from './moment-timezone';
import { copyTextToClipboard, querySelector } from '../../utils';

export function DateInput() {
  React.useEffect(() => {
    const date_input = querySelector('input#date');
    const date_text = querySelector('input#date-text');
    // const pattern = querySelector('input#pattern');
    const result = querySelector('#moment-result');
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
              name="input-date"
              onChange={function (e) {
                // update date text when date input changed
                const formatted = moment_format(e.target.value);
                console.log('date input', { value: e.target.value, formatted });
                const date_text = querySelector('input#date-text');
                const result = querySelector('#moment-result');

                result.textContent = formatted;
                date_text.value = formatted;
              }}
            />
            <label htmlFor="date-text">Text Input</label>
            <input
              type="text"
              name="input-text"
              id="date-text"
              className="form-control mb-2"
              onChange={function () {
                // update date input when date text changed
                const formatted = moment_format(this.value);
                const date_input = querySelector('input#date');
                const result = querySelector('#moment-result');
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
                const date_input = querySelector('input#date');
                const result = querySelector('#moment-result');
                const formatted = moment_format(date_input.value, e.target.value);
                result.textContent = formatted;
              }}
            />
            <label htmlFor="date-timezone">Timezone</label>
            <input
              type="text"
              name="timezone"
              id="date-timezone"
              defaultValue="Asia/Jakarta"
              className="form-control mb-2"
            />
          </div>
          <div className="col-lg-6 col-12">
            <div className="btn-group d-flex" role="group" aria-label="date input control">
              <button
                id="start-interval"
                className="btn btn-sm btn-warning"
                onClick={function (e) {
                  e.preventDefault();
                  const date_input = querySelector('input#date');
                  const date_text = querySelector('input#date-text');
                  const result = querySelector('#moment-result');
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
                  const result = querySelector('#moment-result');
                  copyTextToClipboard(result.textContent.trim());
                }}
              >
                Copy
              </button>
            </div>
          </div>
          <div className="col-lg-6 col-12">
            <span className="mr-2">Result:</span> <span id="moment-result"></span>
          </div>
        </div>
      </div>

      <Adsense client="ca-pub-2188063137129806" slot="4695444437" format="auto" widthResponsive="true" />
    </section>
  );
}
