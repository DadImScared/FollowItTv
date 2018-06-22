
import { ADD_PEOPLE } from '../actiontypes/people';

export const addPeople = (people) => {
  return {
    type: ADD_PEOPLE,
    people
  };
};
