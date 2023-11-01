import React from "react";
import ValidatorComponent from "../core/validator/ValidatorComponent";
import { MuiTelInput } from "mui-tel-input";

export default class MuiTelInputDefault extends ValidatorComponent {
  renderValidatorComponent() {
    const {
      error,
      errorMessages,
      validators,
      helperText,
      validatorListener,
      withRequiredValidator,
      containerProps,
      onChangeTel,
      ...rest
    } = this.props;
    const { isValid } = this.state;

    return (
      <MuiTelInput
        {...rest}
        error={!isValid || error}
        onChange={onChangeTel}
        helperText={(!isValid && this.getErrorMessage()) || helperText}
      />
    );
  }
}
