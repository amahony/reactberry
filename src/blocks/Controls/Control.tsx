import { motion } from "motion/react";

import Box, { BoxProps } from "../../elements/box";
import { IconArrowLeft, IconArrowRight } from "../../icons";
// import { IconDownloadData } from "../../icons";
// import { IconLaunch } from "../../icons";

interface ControlProps extends BoxProps {
  children: React.ReactNode;
  as?: any;
  href?: string;
  target?: string;
  title?: string;
  rel?: string;
  onClick?: () => void;
  [key: string]: any;
}

const btnvariants = {
  initial: {},
  active: {},
};

export function Control({ children, ...props }: ControlProps) {
  return (
    <Box
      as={motion.div}
      variants={btnvariants}
      position={"absolute"}
      top="calc(50% - 1.25rem)"
      left="0"
      bg="white"
      $shadow="small"
      size="2.5rem"
      p="xsmall"
      shape="circle"
      cursor="pointer"
      color="black"
      zIndex={99}
      initial="initial"
      animate="initial"
      whileHover="active"
      display="flex"
      alignItems="center"
      opacity={1}
      justifyContent="center"
      {...props}
    >
      {children}
    </Box>
  );
}

export function ControlLeft({ ...props }: any) {
  return (
    <Control {...props}>
      <Box as={IconArrowLeft} size="1.125rem" />
    </Control>
  );
}
export function ControlRight({ ...props }: any) {
  return (
    <Control {...props}>
      <Box as={IconArrowRight} size="1.125rem" />
    </Control>
  );
}
