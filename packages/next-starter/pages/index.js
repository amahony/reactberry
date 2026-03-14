import React from 'react';

import {Badge, Box, Button, Card, Divider, Heading, Text} from '@reactberry/core';
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
} from '@reactberry/forms';

const initialValues = {
  name: '',
  email: '',
  channels: ['email'],
  role: 'designer',
  contactPreference: 'email',
  notes: 'Starter validation keeps Reactberry imports package-root only.',
  updates: true
};

function HomePage() {
  return (
    <Box as="main" maxWidth="48rem" mx="auto" p="large">
      <Box mb="large">
        <Badge value="private" mb="small" />
        <Heading mb="xsmall">Reactberry Next.js starter</Heading>
        <Text as="p" mb="xsmall">
          This private workspace is the canonical in-repo consumer-validation target for the
          current Reactberry release contract.
        </Text>
        <Text as="p">
          It intentionally uses only `@reactberry/core`, `@reactberry/forms`, and
          `@reactberry/core/theme`.
        </Text>
      </Box>

      <Card mb="large">
        <Heading fontSize="medium" mb="xsmall">
          Supported contract
        </Heading>
        <Text as="p" color="text.muted" mb="small">
          Validate package-root imports here. Do not use `/src`, `/dist`, or deferred/private
          package entrypoints.
        </Text>
        <Divider my="small" />
        <Text as="p">Public imports in use on this page:</Text>
        <Box as="ul" pl="large" mb="0">
          <li>
            <code>@reactberry/core</code>
          </li>
          <li>
            <code>@reactberry/forms</code>
          </li>
          <li>
            <code>@reactberry/core/theme</code> (wired in <code>pages/_app.js</code>)
          </li>
        </Box>
      </Card>

      <Card>
        <Heading fontSize="medium" mb="small">
          Form surface smoke sample
        </Heading>
        <Form
          defaultValues={initialValues}
          onSubmit={values => console.log('Reactberry Next starter submit', values)}
        >
          <Field label="Name" field="name" placeholder="Jane Doe" Component={<Input />} />
          <Field
            label="Email"
            field="email"
            type="email"
            placeholder="jane@example.com"
            Component={<Input />}
          />
          <Field label="Notes" field="notes" Component={<Textarea rows={5} />} />
          <Field
            label="Role"
            field="role"
            Component={
              <Select>
                <option value="designer">Designer</option>
                <option value="developer">Developer</option>
                <option value="pm">Product manager</option>
              </Select>
            }
          />
          <Field
            label="Notification channels"
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
            label="Preferred contact"
            field="contactPreference"
            Component={
              <RadioGroup>
                <RadioButton value="email" label="Email" />
                <RadioButton value="slack" label="Slack" />
                <RadioButton value="phone" label="Phone" />
              </RadioGroup>
            }
          />
          <Field
            label="Release updates"
            field="updates"
            Component={<CheckboxButton label="Send Reactberry release updates" />}
          />
          <Button type="submit" mt="small">
            Submit validation form
          </Button>
        </Form>
      </Card>
    </Box>
  );
}

export default HomePage;