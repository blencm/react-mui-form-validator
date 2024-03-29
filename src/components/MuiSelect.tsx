import * as React from "react";
import { TextField } from "@mui/material";
import ValidatorComponent from "../core/validator/ValidatorComponent";
export default class MuiSelect extends ValidatorComponent {
  
  renderValidatorComponent() {
    const {
      error,
      errorMessages,
      validators,
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
