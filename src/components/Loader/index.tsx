import React from 'react';
import { Loader as RLoader } from 'rsuite';
import './Loader.scss';

interface LoaderAttr {
  [key: string]: any;
  content?: React.ReactNode;
}

class Loader extends React.Component<LoaderAttr> {
  constructor(props: LoaderAttr) {
    super(props);
  }

  componentDidMount() {
    // require('./Loader.scss');
    // waitUntilPageFullyLoaded(() => removeElement(querySelector('.loader')));
  }

  render() {
    return <RLoader center content={<Spinner />} className="full-page" size="lg"></RLoader>;
  }
}

export function Spinner({ content }: LoaderAttr) {
  return <div className="sp sp-circle" content={content as any}></div>;
}

export default Loader;
