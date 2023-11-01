interface required {
  validator: "required";
}
interface matchRegexp {
  validator: "matchRegexp";
  regexp: RegExp | string;
}

interface isEmail {
  validator: "isEmail";
}
interface isEmpty {
  validator: "isEmpty";
}
interface trim {
  validator: "trim";
}
interface isNumber {
  validator: "isNumber";
}

interface isFloat {
  validator: "isFloat";
}
interface isPositive {
  validator: "isPositive";
}
interface maxNumber {
  validator: "maxNumber";
  max: number;
}
interface minNumber {
  validator: "minNumber";
  min: number;
}
interface maxFloat {
  validator: "maxFloat";
  max: number;
}
interface minFloat {
  validator: "minFloat";
  min: number;
}
interface isString {
  validator: "isString";
}
interface minStringLength {
  validator: "minStringLength";
  min: number;
}
interface maxStringLength {
  validator: "maxStringLength";
  max: number;
}
interface isFile {
  validator: "isFile";
}
interface maxFileSize {
  validator: "maxFileSize";
  max: number;
}
interface allowedExtensions {
  validator: "allowedExtensions";
  fileTypes: string;
}

export type Validator =
  | required
  | matchRegexp
  | isEmail
  | isEmpty
  | trim
  | isNumber
  | isFloat
  | isPositive
  | maxNumber
  | minNumber
  | maxFloat
  | minFloat
  | isString
  | minStringLength
  | maxStringLength
  | isFile
  | maxFileSize
  | allowedExtensions;
