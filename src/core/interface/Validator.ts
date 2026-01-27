import {
  FilledTextFieldProps,
  OutlinedTextFieldProps,
  StandardTextFieldProps,
} from "@mui/material";
import { Validator } from "../types/ValidatorType";
import type { MuiTelInputInfo } from "mui-tel-input";

//export type Validator1 =
//  | "required"
//  | "matchRegexp"
//  | "isEmail"
//  | "isEmpty"
//  | "trim"
//  | "isNumber"
//  | "isFloat"
//  | "isPositive"
//  | "maxNumber"
//  | "minNumber"
//  | "maxFloat"
//  | "minFloat"
//  | "isString"
//  | "minStringLength"
//  | "maxStringLength"
//  | "isFile"
//  | "maxFileSize"
//  | "allowedExtensions";

//export type MuiTextFieldProps<
//  Variant extends TextFieldVariants = TextFieldVariants
//> = Variant extends "filled"
//  ? FilledTextFieldProps
//  : Variant extends "standard"
//  ? StandardTextFieldProps
//  : OutlinedTextFieldProps;

export type ComponentProps = {
  errorMessages?: string | string[];
  validators?: Validator[];
  value: any;
  validatorListener?: (value: boolean) => void;
  withRequiredValidator?: boolean;
  containerProps?: object;
  onChangeTel?: (value: string, info: MuiTelInputInfo) => void;
};

export type ValidatorComponentProps = (
  | FilledTextFieldProps
  | OutlinedTextFieldProps
  | StandardTextFieldProps
) &
ComponentProps;

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
  children: React.ReactNode;
  onSubmit: () => void;
  instantValidate?: boolean;
  onError?: (errors: any) => void;
  debounceTime?: number;
}
