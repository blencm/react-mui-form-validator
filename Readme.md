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

Checkbox
```javascript
<MuiCheckbox
  {...someProps}
  validators={["required"]}
  errorMessages={["this checkbox is required"]}
  checked={value}
  value={value}
/>
```

### Usage Example

You can pass any props of field components, but note that `errorText` prop will be replaced when validation errors occurred.
Your component must [provide a theme](http://www.material-ui.com/#/get-started/usage).

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

You can add your custom rules:

```javascript

import React from 'react';
import Button from '@mui/material/Button';
import { MuiForm, MuiTextField} from 'react-mui-form-validator';

class ResetPasswordForm extends React.Component {

    state = {
        user: {
            password: '',
            repeatPassword: '',
        },
    };

    componentDidMount() {
        // custom rule will have name 'isPasswordMatch'
        MuiForm.addValidationRule('isPasswordMatch', (value) => {
            if (value !== this.state.user.password) {
                return false;
            }
            return true;
        });
    }

    componentWillUnmount() {
        // remove rule when it is not needed
        MuiForm.removeValidationRule('isPasswordMatch');
    }

    handleChange = (event) => {
        const { user } = this.state;
        user[event.target.name] = event.target.value;
        this.setState({ user });
    }

    handleSubmit = () => {
        // your submit logic
    }

    render() {
        const { user } = this.state;

        return (
            <MuiForm
                onSubmit={this.handleSubmit}
            >
                <MuiTextField
                    label="Password"
                    onChange={this.handleChange}
                    name="password"
                    type="password"
                    validators={['required']}
                    errorMessages={['this field is required']}
                    value={user.password}
                />
                <MuiTextField
                    label="Repeat password"
                    onChange={this.handleChange}
                    name="repeatPassword"
                    type="password"
                    validators={['isPasswordMatch', 'required']}
                    errorMessages={['password mismatch', 'this field is required']}
                    value={user.repeatPassword}
                />
                <Button type="submit">Submit</Button>
            </MuiForm>
        );
    }

```

##### [Advanced usage](https://github.com/blencm/react-mui-form-validator/wiki)
