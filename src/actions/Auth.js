import ActionTypes from '../constants/ActionTypes';
import {fromJS} from 'immutable';
import {fetchJson} from '../core/fetch';

export function authenticate(username, password) {
  return function (dispatch) {
    fetchJson('/manage/authenticate', {
      username, password,
    }).then(json => {
      console.log(json);
      dispatch({
        type: ActionTypes.AUTHENTICATE_USER_SUCCESS,
        payload: fromJS(json),
      });
    });
  };
}
