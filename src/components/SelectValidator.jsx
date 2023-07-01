import TextField from "@mui/material/TextField";
import { ValidatorComponent } from "utils/ui/validator/index";

export default class SelectValidator extends ValidatorComponent {
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
