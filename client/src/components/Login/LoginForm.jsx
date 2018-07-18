
import React from 'react';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import { Field } from '../withFormState/Field';

const formFields = [
  { id: 'email', labelText: 'Email', fieldType: 'email' },
  { id: 'password', labelText: 'Password', fieldType: 'password' }
];


const LoginForm = ({ updateForm, form, formErrors, submit }) => (
  <form onSubmit={submit}>
    {
      formFields.map(({ id, labelText, fieldType }, index) => (
        <Field
          id={id}
          updateForm={updateForm}
          key={`${id}-${index}`}
        >
          <TextField
            value={form[id] || ''}
            label={labelText}
            error={!!formErrors[id]}
            helperText={formErrors[id] || ''}
            type={fieldType}
          />
        </Field>
      ))
    }
    <Button type={'submit'}>Sign in</Button>
  </form>
);

export default LoginForm;
