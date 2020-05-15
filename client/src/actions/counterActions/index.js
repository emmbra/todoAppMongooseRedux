import { INCREMENT } from '../types';

// Create action creator
// action creator is a function that returns an object
// that object must have a type property

// react redux will auto dispatch this to all reducers
export const increment = () => {
  return {
    type: INCREMENT
  };
};
