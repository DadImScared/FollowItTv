
import { addPeople } from '../../actions/people';


describe('people', () => {
  test('addPeople', () => {
    const people = {
      1: { name: 'person1' },
      2: { name: 'person2' }
    };
    expect(addPeople(people)).toMatchSnapshot();
  });
});
