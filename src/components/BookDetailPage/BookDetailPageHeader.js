import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { StarButton } from 'components/common/Buttons';
import Header from 'components/common/Header';

import { star, unstar } from 'actions/Book';

class BookDetailPageHeader extends Component {

  handleStar = () => {
    const { actions, params: { id }, username } = this.props;
    actions.star(id, username);
  }

  handleUnstar = () => {
    const { actions, params: { id }, username } = this.props;
    actions.unstar(id, username);
  }

  render() {
    const { starred } = this.props;

    const iconElementRight = (
      <StarButton
        starred={starred}
        onStar={this.handleStar}
        onUnstar={this.handleUnstar}
      />
    );

    return (
      <Header
        iconElementRight={iconElementRight}
      />
    );
  }
}

function mapStateToProps(state) {
  const username = state.auth.get('username');
  return {
    username,
    starred: state.book.getIn(['book', 'stars']).includes(username),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Object.assign({}, {
      star, unstar,
    }), dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(
  BookDetailPageHeader,
);
