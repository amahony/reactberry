"use client"
import React, { forwardRef } from "react"
import {
  NumericFormat,
  PatternFormat,
  NumericFormatProps,
  PatternFormatProps,
} from "react-number-format"
import { Field } from "../../elements"

// Preset configurations for common mask types
export const maskPresets = {
  currency: {
    type: "numeric" as const,
    prefix: "$",
    thousandSeparator: ",",
    decimalSeparator: ".",
    decimalScale: 2,
    fixedDecimalScale: true,
    allowNegative: false,
  },
  percentage: {
    type: "numeric" as const,
    suffix: "%",
    decimalScale: 2,
    fixedDecimalScale: false,
    allowNegative: false,
    isAllowed: (values: any) => {
      const { floatValue } = values
      return floatValue === undefined || (floatValue >= 0 && floatValue <= 100)
    },
  },
  phone: {
    type: "pattern" as const,
    format: "(###) ###-####",
    mask: "_",
    allowEmptyFormatting: false,
  },
  date: {
    type: "pattern" as const,
    format: "##/##/####",
    placeholder: "MM/DD/YYYY",
    mask: "_",
    allowEmptyFormatting: false,
  },
  zip: {
    type: "pattern" as const,
    format: "#####",
    mask: "_",
    allowEmptyFormatting: false,
  },
  zipPlus4: {
    type: "pattern" as const,
    format: "#####-####",
    mask: "_",
    allowEmptyFormatting: false,
  },
  ssn: {
    type: "pattern" as const,
    format: "###-##-####",
    mask: "_",
    allowEmptyFormatting: false,
  },
  ein: {
    type: "pattern" as const,
    format: "##-#######",
    mask: "_",
    allowEmptyFormatting: false,
  },
  creditCard: {
    type: "pattern" as const,
    format: "#### #### #### ####",
    mask: "_",
    allowEmptyFormatting: false,
  },
  time12: {
    type: "pattern" as const,
    format: "##:## ##",
    placeholder: "HH:MM AM",
    mask: "_",
    allowEmptyFormatting: false,
  },
  time24: {
    type: "pattern" as const,
    format: "##:##",
    placeholder: "HH:MM",
    mask: "_",
    allowEmptyFormatting: false,
  },
  decimal: {
    type: "numeric" as const,
    decimalScale: 4,
    fixedDecimalScale: false,
    allowNegative: true,
    thousandSeparator: ",",
  },
  integer: {
    type: "numeric" as const,
    decimalScale: 0,
    allowNegative: false,
    thousandSeparator: ",",
  },
  year: {
    type: "numeric" as const,
    decimalScale: 0,
    allowNegative: false,
    isAllowed: (values: any) => {
      const { floatValue } = values
      return (
        floatValue === undefined || (floatValue >= 1900 && floatValue <= 2100)
      )
    },
  },
}

export type MaskPresetType = keyof typeof maskPresets

interface BaseMaskedFieldProps {
  variant?: string
  $size?: string
  width?: string
  preset?: MaskPresetType
  // Design-system styling props that we want to forward through to Field
  shape?: string
  bg?: string
  fontSize?: string
  fontWeight?: number
  textAlign?: string
}

type NumericMaskedFieldProps = BaseMaskedFieldProps &
  Omit<NumericFormatProps, "customInput" | "getInputRef"> & {
    maskType?: "numeric"
  }

type PatternMaskedFieldProps = BaseMaskedFieldProps &
  Omit<PatternFormatProps, "customInput" | "getInputRef"> & {
    maskType?: "pattern"
  }

export type MaskedFieldProps = NumericMaskedFieldProps | PatternMaskedFieldProps

// Create a single StyledField component that accepts styling props
const StyledField = forwardRef<HTMLInputElement, any>(
  ({ variant, $size, width, ...props }, ref) => {
    return (
      <Field
        as="input"
        variant={variant}
        $size={$size}
        width={width}
        {...props}
        ref={ref}
      />
    )
  }
)

StyledField.displayName = "StyledField"

export function MaskedField({
  variant = "ghost",
  $size = "medium",
  width = "100%",
  preset,
  maskType,
  ...rest
}: MaskedFieldProps) {
  // Get preset configuration if provided
  const presetConfig = preset ? maskPresets[preset] : null

  // Determine which format type to use
  const formatType = maskType || presetConfig?.type || "numeric"

  // Merge preset config with custom props (custom props override preset)
  const mergedProps = {
    customInput: StyledField,
    variant,
    $size,
    width,
    ...(presetConfig || {}),
    ...rest,
  }

  // Remove the 'type' property as it's not a valid prop for NumericFormat/PatternFormat
  const { type, ...finalProps } = mergedProps as any
  // 'type' is intentionally removed from finalProps
  void type

  // Render NumericFormat for currency, percentage, amounts
  if (formatType === "numeric") {
    return <NumericFormat {...finalProps} />
  }

  // Render PatternFormat for phone, date, SSN, etc.
  return <PatternFormat {...finalProps} />
}

export default MaskedField
