import type { BoxProps as MuiBoxProps } from '@mui/material/Box';
import type { TextFieldProps as MuiTextFieldProps } from '@mui/material/TextField';

type TextFieldProps = Omit<
  MuiTextFieldProps,
  'onChange' | 'select' | 'multiline' | 'defaultValue' | 'value' | 'autoFocus'
>;

type BoxProps = Omit<MuiBoxProps, 'onChange'>;

export interface BaseMuiOtpInputProps {
  value?: string;
  length?: number;
  autoFocus?: boolean;
  TextFieldsProps?: TextFieldProps;
  onComplete?: (value: string) => void;
  onChange?: (value: string) => void;
}

export type MuiOtpInputProps = BoxProps & BaseMuiOtpInputProps;
