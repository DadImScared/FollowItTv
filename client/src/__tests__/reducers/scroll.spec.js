
import { updateScroll } from '../../actions/scroll';
import reducer from '../../reducers/scroll';

const initialState = {
  directionDown: true,
  bottomOfPage: false
};

describe('scroll reducer', () => {
  it('should update scroll', () => {
    expect(
      reducer(initialState, updateScroll({
        directionDown: true
      }))
    ).toMatchSnapshot();
  });
});
