import { Dayjs } from 'dayjs';
import { useField } from 'formik';
import { FC } from 'react';

import { Theme, useTheme } from '@mui/material/styles';
import { SxProps } from '@mui/system';
import { DatePicker, DatePickerProps } from '@mui/x-date-pickers/DatePicker';

type TFormicDatePickerProps = {
  name: string;
  label?: string;
  sx?: SxProps;
} & Omit<DatePickerProps<Dayjs>, 'value' | 'onChange'>;

export const FormicDatePicker: FC<TFormicDatePickerProps> = (props) => {
  const { name, sx, label, ...rest } = props;
  const theme: Theme = useTheme();

  const [field, , helpers] = useField<Dayjs | null>(name);

  return (
    <DatePicker
      name={name}
      label={label}
      value={field.value}
      onChange={(date: Dayjs | null) => helpers.setValue(date)}
      {...rest}
      sx={{
        '& .MuiInputLabel-root.Mui-focused': {
          color: { color: theme.palette.secondary.main },
        },
        '& .MuiOutlinedInput-root': {
          '&.Mui-focused fieldset': { borderColor: theme.palette.secondary.main },
        },
        ...sx,
      }}
    />
  );
};
