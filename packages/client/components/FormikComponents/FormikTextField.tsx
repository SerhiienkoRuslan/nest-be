import { useField } from 'formik';
import { FC } from 'react';

import { TextField, TextFieldProps } from '@mui/material';

type TFormicTextFieldProps = {
  name: string;
} & TextFieldProps;

export const FormicTextField: FC<TFormicTextFieldProps> = (props) => {
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
      {...rest}
      sx={sx}
    />
  );
};
