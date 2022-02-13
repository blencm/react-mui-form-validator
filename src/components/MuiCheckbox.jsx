import React from "react";
import red from "@mui/material/colors/red";
import Checkbox from "@mui/material/Checkbox";
import MuiComponent from "../core/MuiComponent";

const red300 = red["500"];

const style = {
  right: 0,
  fontSize: "12px",
  color: red300,
  position: "absolute",
  marginTop: "-25px",
};

class MuiCheckbox extends MuiComponent {
  renderMuiComponent() {
    const {
      errorStyle,
      errorMessages,
      validators,
      requiredError,
      value,
      ...rest
    } = this.props;

    return (
      <div>
        <Checkbox
          {...rest}
          ref={(r) => {
            this.input = r;
          }}
        />
        {this.errorText()}
      </div>
    );
  }

  errorText() {
    const { isValid } = this.state;

    if (isValid) {
      return null;
    }

    return (
      <div style={errorStyle ? errorStyle : style}>
        {this.getErrorMessage()}
      </div>
    );
  }
}

export default MuiCheckbox;
