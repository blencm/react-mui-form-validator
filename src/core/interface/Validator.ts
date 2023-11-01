import {
  FilledTextFieldProps,
  OutlinedTextFieldProps,
  StandardTextFieldProps,
  TextFieldVariants,
} from "@mui/material";
import { Validator } from "../types/ValidatorType";
import { MuiTelInputInfo } from "mui-tel-input";

export type Validator1 =
  | "required"
  | "matchRegexp"
  | "isEmail"
  | "isEmpty"
  | "trim"
  | "isNumber"
  | "isFloat"
  | "isPositive"
  | "maxNumber"
  | "minNumber"
  | "maxFloat"
  | "minFloat"
  | "isString"
  | "minStringLength"
  | "maxStringLength"
  | "isFile"
  | "maxFileSize"
  | "allowedExtensions";

export type MuiTextFieldProps<
  Variant extends TextFieldVariants = TextFieldVariants,
> = Variant extends "filled"
  ? FilledTextFieldProps
  : Variant extends "standard"
  ? StandardTextFieldProps
  : OutlinedTextFieldProps & ValidatorComponentProps;

export interface ValidatorComponentProps {
  errorMessages?: string | string[];
  validators?: Validator[];
  value: any;
  validatorListener?: (value: boolean) => void;
  withRequiredValidator?: boolean;
  containerProps?: object;
  onChangeTel?: (value: string, info: MuiTelInputInfo) => void;
}

export interface ValidatorComponentState {
  isValid?: boolean;
  value: any;
  errorMessages?: string | string[];
  validators?: Validator[];
}

export interface CustomProps {
  onChange: (event: { target: { name: string; value: string } }) => void;
  name: string;
}

export interface ValidatorFormProps {
  onSubmit: () => void;
  instantValidate?: boolean;
  children?: React.ReactNode;
  onError?: (errors: any[]) => void;
  debounceTime?: number;
}
