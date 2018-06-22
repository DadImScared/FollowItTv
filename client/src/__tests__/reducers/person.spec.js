
import { ADD_PEOPLE } from '../../actiontypes/people';
import { ADD_CHARACTERS } from '../../actiontypes/characters';
import reducer from '../../reducers/people';

describe('people reducer', () => {
  it('should add people', () => {
    const people = {
      1: { name: 'person1' },
      2: { name: 'person2' }
    };
    expect(
      reducer({}, {
        type: ADD_PEOPLE,
        people
      })
    ).toMatchSnapshot();
  });

  it('should add people from ADD_CHARACTERS action', () => {
    const people = {
      1: { name: 'person1' },
      2: { name: 'person2' }
    };
    expect(
      reducer({}, {
        type: ADD_CHARACTERS,
        people
      })
    ).toMatchSnapshot();
  });
});
