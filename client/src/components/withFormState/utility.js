
export const removeValidateString = (data, key, errors) => {
  if (key in errors) {
    if (errors[key].includes(`, ${data[key]}`)) { // error string is in middle somewhere or at end
      errors[key] = errors[key].replace(`, ${data[key]}`, '');
    }
    else if (errors[key] === data[key]) { // error last remaining
      delete errors[key];
    }
    else { // error string is at start
      errors[key] = errors[key].replace(`${data[key]}, `, '');
    }
  }
};

export const applyValidation = async (props, state, id, validators) => {
  const initialErrors = { ...state.formErrors };
  const newErrors = {};

  for (const validator of validators) {
    const { remove, ...data } = await validator(props, state, id);
    Object.keys(data).forEach((key) => {
      if (remove) {
        removeValidateString(data, key, initialErrors);
      }
      else {
        if (key in initialErrors) {
          if (!initialErrors[key].includes(data[key])) {
            initialErrors[key] += `, ${data[key]}`;
          }
        }
        else {
          if (key in newErrors) {
            newErrors[key] += `, ${data[key]}`;
          }
          else {
            newErrors[key] = data[key];
          }
        }
      }
    });
  }
  return { ...initialErrors, ...newErrors };
};
