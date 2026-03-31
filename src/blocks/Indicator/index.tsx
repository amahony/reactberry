import { Text } from "../../elements";

type IndicatorProps = {
  [key: string]: any;
};

export const Indicator = ({ children, ...props }: IndicatorProps) => {
  return (
    <Text
      as="div"
      display="flex"
      alignItems="center"
      justifyContent="center"
      p="6px"
      fontSize="0.75rem"
      lineHeight="0.5rem"
      fontWeight="700"
      shape="pill"
      // width="fit-content"
      // height="fit-content"
      flex="none"
      {...props}
    >
      {children}
    </Text>
  );
};
