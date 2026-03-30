import { Text } from "@/design-system/elements";

type TagProps = {
  [key: string]: any;
};

export const Tag = ({ children, ...props }: TagProps) => {
  return (
    <Text
      as="div"
      display="flex"
      alignItems="center"
      gap="xxsmall"
      p="xs"
      py="xxxs"
      color="secondary"
      fontSize="small"
      fontWeight="600"
      shape="rounded"
      width="fit-content"
      flex="none"
      {...props}
    >
      {children}
    </Text>
  );
};
