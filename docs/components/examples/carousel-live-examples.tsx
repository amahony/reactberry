"use client";

import { useState } from "react";
import { Carousel } from "@reactberry/system/blocks";
import { Box, Button, Text } from "@reactberry/system/elements";

const featuredCards = [
  { title: "Starter kit", description: "A compact slide with headline, copy, and action.", action: "Open starter" },
  { title: "Design review", description: "Use Carousel when you need to scan rich cards horizontally.", action: "Review cards" },
  { title: "Launch checklist", description: "Slides can contain the same Reactberry primitives used elsewhere.", action: "View checklist" },
];

const workflowSteps = [
  { label: "Step 1", title: "Collect inputs" },
  { label: "Step 2", title: "Draft layout" },
  { label: "Step 3", title: "Refine theme" },
  { label: "Step 4", title: "Ship UI" },
];

export default function CarouselLiveExamples() {
  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <Box display="flex" flexDirection="column" gap="l">
      <Box display="flex" flexDirection="column" gap="s">
        <Text as="h3" fontSize="l" fontWeight="700" m="0">
          Example 1: card carousel
        </Text>
        <Text as="p" color="secondary" m="0">
          A common pattern is a horizontally scrollable row of feature cards with built-in arrows.
        </Text>
        <Carousel
          gap="m"
          items={featuredCards.map((card) => (
            <Box
              key={card.title}
              minWidth="280px"
              width="280px"
              p="m"
              skin="surface"
              shape="rounded"
              display="flex"
              flexDirection="column"
              gap="s"
            >
              <Text as="h4" fontSize="l" fontWeight="700" m="0">
                {card.title}
              </Text>
              <Text as="p" color="secondary" m="0">
                {card.description}
              </Text>
              <Button variant="default">{card.action}</Button>
            </Box>
          ))}
          containerProps={{ pb: "s" }}
        />
      </Box>

      <Box display="flex" flexDirection="column" gap="s">
        <Text as="h3" fontSize="l" fontWeight="700" m="0">
          Example 2: tracked progress carousel
        </Text>
        <Text as="p" color="secondary" m="0">
          You can listen to `onScroll` to keep external UI in sync with the active slide.
        </Text>
        <Text as="p" fontSize="s" color="tertiary" m="0">
          Current slide: {currentIndex + 1} / {workflowSteps.length}
        </Text>
        <Carousel
          gap="s"
          showScrollbar
          showArrows={false}
          onScroll={setCurrentIndex}
          items={workflowSteps.map((step) => (
            <Box
              key={step.label}
              minWidth="220px"
              width="220px"
              p="m"
              border="1px solid"
              borderColor="palette.neutrals.3"
              shape="rounded"
              display="flex"
              flexDirection="column"
              gap="xs"
            >
              <Text as="p" fontSize="xs" color="tertiary" textTransform="uppercase" m="0">
                {step.label}
              </Text>
              <Text as="p" fontWeight="700" m="0">
                {step.title}
              </Text>
            </Box>
          ))}
          containerProps={{ pb: "s" }}
        />
      </Box>
    </Box>
  );
}
