
import { ADD_CREW } from '../../actiontypes/crew';
import reducer from '../../reducers/crew';

describe('crew reducer', () => {
  it('should add crew', () => {
    expect(
      reducer({}, {
        type: ADD_CREW,
        crewMembers: {
          1: ['role1', 'role2'],
          2: ['role3', 'role4']
        },
        id: 1
      })
    ).toMatchSnapshot();
  });
});
