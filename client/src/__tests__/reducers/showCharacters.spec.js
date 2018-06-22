
import { ADD_CHARACTERS } from '../../actiontypes/characters';
import reducer from '../../reducers/showCharacters';

describe('showCharacters reducer', () => {
  it('should add characterIds', () => {
    expect(
      reducer({}, {
        type: ADD_CHARACTERS,
        id: 1,
        characterIds: [1, 2]
      })
    ).toMatchSnapshot();
  });
});
