import React from "react";
import TextField from "@mui/material/TextField";
import MuiComponent from "../core/MuiComponent";

export default class MuiTextField extends MuiComponent {
  renderMuiComponent() {
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
        error={!isValid || error}
        helperText={(!isValid && this.getErrorMessage()) || helperText}
      />
    );
  }
}
