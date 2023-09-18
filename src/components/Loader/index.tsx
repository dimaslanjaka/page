import React from 'react';
import { querySelector, removeElement, waitUntilPageFullyLoaded } from '../../utils';

class Loader extends React.Component {
  componentDidMount() {
    require('./Loader.scss');
    waitUntilPageFullyLoaded(() => removeElement(querySelector('.loader')));
  }

  render() {
    return (
      <div className="loader">
        <div className="sp sp-circle"></div>
      </div>
    );
  }
}

export default Loader;
