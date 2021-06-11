import { CheckboxButton } from "@reactberry/forms/dist";
import { Badge, Box, Button, Heading, Theme, Toggle } from "@reactberry/core";
import {
  Field,
  Form,
  Input,
  RadioButton,
  RadioGroup,
  Select,
  Textarea
} from "@reactberry/forms";

import GlobalStyle from "@reactberry/core/src/Theme/default/utils";
import React from "react";
import ReactDOM from "react-dom";

import * as serviceWorker from "./serviceWorker";

console.log(CheckboxButton);

class App extends React.Component {
  render() {
    return (
      <Theme>
        <GlobalStyle />

        <Box width={[1 / 3]} mx="auto" p="large">
          <CheckboxButton label="test" />

          <Heading>Core</Heading>
          <Button>button</Button>

          <Badge value="99" />

          <Toggle />

          <Heading>Forms</Heading>

          <Form
            validate={(values, instance) => console.log({ values, instance })}
            onSubmit={(values, instance) => console.log("submit")}
          >
            <Field
              label="name"
              field="name"
              Component={<Input preset="light" flow="horizontal" label="asd" />}
            />
            <Field
              required
              label="email"
              validation={{ isEmail: true }}
              field="email"
              Component={<Input preset="light" flow="horizontal" label="asd" />}
            />
            <Textarea rows="20" defaultValue="This is textarea" />

            <RadioGroup name="radio_group" value="option1">
              <RadioButton label="option1" />
              <RadioButton label="option2" />
              <RadioButton label="option3" />
            </RadioGroup>

            <Select placeholder="select" defaultValue="option1" width="100%">
              <option value="option1">option1</option>
              <option value="option2">option2</option>
              <option value="option3">option3</option>
            </Select>
          </Form>
        </Box>
      </Theme>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
