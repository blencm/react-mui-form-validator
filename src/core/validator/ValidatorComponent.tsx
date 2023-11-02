import * as React from "react";
import { polyfill } from "react-lifecycles-compat";
import ValidatorForm, { FormContext } from "./ValidatorForm";
import { debounce } from "../utils/utils";
import {
  MuiTextFieldProps,
  ValidatorComponentProps,
  ValidatorComponentState,
} from "../interface/Validator";

class ValidatorComponent extends React.Component<
  MuiTextFieldProps & ValidatorComponentProps,
  ValidatorComponentState
> {
  [x: string]: any;
  getSnapshotBeforeUpdate(
    nextProps: ValidatorComponentProps,
    prevState: ValidatorComponentState
  ) {
    if (
      nextProps.validators &&
      nextProps.errorMessages &&
      (prevState.validators !== nextProps.validators ||
        prevState.errorMessages !== nextProps.errorMessages)
    ) {
      return {
        value: nextProps.value,
        validators: nextProps.validators,
        errorMessages: nextProps.errorMessages,
      };
    }

    return {
      value: nextProps.value,
    };
  }

  state = {
    isValid: true,
    value: this.props.value,
    errorMessages: this.props.errorMessages,
    validators: this.props.validators,
  };

  componentDidMount() {
    this.configure();
  }

  shouldComponentUpdate(
    nextProps: ValidatorComponentProps,
    nextState: ValidatorComponentState
  ) {
    return this.state !== nextState || this.props !== nextProps;
  }

  componentDidUpdate(
    prevProps: ValidatorComponentProps,
    prevState: ValidatorComponentState
  ) {
    if (this.instantValidate && this.props.value !== prevState.value) {
      this.validateDebounced(
        this.props.value,
        this.props.withRequiredValidator
      );
    }
  }

  componentWillUnmount() {
    this.form.detachFromForm(this);
    this.validateDebounced.cancel();
  }

  getErrorMessage = (): string | boolean | string[] => {
    const { errorMessages } = this.state;
    const type = typeof errorMessages;

    if (errorMessages) {
      if (type === "string") {
        return errorMessages;
      } else if (type === "object") {
        if (this.invalid.length > 0) {
          return errorMessages[this.invalid[0]];
        }
      }
    }

    return true;
  };

  instantValidate: boolean = true;

  invalid: number[] = [];

  configure = () => {
    this.form.attachToForm(this);
    this.instantValidate = this.form.instantValidate;
    this.debounceTime = this.form.debounceTime;
    this.validateDebounced = debounce(this.validate, this.debounceTime);
  };

  validate = async (
    value: any,
    includeRequired = false,
    dryRun = false
  ): Promise<boolean> => {
    if (this.state.validators) {
      const validations = Promise.all(
        this.state.validators.map((validator) =>
          ValidatorForm.getValidator(validator, value, includeRequired)
        )
      );
      return validations.then((results) => {
        this.invalid = [];
        let valid = true;
        results.forEach((result, key) => {
          if (!result) {
            valid = false;
            this.invalid.push(key);
          }
        });
        if (!dryRun) {
          this.setState({ isValid: valid }, () => {
            if (this.props.validatorListener != undefined) {
              this.props.validatorListener(
                this.state.isValid === undefined ? true : this.state.isValid
              );
            }
          });
        }
        return valid;
      });
    } else {
      return true;
    }
  };

  isValid = (): boolean =>
    this.state.isValid === undefined ? true : this.state.isValid;

  makeInvalid = () => {
    this.setState({ isValid: false });
  };

  makeValid = () => {
    this.setState({ isValid: true });
  };

  renderComponent = (form: ValidatorForm): React.ReactNode => {
    if (!this.form) {
      this.form = form;
    }
    return this.renderValidatorComponent();
  };

  render() {
    return (
      <FormContext.Consumer>
        {({ form }) => (
          <div {...this.props.containerProps}>{this.renderComponent(form)}</div>
        )}
      </FormContext.Consumer>
    );
  }
}

polyfill(ValidatorComponent);

export default ValidatorComponent;
