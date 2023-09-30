import React from 'react';
import { Loader as RLoader } from 'rsuite';
import './Loader.scss';

class Loader extends React.Component {
  componentDidMount() {
    // require('./Loader.scss');
    // waitUntilPageFullyLoaded(() => removeElement(querySelector('.loader')));
  }

  render() {
    return <RLoader center content={<Spinner />} className="loader" size="lg"></RLoader>;
  }
}

export function Spinner() {
  return <div className="sp sp-circle"></div>;
}

export default Loader;
