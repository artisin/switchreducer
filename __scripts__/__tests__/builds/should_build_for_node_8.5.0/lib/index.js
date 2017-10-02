
import { map } from 'lodash';

export const add = (a, b) => a + b;
export const subtract = (a, b) => a - b;
export const addMap = (arr) => map(arr, add);
