import React from 'react';
import { Link } from '../components/Link';
import './MomentTimezone.scss';
import { ClockLive } from './moment-timezone/ClockLive';
import { DateInput } from './moment-timezone/DateInput';
import { FullTimezoneList } from './moment-timezone/FullTimezoneList';
import { Snippet } from './moment-timezone/Snippet';
import { momentTimezonePlayground } from './moment-timezone/moment-timezone';

export function MomentTimezone() {
  React.useEffect(() => {
    document.title = 'Moment Timezone Playground';
    momentTimezonePlayground();
  });

  return (
    <main>
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
    </main>
  );
}
