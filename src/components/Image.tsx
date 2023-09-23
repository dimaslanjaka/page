import React from 'react';

interface ImageAttr {
  [key: string]: any;
  src?: string;
  fallbackSrc?: string;
}

interface ImageState extends ImageAttr {
  errored: boolean;
}

/**
 * image with fallback
 */
class Image extends React.Component<ImageAttr, ImageState> {
  defaultImage = 'https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg';

  constructor(props: Readonly<ImageAttr>) {
    super(props);

    this.state = {
      src: props.src || this.defaultImage,
      errored: false
    };
  }

  onError = () => {
    if (!this.state.errored) {
      this.setState({
        src: this.props.fallbackSrc || this.defaultImage,
        errored: true
      });
    }
  };

  render() {
    const { src } = this.state;
    const { src: _1, fallbackSrc: _2, ...props } = this.props;

    return <img src={src} onError={this.onError} {...props} />;
  }
}

export default Image;
