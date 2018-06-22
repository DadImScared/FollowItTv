
import React from 'react';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import { lengthValidator, passwordValidator } from '../../validators';


const formFields = [
  { id: 'email', labelText: 'Email', fieldType: 'email' },
  { id: 'password1',
    labelText: 'Password',
    fieldType: 'password',
    validators: [passwordValidator, lengthValidator]
  },
  { id: 'password2',
    labelText: 'Confirm password',
    fieldType: 'password',
    validators: [passwordValidator, lengthValidator]
  }
];

const RegisterForm = ({ classes, updateForm, submit, form, formErrors }) => (
  <div>
    <form className={classes.form} onSubmit={submit}>
      {
        formFields.map(({ id, labelText, fieldType='text', validators }, index) => {
          return (
            <TextField
              className={classes.fieldStyle}
              key={`${id}-${index}`}
              label={labelText}
              type={fieldType}
              value={form[id] || ''}
              error={!!formErrors[id]}
              helperText={formErrors[id] || ''}
              onChange={(e) => updateForm(e, id, validators)}
            />
          );
        })
      }
      <Button variant={'raised'} color={'primary'} style={{ alignSelf: 'flex-start' }} type={'submit'}>submit</Button>
    </form>
  </div>
);

export default RegisterForm;
