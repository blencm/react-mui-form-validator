## Validation component for material-ui forms

[![license](https://img.shields.io/github/license/mashape/apistatus.svg)](https://opensource.org/licenses/MIT)

### Installation

```
npm install react-mui-form-validator

```

### Info

Some rules can accept extra parameter, example:

TextField
```javascript
<MuiTextField
  {...someProps}
  validators={["minNumber:0", "maxNumber:255", "matchRegexp:^[0-9]$"]}
/>
```

### Usage Example

You can pass any props of field components, but note that `errorText` prop will be replaced when validation errors occurred.
Your component must [provide a theme](http://www.material-ui.com/#/get-started/usage).

```javascript

import { useState } from "react";
import "./App.css";
import { MuiForm, MuiTextField } from "react-mui-form-validator";
import { Button, IconButton, InputAdornment, Paper } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faEye,
  faEyeSlash,
} from "@fortawesome/free-solid-svg-icons";

export default function App(props: any) {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [showPassword, setShowPassword] = useState(false);

  const changeName = (event: any) => {
    const name = event.target.value;
    setName(name);
  };

  const changeEmail = (event: any) => {
    const email = event.target.value;
    setEmail(email);
  };

  const changePassword = (event: any) => {
    const password = event.target.value;
    setPassword(password);
  };

  const handleSubmit = () => {
    // your submit logic
  };

  return (
    <div className="App">
      <center>
        <Paper className="container">
          <h3>Example Sign In</h3>
          <MuiForm
            onSubmit={handleSubmit}
            onError={(errors: any) => console.log(errors)}
          >
            <MuiTextField
              name="name"
              //className="css-style-name" add your css style
              //classes={classes.emailInput} //add your js or ts style
              label="Name"
              placeholder="Name"
              onChange={changeName}
              value={name}
              validators={["required"]}
              errorMessages={["this field is required"]}
              fullWidth
            />
            <br />
            <MuiTextField
              name="email"
              //className="css-style-name" add your css style
              //classes={classes.emailInput} //add your js or ts style
              label="Email"
              placeholder="Email"
              onChange={changeEmail}
              value={email}
              validators={["required", "isEmail"]}
              errorMessages={["this field is required", "email is not valid"]}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <FontAwesomeIcon icon={faEnvelope} />
                  </InputAdornment>
                ),
              }}
              fullWidth
            />
            <br />
            <MuiTextField
              type={showPassword ? "text" : "password"}
              style={{ marginBottom: 0 }}
              name="password"
              label="Password"
              //InputLabelProps={{ shrink: true }}
              placeholder="Password"
              value={password}
              onChange={changePassword}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <FontAwesomeIcon icon={faEnvelope} />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => setShowPassword(!showPassword)}
                      onMouseDown={(e) => e.preventDefault()}
                      edge="end"
                    >
                      <FontAwesomeIcon
                        icon={showPassword ? faEyeSlash : faEye}
                      />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              validators={["required"]}
              errorMessages={["Password is required"]}
              variant="outlined"
              fullWidth
            />
            <br />
            <Button type="submit" variant="outlined">
              Sign In
            </Button>
          </MuiForm>
        </Paper>
      </center>
    </div>
  );
}

```
css style example:

```
.App {
  text-align: center;
  width: 100%;
}

.container {
  width: 500px;
  height: auto;
  background: #FFFFFF;
  box-shadow: 0px 20px 56px rgba(0, 0, 0, 0.1);
  border-radius: 16px;
  padding: 15px;
  margin: 20px;
}

```

Class component example:

```javascript

import React from "react";
import Button from "@mui/material/Button";
import { MuiForm, MuiTextField } from "react-mui-form-validator";

class MyForm extends React.Component {
  state = {
    email: "",
  };

  handleChange = (event) => {
    const email = event.target.value;
    this.setState({ email });
  };

  handleSubmit = () => {
    // your submit logic
  };

  render() {
    const { email } = this.state;
    return (
      <MuiForm
        onSubmit={this.handleSubmit}
        onError={(errors) => console.log(errors)}
      >
        <MuiTextField
          label="Email"
          onChange={this.handleChange}
          name="email"
          value={email}
          validators={["required", "isEmail"]}
          errorMessages={["this field is required", "email is not valid"]}
        />
        <Button type="submit">Submit</Button>
      </MuiForm>
    );
  }
}

```
