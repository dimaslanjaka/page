import React from 'react';
import { Loader as RLoader } from 'rsuite';

class Loader extends React.Component {
  componentDidMount() {
    require('./Loader.scss');
    // waitUntilPageFullyLoaded(() => removeElement(querySelector('.loader')));
  }

  render() {
    return <RLoader center content={<div className="sp sp-circle"></div>} className="loader" size="lg"></RLoader>;
  }
}

export default Loader;
