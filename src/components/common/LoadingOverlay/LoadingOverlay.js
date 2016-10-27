import React, {Component} from 'react';
import CircularProgress from 'material-ui/CircularProgress';

class LoadingOverlay extends Component {

  componentWillReceiveProps(nextProps) {
    const {show} = nextProps;
    if (typeof document !== 'undefined') {
      const body = document.body;
      body.style.overflow = show ? 'hidden' : 'auto';
      body.style.overFlow = show ? 'hidden' : 'auto';
    }
  }

  render() {
    const {show} = this.props;

    const style = {
      show: {
        display: 'block',
        zIndex: '1999',
        position: 'fixed',
        width: '100%',
        height: '100%',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        padding: '50% 0 0 0',
        backgroundColor: 'rgba(50,50,50, 0.8)',
      },
      hidden: {
        display: 'none',
      },
    };

    return (
      <div style={show ? style.show : style.hidden}>
        <CircularProgress size={80} />
      </div>
    );
  }
}

export default LoadingOverlay;
