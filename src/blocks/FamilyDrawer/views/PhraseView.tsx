"use client";

import React, { useState } from "react";
import { Box, Button, Text } from "../../../elements";
import {
  IconBan,
  IconCCheck,
  IconOWarning,
  IconText,
  IconUserFocus,
} from "../../../icons";
import { FamilyDrawerView } from "../index";

interface PhraseViewProps {
  setView: (view: FamilyDrawerView) => void;
  secret?: string;
  onReveal?: () => void;
}

export const PhraseView: React.FC<PhraseViewProps> = ({ setView, secret, onReveal }) => {
  const [revealed, setRevealed] = useState(false);

  return (
    <Box>
      <ViewHeader
        icon={<Box as={IconText} size="2.5rem" color="secondary" />}
        title="Secret Recovery Phrase"
        description="Your Secret Recovery Phrase is the key used to back up your wallet. Keep it secret at all times."
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
            text="Keep your Secret Phrase safe"
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

      {revealed && secret ? (
        <Box
          as="code"
          display="block"
          mt="medium"
          p="medium"
          shape="rounded"
          skin="surface"
          fontSize="small"
          style={{ wordBreak: "break-word" }}
        >
          {secret}
        </Box>
      ) : null}

      <Box mt="large" display="flex" gap="medium">
        {revealed ? (
          <Button
            variant="primary"
            $size="medium"
            onClick={() => setView("default")}
            flex="1"
          >
            <Text fontSize="medium" fontWeight="semibold">
              Done
            </Text>
          </Button>
        ) : (
          <>
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
              onClick={() => {
                setRevealed(true);
                onReveal?.();
              }}
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
          </>
        )}
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
