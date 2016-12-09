import { PropTypes } from 'react';

const appShape = PropTypes.shape({
  setAppBarIconRight: PropTypes.func,
  restoreAppBar: PropTypes.func,
});

export default appShape;

export {
  appShape,
};
