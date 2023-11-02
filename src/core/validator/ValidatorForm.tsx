import * as React from "react";
import { validations } from "./ValidationRules";
import { ValidatorFormProps } from "../interface/Validator";
import { Validator } from "../types/ValidatorType";

const FormContext = React.createContext<any>("form");

export { FormContext };

class ValidatorForm extends React.Component<ValidatorFormProps> {

  static getValidator = (
    validator: Validator,
    value: any,
    includeRequired: boolean
  ): boolean => {
    let valid = validator;

    let result = true;
    if (valid.validator !== "required" || includeRequired) {
      switch (valid.validator) {
        case "required":
          result = validations.required(value);
          break;
        case "isEmail":
          result = validations.isEmail(value);
          break;
        case "isEmpty":
          result = validations.isEmpty(value);
          break;
        case "allowedExtensions":
          result = validations.allowedExtensions(value, valid.fileTypes);
          break;
        case "isFile":
          result = validations.isFile(value);
          break;
        case "isFloat":
          result = validations.isFloat(value);
          break;
        case "isNumber":
          result = validations.isNumber(value);
          break;
        case "isPositive":
          result = validations.isPositive(value);
          break;
        case "isString":
          result = validations.isString(value);
          break;
        case "matchRegexp":
          result = validations.matchRegexp(value, valid.regexp);
          break;
        case "maxFileSize":
          result = validations.maxFileSize(value, valid.max);
          break;
        case "maxFloat":
          result = validations.maxFloat(value, valid.max);
          break;
        case "maxNumber":
          result = validations.maxNumber(value, valid.max);
          break;
        case "maxStringLength":
          result = validations.maxStringLength(value, valid.max);
          break;
        case "minFloat":
          result = validations.minFloat(value, valid.min);
          break;
        case "minNumber":
          result = validations.minNumber(value, valid.min);
          break;
        case "minStringLength":
          result = validations.minStringLength(value, valid.min);
          break;
        case "trim":
          result = validations.trim(value);
          break;
        default:
          result = true;
          break;
      }
    }
    return result;
  };

  getFormHelpers = () => ({
    form: {
      attachToForm: this.attachToForm,
      detachFromForm: this.detachFromForm,
      instantValidate: this.instantValidate,
      debounceTime: this.debounceTime,
    },
  });

  instantValidate =
    this.props.instantValidate !== undefined
      ? this.props.instantValidate
      : true;

  childs: any[] = [];

  errors: any[] = [];

  debounceTime: number = this.props.debounceTime !== undefined ? this.props.debounceTime : 0;

  attachToForm = (component: any) => {
    if (this.childs.indexOf(component) === -1) {
      this.childs.push(component);
    }
  };

  detachFromForm = (component: any) => {
    const componentPos = this.childs.indexOf(component);
    if (componentPos !== -1) {
      this.childs = this.childs
        .slice(0, componentPos)
        .concat(this.childs.slice(componentPos + 1));
    }
  };

  submit = (event: React.FormEvent<HTMLFormElement>) => {
    if (event) {
      event.preventDefault();
      event.persist();
    }
    this.errors = [];
    this.walk(this.childs).then((result: boolean) => {
      if (this.errors.length) {
        if (this.props.onError != undefined) {
          this.props.onError(this.errors);
        }
      }
      if (result) {
        this.props.onSubmit();
      }
      return result;
    });
  };

  walk = (children: any[], dryRun?: boolean): Promise<boolean> => {
    const self = this;
    return new Promise((resolve) => {
      let result = true;
      if (Array.isArray(children)) {
        Promise.all(
          children.map((input) => self.checkInput(input, dryRun))
        ).then((data) => {
          data.forEach((item) => {
            if (!item) {
              result = false;
            }
          });
          resolve(result);
        });
      } else {
        self.walk([children], dryRun).then((result) => resolve(result));
      }
    });
  };

  checkInput = (input: any, dryRun?: boolean): Promise<boolean> =>
    new Promise((resolve) => {
      let result = true;
      const validators: Validator[] = input.props.validators;
      if (validators) {
        this.validate(input, true, dryRun).then((data) => {
          if (!data) {
            result = false;
          }
          resolve(result);
        });
      } else {
        resolve(result);
      }
    });

  validate = (
    input: any,
    includeRequired: boolean,
    dryRun?: boolean
  ): Promise<boolean> =>
    new Promise((resolve) => {
      const { value } = input.props;
      input.validate(value, includeRequired, dryRun).then((valid: boolean) => {
        if (!valid) {
          this.errors.push(input);
        }
        resolve(valid);
      });
    });

  find = (collection: any[], fn: (item: any) => boolean): any => {
    for (let i = 0, l = collection.length; i < l; i++) {
      const item = collection[i];
      if (fn(item)) {
        return item;
      }
    }
    return null;
  };

  resetValidations = () => {
    this.childs.forEach((child) => {
      child.validateDebounced.cancel();
      child.setState({ isValid: true });
    });
  };

  isFormValid = (dryRun: boolean = true): Promise<boolean> =>
    this.walk(this.childs, dryRun);

  render() {
    const {
      onSubmit,
      instantValidate,
      onError,
      debounceTime,
      children,
      ...rest
    } = this.props;
    return (
      <FormContext.Provider value={this.getFormHelpers()}>
        <form {...rest} onSubmit={this.submit}>
          {children}
        </form>
      </FormContext.Provider>
    );
  }
}

export default ValidatorForm;
