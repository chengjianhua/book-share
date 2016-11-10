import invariant from 'invariant';
import React, {Component} from 'react';
import hoistStatics from 'hoist-non-react-statics';

import {appShape} from './propTypes';

function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}

export default function withApp(WrappedComponent, {withRef = true} = {}) {
  class WithApp extends Component {

    static childContextTypes = {
      app: appShape,
    }

    static propTypes = {
      app: appShape,
    }

    static contextTypes = {
      app: appShape,
    }

    componentWillUnmount() {
      this.context.app.restoreAppBar();
    }

    getWrappedInstance = () => {
      invariant(
        withRef,
        'To access the wrapped instance, you need to specify ' +
        '`{ withRef: true }` as the second argument of the withApp() call.'
      );

      return this.wrappedInstance;
    }

    render() {
      const app = this.props.app || this.context.app;
      const props = {...this.props, app};

      if (withRef) {
        props.ref = (c) => { this.wrappedInstance = c; };
      }

      return <WrappedComponent {...props} />;
    }
  }

  WithApp.displayName = `withApp(${getDisplayName(WrappedComponent)})`;
  WithApp.WrappedComponent = WrappedComponent;

  return hoistStatics(WithApp, WrappedComponent);
}
