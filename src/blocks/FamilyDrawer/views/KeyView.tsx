"use client";

import React from "react";
import { Box, Button, Text } from "@/design-system/elements";
import {
  IconBan,
  IconCCheck,
  IconLock,
  IconOWarning,
  IconUserFocus,
} from "@/design-system/icons";
import { FamilyDrawerView } from "../index";

interface KeyViewProps {
  setView: (view: FamilyDrawerView) => void;
}

export const KeyView: React.FC<KeyViewProps> = ({ setView }) => {
  return (
    <Box>
      <ViewHeader
        icon={<Box as={IconLock} size="2.5rem" color="secondary" />}
        title="Private Key"
        description="Your Private Key is the key used to back up your wallet. Keep it secret and secure at all times."
      />

      <Box
        mt="medium"
        pt="medium"
        borderTop="1px solid"
        borderColor="base"
      >
        <Box display="flex" flexDirection="column" gap="medium">
          <SecurityItem
            icon={<Box as={IconCCheck} size="1.25rem" />}
            text="Keep your private key safe"
          />
          <SecurityItem
            icon={<Box as={IconBan} size="1.25rem" />}
            text="Don't share it with anyone else"
          />
          <SecurityItem
            icon={<Box as={IconOWarning} size="1.25rem" />}
            text="If you lose it, we can't recover it"
          />
        </Box>
      </Box>

      <Box mt="large" display="flex" gap="medium">
        <Button
          variant="ghost"
          $size="medium"
          onClick={() => setView("default")}
          flex="1"
          skin="translucent"
        >
          <Text fontSize="medium" fontWeight="semibold">
            Cancel
          </Text>
        </Button>
        <Button
          variant="primary"
          $size="medium"
          onClick={() => setView("default")}
          flex="1"
          display="flex"
          alignItems="center"
          gap="small"
        >
          <Box as={IconUserFocus} size="1.25rem" />
          <Text fontSize="medium" fontWeight="semibold">
            Reveal
          </Text>
        </Button>
      </Box>
    </Box>
  );
};

interface ViewHeaderProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const ViewHeader: React.FC<ViewHeaderProps> = ({ icon, title, description }) => {
  return (
    <Box>
      <Box display="flex" alignItems="flex-start" justifyContent="space-between">
        {icon}
      </Box>
      <Text
        as="h2"
        fontSize="xlarge"
        fontWeight="semibold"
        color="primary"
        mt="small"
      >
        {title}
      </Text>
      <Text
        fontSize="medium"
        color="secondary"
        lineHeight="relaxed"
        mt="small"
      >
        {description}
      </Text>
    </Box>
  );
};

interface SecurityItemProps {
  icon: React.ReactNode;
  text: string;
}

const SecurityItem: React.FC<SecurityItemProps> = ({ icon, text }) => {
  return (
    <Box display="flex" alignItems="center" gap="medium">
      <Box color="secondary">
        {icon}
      </Box>
      <Text fontSize="small" fontWeight="medium" color="secondary">
        {text}
      </Text>
    </Box>
  );
};
