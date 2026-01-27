## Validation component for MUI forms

[![license](https://img.shields.io/github/license/mashape/apistatus.svg)](https://opensource.org/licenses/MIT)

### Installation

```
npm install react-mui-form-validator

```

### Info

Some rules can accept extra parameter, example:

```javascript
<MuiTextField
  {...someProps}
  validators={[
    {
      validator: "maxNumber",
      max: 10,
    },
  ]}
/>
```

### Usage Example

You can pass any props of field components, but note that `errorText` prop will be replaced when validation errors occurred.
Your component must [provide a theme](http://www.material-ui.com/#/get-started/usage).

```javascript
import { useState } from "react";
import { MuiForm, MuiTextField } from "react-mui-form-validator";
import { Button } from "@mui/material";

export default function App(props: any) {
  const [email, setEmail] = useState();

  const handleSubmit = () => {
    // your submit logic
  };

  return (
    <div>
      <h3>Example Sign In</h3>
      <MuiForm onSubmit={handleSubmit}>
        <MuiTextField
          name="email"
          label="Email"
          placeholder="example@domain.com"
          onChange={(v) => setEmail(v.target.value)}
          value={email}
          validators={[{ validator: "required" }, { validator: "isEmail" }]}
          errorMessages={["Email required", "Enter a valid email"]}
          fullWidth
        />
        <br />
        <Button type="submit" variant="outlined">
          Sign In
        </Button>
      </MuiForm>
    </div>
  );
}
```

## Authors

- [@blencm](https://www.github.com/blencm)
