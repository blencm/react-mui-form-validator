import { TextField } from "@mui/material";
import ValidatorComponent from "../core/validator/ValidatorComponent";
import React from "react";
  
export default class MuiSelect extends ValidatorComponent {
  renderValidatorComponent() {
    const {
      error,
      errorMessages,
      validators,
      requiredError,
      helperText,
      validatorListener,
      withRequiredValidator,
      containerProps,
      ...rest
    } = this.props;
    const { isValid } = this.state;
    return (
      <TextField
        {...rest}
        select
        error={!isValid || error}
        helperText={(!isValid && this.getErrorMessage()) || helperText}
      />
    );
  }
}