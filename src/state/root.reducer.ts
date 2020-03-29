import {AppState} from './app-state.interface';
import {CHANGE_ROUTE} from './root.actions';

export const INITIAL_APP_STATE: AppState = {
  route: '/'
};

export function rootReducer(state, action) {
  switch (action.type) {
    case CHANGE_ROUTE:
      return Object.assign({}, state, {
        route: action.route
      });

    default:
      return state;
  }
}
