import AdsenseFill from '@/components/Adsense/AdsenseFill';
import Adsense from '@components/Adsense';
import SafelinkContents from '@components/SafelinkContents';
import React from 'react';

class SafelinkLayout2 extends React.Component<Record<string, never>, Record<string, never>> {
  constructor(props: Record<string, never>) {
    super(props);
  }

  render() {
    return (
      <div className="container-fluid">
        <AdsenseFill />
        <div className="text-center bg-dark text-light">
          <b>Scrolldown to view your link</b>
        </div>
        <SafelinkContents />
        <div className="row">
          <div className="col-md-12">
            <Adsense
              className="adsbygoogle"
              style={{ display: 'block' }}
              format="autorelaxed"
              client="ca-pub-2188063137129806"
              slot="5041245242"
            ></Adsense>
          </div>
        </div>
      </div>
    );
  }
}

export default SafelinkLayout2;
