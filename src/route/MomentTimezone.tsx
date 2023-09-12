import React from 'react';
import './MomentTimezone.scss';
import { Clock } from './moment-timezone/clock';
import { DateInput } from './moment-timezone/date-input';
import { FullTimezoneList } from './moment-timezone/full-timezone-list';
import { momentTimezonePlayground } from './moment-timezone/moment-timezone';
import { Snippet } from './moment-timezone/snippet';

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
            <a
              href="https://www.webmanajemen.com/page/moment-timezone.html"
              target="_blank"
              className="text-decoration-none"
            >
              Moment Timezone Playground
            </a>
          </h1>
          <small className="text-muted">Parse and display dates in any timezone.</small>
        </div>
      </section>

      <DateInput />
      <Snippet />
      <Clock />
      <FullTimezoneList />
    </main>
  );
}
