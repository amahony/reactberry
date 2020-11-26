import { Badge, Box, Button, Heading, Theme } from "@reactberry/core";
import {
  CheckboxButton,
  CheckboxGroup,
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

class App extends React.Component {
  render() {
    return (
      <Theme>
        <GlobalStyle />

        <Box width={[1 / 3]} mx="auto" p="large">
          <Heading>Core</Heading>
          <Button>button</Button>

          <Badge value="99" />

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

            <CheckboxGroup name="checkbox_group" value="option1">
              <CheckboxButton label="option1" />
              <CheckboxButton label="option2" />
              <CheckboxButton label="option3" />
            </CheckboxGroup>

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
