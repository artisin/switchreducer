# switchreducerr
[![npm](https://img.shields.io/npm/l/switchreducer.svg)](https://github.com/artisin/switchreducer/blob/master/LICENSE.txt)
[![npm](https://img.shields.io/npm/v/switchreducer.svg)](https://www.npmjs.com/package/switchreducer)
[![wercker status](https://app.wercker.com/status/318ec4f5595dcc395d305e27825e20bd/s/master "wercker status")](https://app.wercker.com/project/byKey/318ec4f5595dcc395d305e27825e20bd)
[![David](https://img.shields.io/david/artisin/switchreducer.svg)](https://github.com/artisin/switchreducer/blob/master/package.json)

## Description

A simple and small [Redux](http://redux.js.org/) library designed to reduce the verbose boiler plate of the "default" [switch statement](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/switch) [reducer](http://redux.js.org/docs/Glossary.html#reducer) pattern.

## `switchreducer`

The operation of `switchreducer` is dead simple. It takes two arguments, the initial state, and a function that's passed a single argument object parameter of the `state` and the `action` properties, ie `({state, ...action})`. This function expects a return of a lookup table composed of "action" cases which are invoked when a "action" type matches.


```js
switchreducer(<initial-state>, ({<state>, ...<action>}) =>
  <action-lookup-table>
);
```

__Example__

```js
import switchreducer from 'switchreducer';

// actions + state
const SET_FILTER = 'SET_FILTER';
const SET_COLOR = 'SET_COLOR';
const initialState = {};

// reducer
const myReducer = switchreducer(initialState, ({state, payload}) => ({
  [SET_FILTER]: () => Object.assign({}, state, {filter: payload}),
  [SET_COLOR]: () => Object.assign({}, state, {color: payload}),
}));
```


__"default" reducer comparison__

For comparison here's what the above reducer would look like using the "default" switch statement pattern.

```js
// actions + state
const SET_FILTER = 'SET_FILTER';
const SET_COLOR = 'SET_COLOR';
const initialState = {};

// reducer
const myReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
      case SET_FILTER:
        return Object.assign({}, state, {filter: payload});
      case SET_COLOR:
        return Object.assign({}, state, {color: payload}),
      default:
        return state;
  }
};
```



## `switchcase`

You may prefer and/or there may be cases that the `switchcase` lookup table helper is a better fit. The `switchcase` function is the "real" logic behind `switchreducer`. It expects a "action" lookup table and two curried arguments the state and the "action" type.


```js
switchcase(<action-lookup-table>)(<state>)(<action-type>);
```

__Example__

```js
import { switchcase } from 'switchreducer';

// actions + state
const SET_FILTER = 'SET_FILTER';
const SET_COLOR = 'SET_COLOR';
const initialState = {};

// reducer
const myReducer = (state = initialState, action) => {
  const { type, payload } = action;
  return switchcase(({
    [SET_FILTER]: () => Object.assign({}, state, {filter: payload}),
    [SET_COLOR]: () => Object.assign({}, state, {color: payload}),
  }))(state)(type);
};
```


---

Best, te
