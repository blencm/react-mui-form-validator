import * as React from "react";
import Rules from "./ValidationRules";
import { ValidatorFormProps } from "../interface/Validator";
import { Validator } from "../types/ValidatorType";

const FormContext = React.createContext<any>("form");

export { FormContext };

class ValidatorForm extends React.Component<ValidatorFormProps> {
  static getValidator = (value: any, validator: Validator): boolean => {
    let valid = validator;

    switch (valid.validator) {
      case "required":
        return Rules.isEmpty(value);
      case "isEmail":
        return Rules.isEmail(value);
      case "isEmpty":
        return Rules.isEmpty(value);
      case "allowedExtensions":
        return Rules.allowedExtensions(value, valid.fileTypes);
      case "isFile":
        return Rules.isFile(value);
      case "isFloat":
        return Rules.isFloat(value);
      case "isNumber":
        return Rules.isNumber(value);
      case "isPositive":
        return Rules.isPositive(value);
      case "isString":
        return Rules.isString(value);
      case "matchRegexp":
        return Rules.matchRegexp(value, valid.regexp);
      case "maxFileSize":
        return Rules.maxFileSize(value, valid.max);
      case "maxFloat":
        return Rules.maxFloat(value, valid.max);
      case "maxNumber":
        return Rules.maxNumber(value, valid.max);
      case "maxStringLength":
        return Rules.maxStringLength(value, valid.max);
      case "minFloat":
        return Rules.minFloat(value, valid.min);
      case "minNumber":
        return Rules.minNumber(value, valid.min);
      case "minStringLength":
        return Rules.minStringLength(value, valid.min);
      case "trim":
        return Rules.trim(value);
      default:
        return true;
    }
  };

  childs: any[] = [];

  errors: any[] = [];

  instantValidate: boolean =
    this.props.instantValidate !== undefined
      ? this.props.instantValidate
      : true;

  debounceTime: number | undefined = this.props.debounceTime;

  getFormHelpers = () => ({
    form: {
      attachToForm: this.attachToForm,
      debounceTime: this.props.debounceTime,
      detachFromForm: this.detachFromForm,
      instantValidate: this.props.instantValidate,
    },
  });

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
        this.props.onError!(this.errors);
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
      const validators = input.props.validators;
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
