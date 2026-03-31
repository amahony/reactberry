"use client";

import React from "react";
import { Box, Button, Text } from "../../../elements";
import { IconLock, IconOWarning, IconText } from "../../../icons";
import { FamilyDrawerView } from "../index";

interface DefaultViewProps {
  setView: (view: FamilyDrawerView) => void;
}

export const DefaultView: React.FC<DefaultViewProps> = ({ setView }) => {
  return (
    <Box>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        borderBottom="1px solid"
        borderColor="base"
        pb="medium"
        mb="medium"
      >
        <Text fontSize="large" fontWeight="semibold" color="primary">
          Options
        </Text>
      </Box>

      <Box display="flex" flexDirection="column" gap="small">
        <OptionButton
          title="View Private Key"
          icon={<Box as={IconLock} size="1.25rem" />}
          onClick={() => setView("key")}
        />
        <OptionButton
          title="View Recovery Phrase"
          icon={<Box as={IconText} size="1.25rem" />}
          onClick={() => setView("phrase")}
        />
        <OptionButton
          title="Remove Wallet"
          icon={<Box as={IconOWarning} size="1.25rem" />}
          onClick={() => setView("remove")}
          isDestructive
        />
      </Box>
    </Box>
  );
};

interface OptionButtonProps {
  title: string;
  icon: React.ReactNode;
  onClick: () => void;
  isDestructive?: boolean;
}

const OptionButton: React.FC<OptionButtonProps> = ({
  title,
  icon,
  onClick,
  isDestructive = false,
}) => {
  return (
    <Button
      variant="ghost"
      $size="large"
      onClick={onClick}
      display="flex"
      alignItems="center"
      justifyContent="flex-start"
      gap="medium"
      p="medium"
      shape="rounded"
      skin={isDestructive ? "danger" : "translucent"}
      color={isDestructive ? "danger" : "secondary"}
      hover={isDestructive ? "danger" : "subtle"}
      interactive={{
        hover: {
          color: isDestructive ? "danger" : "primary",
        }
      }}
      width="100%"
    >
      <Box color={isDestructive ? "danger" : "secondary"}>
        {icon}
      </Box>
      <Text fontSize="medium" fontWeight="medium">
        {title}
      </Text>
    </Button>
  );
};
