import React, { useState } from "react";
import MuiTextField from "./MuiTextField";

function MyComponent() {
  const [name, setName] = useState<string>("");
  return (
    <MuiTextField
      name="Name"
      label="Name"
      placeholder="Name"
      onChange={(v) => setName(v.target.value)}
      value={name}
      validators={[
        {
          validator: "isEmpty",
        },
      ]}
      errorMessages={"Error"}
      fullWidth
    />
  );
}
