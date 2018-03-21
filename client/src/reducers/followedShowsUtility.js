
export const followShow = (showState, action) => {
  return showState.concat(action.id);
};

export const unfollowShow = (showState, action) => {
  return showState.filter((item) => item !== action.id);
};
