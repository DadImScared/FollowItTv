
import { loadingStart, loadingEnd } from '../../actions/loading';


describe('loading', () => {
  test('loadingStart', () => {
    expect(loadingStart('REQUEST_ID')).toMatchSnapshot();
  });

  test('loadingEnd', () => {
    expect(loadingEnd('REQUEST_ID')).toMatchSnapshot();
  });
});
