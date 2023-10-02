import React from 'react';
import { Modal } from 'rsuite';

interface State {
  open: boolean;
}

class AdBlockModal extends React.Component<any, State> {
  _mounted: boolean;
  _abortController: AbortController | null;
  constructor(props: any) {
    super(props);
    this.state = {
      open: false
    };
  }

  componentDidMount(): void {
    this._mounted = true;
    this._abortController = new AbortController();
    import('./utils/adblock').then(({ default: adblock }) => {
      new adblock()
        .ajaxMethod()
        .catch(() => {
          if (this._mounted) this.setState({ open: true });
        })
        .then(console.log);
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
    const { open } = this.state;

    return (
      <>
        <Modal backdrop="static" role="alertdialog" open={open} size="full">
          <Modal.Title className="text-center">AdBlock Detected</Modal.Title>
          <Modal.Body>
            Our website is made possible by displaying online advertisements to our visitors. We only display a few
            banner ads. We do not install any ad spam code. Please consider supporting us by disabling your ad blocker.
            {/* <Image src="https://giphy.com/embed/OqKNWrCt94ttupaFYL/giphy.gif" /> */}
          </Modal.Body>
        </Modal>
      </>
    );
  }
}
export default AdBlockModal;
