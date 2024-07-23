import { useField } from 'formik';
import { FC } from 'react';

import { TextField, TextFieldProps } from '@mui/material';

type TFormikTextFieldProps = {
  name: string;
} & TextFieldProps;

export const FormikTextField: FC<TFormikTextFieldProps> = (props) => {
  const { name, type, sx, placeholder, multiline, rows, ...rest } = props;

  const [{ value, onChange, onBlur }, { error, touched }] = useField(name);
  const helperText = touched && error ? error : '';

  return (
    <TextField
      id={name}
      name={name}
      type={type}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      placeholder={placeholder}
      error={!!error && !!touched}
      helperText={helperText}
      multiline={multiline}
      rows={rows}
      fullWidth
      color="secondary"
      {...rest}
      sx={sx}
    />
  );
};
