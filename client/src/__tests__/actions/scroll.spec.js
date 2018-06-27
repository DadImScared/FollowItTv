
import { updateScroll } from '../../actions/scroll';

describe('scroll', () => {
  test('updateScroll returns expected action', () => {
    expect(updateScroll({
      directionDown: false,
      atBottomOfPage: false
    })).toMatchSnapshot();
  });
});
