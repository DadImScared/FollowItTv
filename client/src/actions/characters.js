
import { ADD_CHARACTERS } from '../actiontypes/characters';
import { loadingEnd, loadingStart } from './loading';
import { castSchema } from '../schemas/person';
import { normalize } from 'normalizr';
import { baseUrl } from './seasons';
import axios from 'axios';

export const addCharacters = (entities) => ({
  type: ADD_CHARACTERS,
  ...entities
});

const getCast = async (showId) => {
  return await axios.get(`${baseUrl}shows/${showId}/cast`);
};

export const handleCastData = (data) => {
  const { entities: { person, character }, result } = normalize(data, castSchema);
  const characterIds = result.reduce((acc, { character }) => {
    const newAcc = [...acc];
    if (!newAcc.includes(character)) {
      newAcc.push(character);
    }
    return newAcc;
  }, []);
  return {
    person,
    character,
    result,
    characterIds
  };
};

export const requestCast = (showId) => {
  return async (dispatch) => {
    const loadingId = `GET_CAST_${showId}`;
    dispatch(loadingStart(loadingId));
    try {
      const { data } = await getCast(showId);
      const { person: people, character: characters, characterIds } = handleCastData(data);
      dispatch(addCharacters({ id: showId, people, characters, characterIds }));
      dispatch(loadingEnd(loadingId));
    }
    catch (e) {
      dispatch(loadingEnd(loadingId));
      throw e;
    }
  };
};
