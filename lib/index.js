import {
  has,
  isfunction,
  isundefined,
} from 'lodash';


export const switchcase = cases => defaultState => key =>
  (f => isfunction(f) ? f() : f)((() =>
    has(cases, key) ? cases[key] : defaultState)());

/**
 * Switch reduce lib default export
 * @param  {---} initstate -> inital reducer state
 * @param  {fnc} cases)    -> reducer
 * @return {[type]}           [description]
 */
export const switchreducer = (initstate, cases) => (state, action) => {
  state = isundefined(state) ? initstate : state;
  const { type } = action;
  return switchcase(cases(Object.assign({}, {state}, action)))(state)(type);
};
export default switchreducer;
