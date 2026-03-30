"use client";

import { Box, Text } from "@/design-system/elements";
import Field, { FieldProps } from "@/design-system/elements/field";
import { TextareaHTMLAttributes, forwardRef } from "react";

type CommonProps = {
  error?: any;
  as?: React.ElementType;
  label: string | React.ReactNode;
  description?: string;
  children?: React.ReactNode;
  watch?: any;
  required?: boolean;
  name: string;
  layout?: "column" | "row";
  fontSize?: string | number;
  labelWidth?: string | number;
  containerProps?: {
    [key: string]: any;
  };
  [key: string]: any;
};

type FieldSetProps = CommonProps &
  (
    | Omit<FieldProps, "color">
    | Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "color">
  );

const FieldSet = forwardRef<any, FieldSetProps>(function FieldSet(
  {
    name,
    error,
    label,
    required,
    description,
    children,
    watch,
    as,
    layout = "column",
    fontSize = "medium",
    labelWidth,
    containerProps = {},
    ...rest
  },
  ref,
) {
  const isRowLayout = layout === "row";

  const labelElement = (
    <Text
      as="label"
      htmlFor={name}
      fontWeight={600}
      mb={isRowLayout ? "0" : description ? "0" : "xsmall"}
      color="currentColor"
      fontSize={fontSize}
      width={isRowLayout ? labelWidth : undefined}
      flex={isRowLayout && !labelWidth ? "none" : undefined}
      minWidth={isRowLayout ? "fit-content" : undefined}
      mr={isRowLayout ? "small" : undefined}
    >
      {typeof label === "string" ? (
        label + (required ? " *" : "")
      ) : (
        <>
          {label}
          {required && (
            <Text as="span" color="currentColor">
              {" *"}
            </Text>
          )}
        </>
      )}
    </Text>
  );

  const fieldElement = watch ? (
    <Box display="flex" alignItems="center" gap="small" width="100%">
      <Field
        ref={ref}
        id={name}
        name={name}
        as={as || "input"}
        variant="default"
        $size={fontSize}
        width={"100%"}
        {...rest}
      >
        {as && as !== "input" ? children : null}
      </Field>
      <Text
        height="2rem"
        width="2.5rem"
        fontSize="small"
        flex="none"
        bg="transparent.light.1"
        display="flex"
        alignItems="center"
        justifyContent={"center"}
        textAlign="center"
        shape="rounded"
      >
        {watch}
      </Text>
    </Box>
  ) : (
    <Field
      ref={ref}
      id={name}
      name={name}
      as={as || "input"}
      variant="default"
      $size={fontSize}
      width={"100%"}
      {...rest}
    >
      {as && as !== "input" ? children : null}
    </Field>
  );

  return (
    <Box
      as="fieldset"
      m="0"
      p="0"
      border="none"
      display={"flex"}
      flexDirection={isRowLayout ? "row" : "column"}
      alignItems={isRowLayout ? "center" : "stretch"}
      width="100%"
      gap={isRowLayout ? "none" : undefined}
      {...containerProps}
    >
      {isRowLayout ? (
        <>
          {labelElement}
          <Box display="flex" flexDirection="column" width="100%">
            {description && (
              <Text as="p" fontSize="small" color="secondary" mb="xsmall">
                {description}
              </Text>
            )}
            {fieldElement}
            {error && (
              <Text pt="xxsmall" fontSize="xsmall" color="red">
                {error}
              </Text>
            )}
          </Box>
        </>
      ) : (
        <>
          {labelElement}
          {description && (
            <Text as="p" fontSize="xsmall" color="secondary" mb="xsmall">
              {description}
            </Text>
          )}
          {fieldElement}
          {error && (
            <Text pt="xxsmall" fontSize="xsmall" color="red">
              {error}
            </Text>
          )}
        </>
      )}
    </Box>
  );
});

export default FieldSet;
