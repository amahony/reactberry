"use client"
import { Box, Text } from "@/design-system/elements"
import { IconDotsAnim } from "@/design-system/icons"

type TextBreakProps = {
  message?: string
  colorSchema?: string
  loading?: boolean
  showBreaks?: boolean
  position?: "left" | "center" | "right"
  children?: React.ReactNode
  contentProps?: {
    [key: string]: any
  }
  breakProps?: {
    [key: string]: any
  }

  [key: string]: any
}

export default function TextBreak({
  message,
  loading,
  showBreaks = true,
  colorSchema = "default",
  position = "center",
  children,
  contentProps = {},
  breakProps = {},
  ...props
}: TextBreakProps) {
  const noticePalette: any = {
    default: ["tertiary", "secondary"],
    attention: ["currentColor", "red"],
    accent: ["currentColor", "accent"],
  }

  const content = message || children
  const leftBreakFlex =
    position === "right" ? "auto" : position === "center" ? "auto" : "0"
  const rightBreakFlex =
    position === "left" ? "auto" : position === "center" ? "auto" : "0"

  return (
    <Text
      as="div"
      color={noticePalette[colorSchema][1]}
      display="flex"
      alignItems={"center"}
      width="100%"
      fontSize="xsmall"
      gap="xsmall"
      {...props}
    >
      {showBreaks && position !== "left" && (
        <Box
          flex={leftBreakFlex}
          width={"auto"}
          height={"1px"}
          bg={noticePalette[colorSchema][0]}
          opacity="0.25"
          {...breakProps}
        />
      )}
      {content && (
        <Text
          as="div"
          display="flex"
          alignItems={"center"}
          flex="none"
          gap="xsmall"
          px={position === "left" ? 0 : "small"}
          py="xxxsmall"
          shape="pill"
          {...contentProps}
        >
          {loading && (
            <IconDotsAnim color="currentColor" width="20" height="20" />
          )}
          <Text flex="none">{content}</Text>
        </Text>
      )}
      {showBreaks && position !== "right" && (
        <Box
          flex={rightBreakFlex}
          width={"auto"}
          height={"1px"}
          bg={noticePalette[colorSchema][0]}
          opacity="0.25"
          {...breakProps}
        />
      )}
    </Text>
  )
}
