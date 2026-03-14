import {
  Badge,
  Box,
  Button,
  GlobalStyle,
  Heading,
  ThemeProvider,
  Toggle,
  defaultTheme
} from "./reactberry-local";
import {
  CheckboxGroup,
  CheckboxButton,
  Field,
  Form,
  Input,
  RadioButton,
  RadioGroup,
  Select,
  Textarea
} from "./reactberry-local";
import React from "react";
import ReactDOM from "react-dom";

import * as serviceWorker from "./serviceWorker";

class App extends React.Component {
  render() {
    return (
      <ThemeProvider theme={defaultTheme}>
        <GlobalStyle />

        <Box width={[1 / 3]} mx="auto" p="large">
          <Box mb="large">
            <Heading>Legacy/Internal CRA Playground</Heading>
            <p>
              This app is retained only as an internal legacy sandbox. It is not the supported
              public Reactberry example contract; the canonical in-repo consumer-validation path
              now lives in `packages/next-starter`, while this playground intentionally continues
              to exercise the current local source barrels for internal-only inspection.
            </p>
          </Box>

          <Heading>Core</Heading>
          <Button>button</Button>

          <Badge value="99" />

          <Toggle />

          <Heading>Forms</Heading>

          <Form
            defaultValues={{
              name: "",
              email: "",
              bio: "This is textarea",
              contactPreference: "email",
              productUpdates: true,
              role: "option1",
              channels: ["email"]
            }}
            validate={(values, instance) => console.log({ values, instance })}
            onSubmit={(values, instance) => console.log("submit")}
          >
            <Field
              label="Name"
              field="name"
              placeholder="Jane Doe"
              Component={<Input />}
            />
            <Field
              required
              label="Email"
              validation={{ isEmail: true }}
              field="email"
              placeholder="jane@example.com"
              type="email"
              Component={<Input />}
            />
            <Field
              label="Bio"
              description="Textarea now sits on the shared Field foundation."
              field="bio"
              Component={<Textarea rows={6} />}
            />

            <Field
              label="Product updates"
              description="Checkbox controls now integrate directly with the shared Field state."
              field="productUpdates"
              validation={{ isCheck: "Please confirm you want product updates enabled" }}
              Component={<CheckboxButton label="Receive release and feature updates" />}
            />

            <Field
              label="Notification channels"
              description="Checkbox groups now manage array selection through the shared forms foundation."
              field="channels"
              Component={
                <CheckboxGroup>
                  <CheckboxButton value="email" label="Email" />
                  <CheckboxButton value="sms" label="SMS" />
                  <CheckboxButton value="push" label="Push" />
                </CheckboxGroup>
              }
            />

            <Field
              label="Contact preference"
              description="Radio groups now sit cleanly on the shared Field foundation."
              field="contactPreference"
              Component={
                <RadioGroup>
                  <RadioButton value="email" label="Email" />
                  <RadioButton value="sms" label="SMS" />
                  <RadioButton value="phone" label="Phone" />
                </RadioGroup>
              }
            />

            <Field
              label="Role"
              field="role"
              Component={
                <Select>
                  <option value="option1">option1</option>
                  <option value="option2">option2</option>
                  <option value="option3">option3</option>
                </Select>
              }
            />
          </Form>
        </Box>
      </ThemeProvider>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
