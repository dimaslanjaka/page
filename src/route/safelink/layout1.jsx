import React from 'react';
import './layout1.scss';
import { SafelinkContents } from '../../components/SafelinkContents';
import { Adsense } from '../../components/Adsense';

export class SafelinkLayout1 extends React.Component {
  render() {
    return (
      <main>
        <section id="main-content">
          <div id="ads-left">
            {/*<!-- vertikal kiri -->*/}
            <Adsense
              className="adsbygoogle"
              style={{ display: 'block' }}
              client="ca-pub-2188063137129806"
              slot="2450061646"
              format="auto"
              widthResponsive="true"
            ></Adsense>
          </div>
          <SafelinkContents />
          <div id="ads-right">
            {/*<!-- vertikal kanan -->*/}
            <Adsense
              className="adsbygoogle"
              style={{ display: 'block' }}
              client="ca-pub-2188063137129806"
              slot="1136979979"
              format="auto"
              widthResponsive="true"
            ></Adsense>
          </div>
        </section>
      </main>
    );
  }
}
