import Box from "../../elements/box";

export default function Divider(props: any) {
  return (
    <Box
      height="1px"
      width="100%"
      bg="transparent.light.1"
      my="xxxsmall"
      shape="rounded"
      {...props}
    />
  );
}
