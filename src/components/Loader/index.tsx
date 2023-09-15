import React from 'react';
import { querySelector, removeElement } from '../../utils';
import './Loader.scss';

export class Loader extends React.Component {
  componentDidMount(): void {
    let interval: NodeJS.Timeout;
    if (!interval) {
      interval = setInterval(() => {
        if (document.readyState == 'complete') {
          removeElement(querySelector('.loader'));
          clearInterval(interval);
        }
      }, 400);
    }
  }

  render() {
    return (
      <div className="loader">
        <div className="sp sp-circle"></div>N C
      </div>
    );
  }
}
