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
  renderValidatorComponent(): React.ReactNode {
    throw new Error("Method not implemented.");
  }

  form: any;

  debounceTime: any;

  validateDebounced:
    | {
        (
          value: any,
          includeRequired?: boolean | undefined,
          dryRun?: boolean | undefined
        ): void;
        cancel: () => void;
      }
    | any;

  constructor(props: MuiTextFieldProps & ValidatorComponentProps) {
    super(props);
    this.state = {
      isValid: true,
      value: this.props.value,
      errorMessages: this.props.errorMessages,
      validators: this.props.validators,
    };
  }

  getSnapshotBeforeUpdate(
    nextProps: Readonly<MuiTextFieldProps & ValidatorComponentProps>,
    prevState: Readonly<ValidatorComponentState>
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

  instantValidate: boolean = true;

  invalid: number[] = [];

  componentDidMount() {
    this.configure();
  }

  configure = () => {
    this.form.attachToForm(this);
    this.instantValidate = this.form.instantValidate;
    this.debounceTime = this.form.debounceTime;
    this.validateDebounced = debounce(this.validate, this.debounceTime);
  };

  shouldComponentUpdate(
    nextProps: MuiTextFieldProps,
    nextState: ValidatorComponentState
  ) {
    return this.state !== nextState || this.props !== nextProps;
  }

  componentDidUpdate(
    prevProps: MuiTextFieldProps,
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

  validate = async (value: any, dryRun = false): Promise<boolean> => {
    let valid = false;
    if (this.state.validators) {
      const validations = Promise.all(
        this.state.validators.map((validator) =>
          ValidatorForm.getValidator(value, validator)
        )
      );

      const results = await validations;
      this.invalid = [];
      valid = true;
      results.forEach((result, key) => {
        if (!result) {
          valid = false;
          this.invalid.push(key);
        }
      });
      if (!dryRun) {
        this.setState({ isValid: valid }, () => {
          if (this.props.validatorListener)
            this.props.validatorListener(
              this.state.isValid === undefined ? false : this.state.isValid
            );
        });
      }
    }

    return valid;
  };

  isValid = (): boolean =>
    this.state.isValid === undefined ? false : this.state.isValid;

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
