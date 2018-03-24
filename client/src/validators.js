
export const passwordValidator = (props, { form: { password1, password2 } }) => {
  if (password1 !== password2 && password2 && password1) {
    return 'Passwords must match';
  }
};

export const lengthValidator = (props, { form }, id) => {
  if (form[id] && form[id].length < 8) {
    return 'Password length must be 8 characters or more';
  }
};
