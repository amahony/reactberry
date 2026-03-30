"use client";

import React from "react";
import { Box, Button, Text } from "@/design-system/elements";
import { IconOWarning } from "@/design-system/icons";
import { FamilyDrawerView } from "../index";

interface RemoveViewProps {
  setView: (view: FamilyDrawerView) => void;
}

export const RemoveView: React.FC<RemoveViewProps> = ({ setView }) => {
  return (
    <Box>
      <ViewHeader
        icon={<Box as={IconOWarning} size="2.5rem" color="danger" />}
        title="Are you sure?"
        description="You haven't backed up your wallet yet. If you remove it, you could lose access forever. We suggest tapping and backing up your wallet first with a valid recovery method."
      />

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
          skin="danger"
          color="white"
        >
          <Text fontSize="medium" fontWeight="semibold">
            Continue
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
