
export const passwordValidator = (props, { form: { password1, password2 } }, id) => {
  const message = 'Passwords must match';
  if (password1 !== password2 && password2 && password1) {
    return {
      [id]: message
    };
  }
  else {
    return {
      remove: true,
      password1: message,
      password2: message
    };
  }
};

export const lengthValidator = (props, { form }, id) => {
  const message = 'Password length must be 8 characters or more';
  if (form[id] && form[id].length < 8) {
    return {
      [id]: message
    };
  }
  else {
    return {
      remove: true,
      [id]: message
    };
  }
};
