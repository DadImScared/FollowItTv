
export const applyValidation = (props, state, id, validators) => {
  return validators.reduce((accum, validator) => {
    const result = validator(props, state, id);
    if (result !== undefined) {
      if (accum.length) {
        accum += `, ${result}`;
      }
      else {
        accum += `${result}`;
      }
    }
    return accum;
  }, '');
};
