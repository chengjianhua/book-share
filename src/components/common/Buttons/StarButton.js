import React, { PropTypes, PureComponent } from 'react';
import IconButton from 'material-ui/IconButton';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';
import Star from 'material-ui/svg-icons/toggle/star';

import emptyFunction from 'fbjs/lib/emptyFunction';

export default class StarButton extends PureComponent {
  static propTypes = {
    starred: PropTypes.bool.isRequired,
    onStar: PropTypes.func.isRequired,
    onUnstar: PropTypes.func.isRequired,
  };

  static defaultProps = {
    starred: false,
    onStar: emptyFunction,
    onUnstar: emptyFunction,
  };

  constructor(props) {
    super(props);
    this.state = {
      starred: props.starred,
    };
  }

  componentWillReceiveProps({ starred }) {
    this.setState({
      starred,
    });
  }

  handleTouchTap = () => {
    const { onStar, onUnstar } = this.props;
    const { starred } = this.state;

    if (starred) {
      onUnstar();
    } else {
      onStar();
    }

    this.setState({
      starred: !starred,
    });
  }

  render() {
    const { starred } = this.state;
    return (
      <IconButton
        touch
        tooltip="bottom-right"
        tooltipPosition="bottom-right"
        onTouchTap={this.handleTouchTap}
      >
        {starred ? <Star color="#fff" /> : <StarBorder color="#fff" />}
      </IconButton>
    );
  }
}
