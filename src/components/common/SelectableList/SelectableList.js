/**
 * Created by cjh95414 on 2016/5/25.
 */
import React, { PropTypes, Component } from 'react';
import { List, makeSelectable } from 'material-ui/List';

let SelectableList = makeSelectable(List);

function wrapState(ComposedComponent) {
  return class SelectableListComponent extends Component {
    static propTypes = {
      children: PropTypes.node,
      defaultValue: PropTypes.number.isRequired,
      onSelected: PropTypes.func,
    };

    static defaultProps = {
      defaultValue: 0,
    };

    componentWillMount() {
      this.setState({
        selectedIndex: this.props.defaultValue,
      });
    }

    handleRequestChange = (event, index) => {
      this.setState({
        selectedIndex: index,
      });

      const { onSelected } = this.props;

      // if defined the [Method: onSelected] in this.props, invoke it and deliver the selected index to [Method: onSelected]
      onSelected && onSelected(index);  // eslint-disable-line
    };

    render() {
      return (
        <ComposedComponent
          value={this.state.selectedIndex}
          onChange={this.handleRequestChange}
        >
          {this.props.children}
        </ComposedComponent>
      );
    }
  };
}

SelectableList = wrapState(SelectableList);

export default SelectableList;
