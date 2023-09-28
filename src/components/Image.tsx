import React from 'react';

interface ImageAttr {
  [key: string]: any;
  src?: string;
  fallbackSrc?: string;
}

interface ImageState extends ImageAttr {
  errored: boolean;
  mounted: boolean;
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
      errored: false,
      mounted: false
    };
  }

  componentDidMount(): void {
    this.setState({ mounted: true });
  }

  componentWillUnmount(): void {
    this.setState({ mounted: false });
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
    const { src: _ignore1, fallbackSrc: _ignore2, ...props } = this.props;

    return <img {...props} src={src} onError={this.onError} />;
  }
}

export default Image;
