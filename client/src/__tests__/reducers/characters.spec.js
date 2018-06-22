
import { ADD_CHARACTERS } from '../../actiontypes/characters';
import reducer from '../../reducers/characters';


describe('characters reducer', () => {
  it('should add characters', () => {
    expect(
      reducer({}, {
        type: ADD_CHARACTERS,
        characters: { 1: { id: 1 } }
      })
    ).toMatchSnapshot();
  });
});
