import * as React from "react";
import { expect } from "@jest/globals";
import TestRenderer from "react-test-renderer";
import { MuiForm } from "../..";

function MyComponent() {
  const handleChange = () => {};
  return (
    <div>
      <MuiForm onSubmit={handleChange}>
        <p className="my">Hello</p>
      </MuiForm>
    </div>
  );
}

const testRenderer = TestRenderer.create(<MyComponent />);
const testInstance = testRenderer.root;

expect(testInstance.findByProps({ className: "sub" }).children).toEqual([
  "Sub",
]);
