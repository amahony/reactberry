"use client";

import React from "react";
import { Box, Text, Button } from "../../elements";
import { Container } from "..";
import FamilyDrawer from "./index";

/**
 * Example usage of the FamilyDrawer component
 * 
 * This demonstrates how to use the FamilyDrawer with:
 * - Default trigger button
 * - Custom trigger button
 * - View change callback
 * - Custom width
 */
export const FamilyDrawerExample: React.FC = () => {
  const handleViewChange = (view: string) => {
    console.log("View changed to:", view);
  };

  return (
    <Container maxWidth="800px" p="large">
      <Box display="flex" flexDirection="column" gap="large">
        <Box>
          <Text as="h1" fontSize="xxlarge" fontWeight="bold" mb="medium">
            FamilyDrawer Examples
          </Text>
          <Text fontSize="medium" color="secondary" lineHeight="relaxed">
            Interactive drawer component with multiple views for wallet management.
          </Text>
        </Box>

        <Box
          display="flex"
          flexDirection="column"
          gap="large"
          p="large"
          skin="card"
          shape="rounded"
        >
          <Box>
            <Text as="h2" fontSize="large" fontWeight="semibold" mb="small">
              Default Usage
            </Text>
            <Text fontSize="small" color="secondary" mb="medium">
              Basic FamilyDrawer with default settings and trigger button.
            </Text>
            <FamilyDrawer id="example-1" />
          </Box>

          <Box>
            <Text as="h2" fontSize="large" fontWeight="semibold" mb="small">
              Custom Trigger
            </Text>
            <Text fontSize="small" color="secondary" mb="medium">
              FamilyDrawer with a custom trigger button.
            </Text>
            <FamilyDrawer
              id="example-2"
              trigger={
                <Button variant="primary" $size="small">
                  <Text fontSize="small" fontWeight="semibold">
                    Wallet Options
                  </Text>
                </Button>
              }
            />
          </Box>

          <Box>
            <Text as="h2" fontSize="large" fontWeight="semibold" mb="small">
              With Callbacks
            </Text>
            <Text fontSize="small" color="secondary" mb="medium">
              FamilyDrawer with view change callback and custom width.
            </Text>
            <FamilyDrawer
              id="example-3"
              onViewChange={handleViewChange}
              width="400px"
              initialView="default"
            />
          </Box>
        </Box>

        <Box
          p="medium"
          skin="translucent"
          shape="rounded"
          borderLeft="4px solid"
          borderColor="primary"
        >
          <Text fontSize="small" fontWeight="semibold" color="primary" mb="xsmall">
            Usage Notes
          </Text>
          <Text fontSize="small" color="secondary" lineHeight="relaxed">
            Each FamilyDrawer instance requires a unique <code>id</code> prop for proper state management.
            The drawer uses the existing Drawer component from the design system with smooth animations
            between different views.
          </Text>
        </Box>
      </Box>
    </Container>
  );
};

export default FamilyDrawerExample;
