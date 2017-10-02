import 'babel-polyfill';
import { combineReducers, createStore } from 'redux';
import should from 'should';
import {
  switchcase,
  switchreducer,
} from 'dist/switchreducer.js';

/**
 * Redux actions + state
 */
const DEFAULT_ACTION = 'DEFAULT_ACTION';
const ONE_ACTION     = 'ONE_ACTION';
const TWO_ACTION     = 'TWO_ACTION';
const THREE_ACTION   = 'THREE_ACTION';
const FOUR_ACTION    = 'FOUR_ACTION';
const YOLO_ACTION    = 'YOLO_ACTION';
const initState = {
  default: null,
  one: null,
  two: null,
  three: null,
  four: null,
  yolo: null,
};


/**
 * Default test reducer
 */
const defaultReducer = (state = initState, action) => {
  switch (action.type) {
      case DEFAULT_ACTION:
        return Object.assign({}, state, {
          default: action.payload
        });
      default:
        return state;
  }
};


/**
 * Default export and name switchreducerr
 * @param  {---} initState        -> init state
 * @param  {fnc} (state, payload) -> [KEY]: () => reducer action
 */
const switchreducerReducer = switchreducer(initState, ({state, payload, yolo}) => ({
  [ONE_ACTION]: () => Object.assign({}, state, {one: payload}),
  [TWO_ACTION]: () => Object.assign({}, state, {two: payload}),
  [YOLO_ACTION]: () => Object.assign({}, state, {yolo: yolo}),
}));


/**
 * switchcase export, typical reducer setup that returns switchcase
 *   -> switchcase({[key]: () => reducer action})(state)(type)
 */
const switchcaseReducer = (state = initState, action) => {
  const { type, payload } = action;
  return switchcase(({
    [THREE_ACTION]: () => Object.assign({}, state, {three: payload}),
    [FOUR_ACTION]: () => Object.assign({}, state, {four: payload}),
  }))(state)(type);
};


/**
 * Combin reduers and creat stor
 */
const store = createStore(combineReducers({
  defaultReducer,
  switchreducerReducer,
  switchcaseReducer,
}));


/**
 * Default reducer test
 */
describe('default tests', function() {
  it('should be null state', () => {
    should(store.getState().defaultReducer.default).equal(null);
  });

  it('should dispatch, reduce, and create new state', () => {
    store.dispatch({type: DEFAULT_ACTION, payload: true});
    should(store.getState().defaultReducer.default).equal(true);
  });
});

/**
 * Switchcase tests
 */
describe('switchcase tests', function() {
  it('should be null state', () => {
    should(store.getState().switchcaseReducer.three).equal(null);
    should(store.getState().switchcaseReducer.four).equal(null);
  });

  it('should dispatch, reduce, and create new state', () => {
    store.dispatch({type: THREE_ACTION, payload: true});
    should(store.getState().switchcaseReducer.three).equal(true);
  });

  it('should work with mutiple', () => {
    store.dispatch({type: THREE_ACTION, payload: false});
    store.dispatch({type: FOUR_ACTION, payload: false});
    should(store.getState().switchcaseReducer.three).equal(false);
    should(store.getState().switchcaseReducer.four).equal(false);
  });
});


/**
 * switchreducer tests
 */
describe('switchreducer tests', function() {
  it('should be null state', () => {
    should(store.getState().switchreducerReducer.one).equal(null);
    should(store.getState().switchreducerReducer.two).equal(null);
    should(store.getState().switchreducerReducer.yolo).equal(null);
  });

  it('should dispatch, reduce, and create new state', () => {
    store.dispatch({type: ONE_ACTION, payload: true});
    should(store.getState().switchreducerReducer.one).equal(true);
  });

  it('should work with mutiple', () => {
    store.dispatch({type: ONE_ACTION, payload: false});
    store.dispatch({type: TWO_ACTION, payload: false});
    should(store.getState().switchreducerReducer.one).equal(false);
    should(store.getState().switchreducerReducer.two).equal(false);
  });

  it('should work with yolo object param', () => {
    store.dispatch({type: YOLO_ACTION, yolo: true});
    should(store.getState().switchreducerReducer.yolo).equal(true);
  });
});

