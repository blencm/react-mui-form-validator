import TextField from "@mui/material/TextField";
import React from "react";
import ValidatorComponent from "../core/validator/ValidatorComponent";

export default class MuiTextField extends ValidatorComponent {
  renderValidatorComponent() {
    const {
      error,
      errorMessages,
      validators,
      helperText,
      validatorListener,
      ...rest
    } = this.props;
    const { isValid } = this.state;
    return (
      <TextField
        {...rest}
        error={!isValid || error}
        helperText={(!isValid && this.getErrorMessage()) || helperText}
        
      />
    );
  }
}