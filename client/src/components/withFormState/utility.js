
export const applyValidation = async (props, state, id, validators) => {
  let initialValue = '';
  for (const validator of validators) {
    const result = await validator(props, state, id);

    if (result !== undefined) {
      if (initialValue.length) {
        initialValue += `, ${result}`;
      }
      else {
        initialValue += `${result}`;
      }
    }
  }
  return await initialValue;
};
