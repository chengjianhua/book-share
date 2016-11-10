import {PropTypes} from 'react';

export const appShape = PropTypes.shape({
  setAppBarIconRight: PropTypes.func,
  restoreAppBar: PropTypes.func,
  setIsLoading: PropTypes.func,
});
