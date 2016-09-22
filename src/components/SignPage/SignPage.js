/**
 * Created by cjh95414 on 2016/5/3.
 */
import React, {Component} from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import {Tab, Tabs} from 'material-ui/Tabs';

import LoginPage from '../LoginPage';
import RegisterPage from '../RegisterPage';
import s from './SignPage.scss';

class SignPage extends Component {

  constructor(props) {
    super(props);

    this.state = {
      tab: 0,
    };
  }

  /**
   * 点击标签的时候切换到对应的标签
   * @param value
   */
  handleTabChange = (value) => {
    this.setState({
      tab: value,
    });
  };

  render() {
    return (
      <div>
        <Tabs
          value={this.state.tab}
          onChange={this.handleTabChange}
        >
          <Tab
            value={0}
            label="登录"
          >
            <LoginPage />
          </Tab>

          <Tab
            value={1}
            label="注册"
          >
            <RegisterPage />
          </Tab>
        </Tabs>
      </div>
    );
  }
}

export default withStyles(s)(SignPage);
