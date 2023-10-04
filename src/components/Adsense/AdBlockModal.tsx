import React from 'react';
import { Modal } from 'rsuite';

interface State {
  open: boolean;
  text?: string[];
}

class AdBlockModal extends React.Component<any, State> {
  _mounted: boolean;
  _abortController: AbortController | null;
  constructor(props: any) {
    super(props);
    this.state = {
      open: false,
      text: []
    };
  }

  componentDidMount(): void {
    this._mounted = true;
    this._abortController = new AbortController();
    // import('./utils/adblock').then(({ default: adblock }) => {
    //   new adblock().ajaxMethod().catch(() => {
    //     if (this._mounted) this.setState({ open: true });
    //   });
    // });
    import('@components/Adsense/utils').then(load => {
      load
        .triggerAdsense({
          react: true
        })
        .then(open => {
          if (this._mounted) this.setState({ open });
        })
        .catch(() => {
          //
        });
    });

    import('./utils/adblock').then(({ text }) => {
      if (this._mounted) this.setState({ text });
    });
  }

  componentWillUnmount(): void {
    this._mounted = false;
    if (this._abortController) {
      this._abortController.abort();
      this._abortController = null;
    }
  }

  render() {
    const { open, text = [] } = this.state;

    return (
      <>
        <Modal backdrop="static" role="alertdialog" open={open} size="full">
          <Modal.Title className="text-center">AdBlock Detected</Modal.Title>
          <Modal.Body>
            <ul>
              {text.map(str => (
                <li key={str}>{str}</li>
              ))}
            </ul>
          </Modal.Body>
        </Modal>
      </>
    );
  }
}
export default AdBlockModal;
