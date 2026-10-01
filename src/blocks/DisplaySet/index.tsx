import { Text } from "../../elements";
export default function DisplaySet({
  label,
  content,
  flow = "row",
  placeholder = "not set",
  customFlow,
  contentProps = {},
  ...props
}: {
  label?: string | React.ReactNode;
  content: any;
  flow?: "row" | "column";
  customFlow?: string;
  placeholder?: string | React.ReactNode;
  contentProps?: Record<string, any>;
  [key: string]: any;
}) {
  return (
    <Text
      as="div"
      display={"grid"}
      gap="xxsmall"
      gridTemplateColumns={flow === "column" ? "1fr" : customFlow || "1fr 1fr"}
      color="secondary"
      fontWeight={700}
      {...props}
    >
      {label && (
        <Text as="h4" m="0">
          {label}
        </Text>
      )}
      <Text
        as="div"
        fontWeight={400}
        color={
          content !== null && content !== undefined ? "primary" : "tertiary"
        }
        {...contentProps}
      >
        {content !== null && content !== undefined ? content : placeholder}
      </Text>
    </Text>
  );
}
