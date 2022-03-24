import React from "react";
import FormControl from "@mui/material/FormControl";
import MuiComponent from "../core/MuiComponent";
import Select, { SelectChangeEvent } from "@mui/material/Select";

export default class MuiTextSelect extends MuiComponent {
  renderMuiComponent() {
    const {
      label,
      error,
      errorMessages,
      validators,
      requiredError,
      helperText,
      validatorListener,
      withRequiredValidator,
      formSelectProps,
      containerProps,
      ...rest
    } = this.props;
    const { isValid } = this.state;
    return (
      <FormControl {...formSelectProps} variant="standard" sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="mui-select-validator">{label}</InputLabel>
        <Select
          labelId="mui-select-validator"
          id="demo-simple-select-standard"
          value={age}
          onChange={handleChange}
          label="Age"
          error={!isValid || error}
          helperText={(!isValid && this.getErrorMessage()) || helperText}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
      </FormControl>
    );
  }
}
