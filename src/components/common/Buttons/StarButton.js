import React, {PropTypes, PureComponent} from 'react';
import IconButton from 'material-ui/IconButton';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';
import Star from 'material-ui/svg-icons/toggle/star';

import emptyFunction from 'fbjs/lib/emptyFunction';

export default class StarButton extends PureComponent {
  static propTypes = {
    starred: PropTypes.bool.isRequired,
    onStar: PropTypes.func,
    onUnstar: PropTypes.func,
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

  handleTouchTap = () => {
    const {onStar, onUnstar} = this.props;
    const {starred} = this.state;

    if (starred) {
      onStar();
    } else {
      onUnstar();
    }

    this.setState({
      starred: !starred,
    });
  }

  render() {
    const {starred} = this.state;
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
