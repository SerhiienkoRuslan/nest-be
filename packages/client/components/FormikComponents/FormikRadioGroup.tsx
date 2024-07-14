import { useField } from 'formik';
import React from 'react';

import { FormControlLabel, Radio, RadioGroup, RadioGroupProps } from '@mui/material';
import { Theme, useTheme } from '@mui/material/styles';
import { SxProps } from '@mui/system';

type TFormikRadioGroupProps = {
  name: string;
  options: { value: string; label: string }[];
  sx?: SxProps;
  radioSx?: SxProps;
} & RadioGroupProps;

export const FormikRadioGroup: React.FC<TFormikRadioGroupProps> = (props) => {
  const { name, options, sx, radioSx, ...rest } = props;
  const theme: Theme = useTheme();

  const [field, , helpers] = useField(name);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    helpers.setValue((event.target as HTMLInputElement).value);
  };

  return (
    <RadioGroup name={name} value={field.value} onChange={handleChange} sx={sx} {...rest}>
      {options.map((option) => (
        <FormControlLabel
          key={option.value}
          value={option.value}
          label={option.label}
          control={
            <Radio sx={{ '&.Mui-checked': { color: theme.palette.secondary.main }, ...radioSx }} />
          }
        />
      ))}
    </RadioGroup>
  );
};
