
import { LOADING_START, LOADING_END } from '../../actiontypes/loading';
import reducer from '../../reducers/loading';

describe('loading reducer', () => {
  it('should add loading state', () => {
    expect(
      reducer({}, {
        type: LOADING_START,
        requestId: 'REQUEST_ID'
      })
    ).toMatchSnapshot();
  });

  it('should set loading state to false', () => {
    expect(
      reducer({ 'REQUEST_ID': true }, {
        type: LOADING_END,
        requestId: 'REQUEST_ID'
      })
    ).toMatchSnapshot();
  });
});
