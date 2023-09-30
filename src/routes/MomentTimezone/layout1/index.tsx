import Link from '@components/Link';
import { loadCSS } from '@utils/index';
import React from 'react';
import { momentTimezonePlayground } from '../shared/moment-timezone';
import Snippet from '../shared/Snippet';
import ClockLive from './ClockLive';
import DateInput from './DateInput';
import FullTimezoneList from './FullTimezoneList';

function MTLayout1() {
  React.useEffect(() => {
    document.title = 'Moment Timezone Playground';
    momentTimezonePlayground();
    loadCSS('//cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css');
    require('./MomentTimezone.scss');
  });

  return (
    <div>
      <section>
        <div className="text-center">
          <h1>
            <Link
              href="https://www.webmanajemen.com/page/moment-timezone.html"
              target="_blank"
              className="text-decoration-none"
            >
              Moment Timezone Playground
            </Link>
          </h1>
          <small className="text-muted">Parse and display dates in any timezone.</small>
        </div>
      </section>

      <DateInput />
      <Snippet />
      <ClockLive />
      <FullTimezoneList />
    </div>
  );
}

export default MTLayout1;
