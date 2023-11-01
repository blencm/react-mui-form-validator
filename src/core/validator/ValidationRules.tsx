const isExisty = function (value: any): boolean {
  return value !== null && value !== undefined;
};

const isEmpty = function (value: any): boolean {
  if (value instanceof Array) {
    return value.length === 0;
  }
  return value === "" || !isExisty(value);
};

const isEmptyTrimed = function (value: any): boolean {
  if (typeof value === "string") {
    return value.trim() === "";
  }
  return true;
};

const validations = {
  matchRegexp: (value: any, regexp: RegExp | string): boolean => {
    const validationRegexp =
      regexp instanceof RegExp ? regexp : new RegExp(regexp);
    return isEmpty(value) || validationRegexp.test(value);
  },

  isEmail: (value: string): boolean =>
    validations.matchRegexp(
      value,
      /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i
    ),

  isEmpty: (value: any): boolean => isEmpty(value),

  required: (value: any): boolean => !isEmpty(value),

  trim: (value: string): boolean => !isEmptyTrimed(value),

  isNumber: (value: string): boolean =>
    validations.matchRegexp(value, /^-?[0-9]\d*(\d+)?$/i),

  isFloat: (value: string): boolean =>
    validations.matchRegexp(value, /^(?:-?[1-9]\d*|-?0)?(?:\.\d+)?$/i),

  isPositive: (value: string): boolean => {
    if (isExisty(value)) {
      return (
        (validations.isNumber(value) || validations.isFloat(value)) &&
        Number(value) >= 0
      );
    }
    return true;
  },

  maxNumber: (value: string, max: number): boolean =>
    isEmpty(value) || parseInt(value, 10) <= parseInt(max.toString(), 10),

  minNumber: (value: string, min: number): boolean =>
    isEmpty(value) || parseInt(value, 10) >= parseInt(min.toString(), 10),

  maxFloat: (value: string, max: number): boolean =>
    isEmpty(value) || parseFloat(value) <= max,

  minFloat: (value: string, min: number): boolean =>
    isEmpty(value) || parseFloat(value) >= min,

  isString: (value: any): boolean =>
    isEmpty(value) || typeof value === "string" || value instanceof String,

  minStringLength: (value: string, length: number): boolean =>
    validations.isString(value) && value.length >= length,

  maxStringLength: (value: string, length: number): boolean =>
    validations.isString(value) && value.length <= length,

  isFile: (value: any): boolean => isEmpty(value) || value instanceof File,

  maxFileSize: (value: any, max: number): boolean =>
    isEmpty(value) ||
    (validations.isFile(value) && value.size <= parseInt(max.toString(), 10)),

  allowedExtensions: (value: any, fileTypes: string): boolean =>
    isEmpty(value) ||
    (validations.isFile(value) &&
      fileTypes.split(",").indexOf(value.type) !== -1),
};

export default validations;
