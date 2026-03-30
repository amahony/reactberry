"use client";

// Export all component prop types for AI analysis and type checking
export type { BaseElementProps } from "./elements/box";
export type { TextProps } from "./elements/text";
export type { ButtonProps } from "./elements/button";
export type { FieldProps } from "./elements/field";

export type ImageType = {
  id: number;
  url: string;
};

// ============================================================================
// THEME TOKEN TYPES
// ============================================================================

/**
 * Space tokens for spacing (gap, padding, margin, generic size)
 * Used by: gap, p, m, px, py, pt, pb, pl, pr, mx, my, mt, mb, ml, mr, size (on Box/Text)
 */
export type SpaceToken =
  | "mini"   // 4px
  | "xs"     // 8px
  | "s"      // 12px
  | "m"      // 16px (default)
  | "l"      // 24px
  | "xl"     // 32px
  | "xxl"    // 48px
  | "xxxl";  // 64px

/**
 * Font size tokens for typography
 * Used by: fontSize (on Text component)
 */
export type FontSizeToken =
  | "xs"     // 12px - captions, labels
  | "s"      // 14px - secondary text
  | "m"      // 16px - body text (default)
  | "l"      // 20px - large body
  | "xl"     // 24px - headings
  | "xxl"    // 32px - page titles
  | "xxxl";  // 48px - hero text

/**
 * Shape tokens for border radius
 * Used by: shape prop
 */
export type ShapeToken =
  | "square"        // 0px - no rounding
  | "roundedSmall"  // 4px - subtle rounding
  | "rounded"       // 8px - standard rounding (default)
  | "roundedLarge"  // 16px - pronounced rounding
  | "pill"          // 32px - pill shape
  | "circle";       // 50% - circular

/**
 * Skin tokens for predefined styling combinations
 * Used by: skin prop on Box
 */
export type SkinToken =
  // Surface skins
  | "base"       // Base background
  | "surface"    // Secondary surface
  | "card"       // Card with elevation
  | "panel"      // Panel background
  // Semantic skins
  | "primary"    // Primary brand color
  | "secondary"  // Secondary color
  | "error"      // Error state
  | "success"    // Success state
  | "warning"    // Warning state
  | "info"       // Info state
  // Color-coded skins
  | "blue"
  | "green"
  | "red"
  | "yellow"
  | "purple"
  | "orange";

/**
 * Color tokens for text and backgrounds
 * Used by: color, bg props
 */
export type ColorToken =
  | "primary"
  | "secondary"
  | "tertiary"
  | "error"
  | "success"
  | "warning"
  | "info"
  | string; // Allow custom colors but prefer tokens

/**
 * Font weight tokens
 * Used by: fontWeight prop on Text
 */
export type FontWeightToken =
  | "normal"    // 400
  | "medium"    // 500
  | "semibold"  // 600
  | "bold";     // 700

/**
 * Line height tokens
 * Used by: lineHeight prop on Text
 */
export type LineHeightToken =
  | "tight"    // 1.2
  | "normal"   // 1.5 (default)
  | "relaxed"  // 1.75
  | "loose";   // 2

// ============================================================================
// COMPONENT-SPECIFIC TYPES
// ============================================================================

/**
 * CRITICAL: Component size for Button and Field ONLY
 * Used ONLY by: $size prop on Button and Field components
 *
 * DO NOT confuse with SpaceToken or 'size' prop!
 * - Button/Field use: $size="medium" (ComponentSize)
 * - Box/Text use: size="m" (SpaceToken)
 */
export type ComponentSize =
  | "small"   // Compact sizing
  | "medium"  // Default sizing
  | "large";  // Prominent sizing

/**
 * Button variants
 * Used by: variant prop on Button
 */
export type ButtonVariant =
  | "default"    // Default styling
  | "primary"    // Primary CTA
  | "secondary"  // Secondary action
  | "ghost"      // Subtle/minimal
  | "outline";   // Outlined

/**
 * Field variants
 * Used by: variant prop on Field
 */
export type FieldVariant =
  | "default"   // Default styling
  | "outline"   // Outlined input
  | "filled"    // Filled background
  | "unstyled"; // No styling

/**
 * Semantic HTML tags for Text component
 * Used by: as prop on Text
 */
export type TextElement =
  | "h1" | "h2" | "h3" | "h4" | "h5" | "h6"  // Headings
  | "p"                                        // Paragraph
  | "span"                                     // Inline text
  | "label"                                    // Form label
  | "a"                                        // Link
  | "div";                                     // Generic container

/**
 * Form input elements
 * Used by: as prop on Field
 */
export type FieldElement =
  | "input"
  | "textarea"
  | "select";

/**
 * Input types for Field
 * Used by: type prop on Field when as="input"
 */
export type InputType =
  | "text"
  | "email"
  | "password"
  | "number"
  | "tel"
  | "url"
  | "search"
  | "date"
  | "time"
  | "datetime-local"
  | "month"
  | "week"
  | "range"
  | "color"
  | "file";

// ============================================================================
// PROP USAGE GUIDE TYPES
// ============================================================================

/**
 * CRITICAL DISTINCTION: size vs $size
 *
 * This is the #1 source of confusion and errors!
 */
export interface PropUsageGuide {
  /**
   * Box and Text use 'size' for GENERIC spacing
   * Maps to theme space scale (SpaceToken)
   */
  BoxSizeUsage: {
    size?: SpaceToken;  // ✅ CORRECT for Box
    // $size?: never;   // ❌ WRONG for Box
  };

  TextSizeUsage: {
    size?: SpaceToken;  // ✅ CORRECT for Text (generic size)
    fontSize?: FontSizeToken;  // ✅ CORRECT for text sizing
    // $size?: never;   // ❌ WRONG for Text
  };

  /**
   * Button and Field use '$size' for COMPONENT-SPECIFIC sizing
   * Predefined sizes: small, medium, large
   */
  ButtonSizeUsage: {
    $size?: ComponentSize;  // ✅ CORRECT for Button
    // size?: never;        // ❌ WRONG for Button (component sizing)
  };

  FieldSizeUsage: {
    $size?: ComponentSize;  // ✅ CORRECT for Field
    // size?: never;        // ❌ WRONG for Field (component sizing)
  };
}

// ============================================================================
// RESPONSIVE TYPES
// ============================================================================

/**
 * Responsive array for breakpoint values
 * Format: [mobile, tablet, desktop]
 *
 * @example
 * // Mobile 100%, tablet 50%, desktop 33%
 * <Box width={[1, 1/2, 1/3]} />
 *
 * @example
 * // Responsive padding
 * <Box p={['s', 'm', 'l']} />
 */
export type ResponsiveValue<T> = T | [T] | [T, T] | [T, T, T];

/**
 * Common responsive props
 */
export interface ResponsiveProps {
  width?: ResponsiveValue<string | number>;
  height?: ResponsiveValue<string | number>;
  padding?: ResponsiveValue<SpaceToken>;
  margin?: ResponsiveValue<SpaceToken>;
  fontSize?: ResponsiveValue<FontSizeToken>;
  display?: ResponsiveValue<string>;
}

// ============================================================================
// HELPER TYPES
// ============================================================================

/**
 * Common display values
 */
export type DisplayValue =
  | "flex"
  | "grid"
  | "block"
  | "inline-block"
  | "inline-flex"
  | "inline"
  | "none";

/**
 * Common cursor values
 */
export type CursorValue =
  | "pointer"
  | "default"
  | "not-allowed"
  | "text"
  | "move"
  | "grab"
  | "grabbing";

/**
 * Hover states
 */
export type HoverState =
  | "subtle"   // Subtle highlight
  | "lift"     // Lift with shadow
  | "glow";    // Glow effect

/**
 * Focus states
 */
export type FocusState =
  | "highlight"  // Highlight border
  | "ring"       // Focus ring
  | "none";      // No focus style

// ============================================================================
// USAGE EXAMPLES (FOR DOCUMENTATION)
// ============================================================================

/**
 * Example usage interfaces (for documentation purposes)
 */
export interface UsageExamples {
  // ✅ CORRECT EXAMPLES
  correctBoxUsage: {
    display: "flex";
    gap: SpaceToken;      // ✅ Use theme token
    p: SpaceToken;        // ✅ Use theme token
    size: SpaceToken;     // ✅ Use 'size' not '$size' for Box
  };

  correctTextUsage: {
    as: TextElement;           // ✅ ALWAYS specify for semantic HTML
    fontSize: FontSizeToken;   // ✅ Use theme token
    fontWeight: FontWeightToken;
    color: ColorToken;
  };

  correctButtonUsage: {
    variant: ButtonVariant;
    $size: ComponentSize;      // ✅ Use '$size' (with $) for Button
    // NOT 'size'               // ❌ Common mistake
  };

  correctFieldUsage: {
    as: FieldElement;
    type?: InputType;
    variant: FieldVariant;
    $size: ComponentSize;      // ✅ Use '$size' (with $) for Field
    // NOT 'size'               // ❌ Common mistake
  };

  // ❌ INCORRECT EXAMPLES (DON'T DO THIS)
  incorrectExamples: {
    // Wrong: Using Box for text
    // <Box as="h1" fontSize="xl">Title</Box>
    // Should be: <Text as="h1" fontSize="xl">Title</Text>

    // Wrong: Using arbitrary values
    // <Box p="16px" gap={8} />
    // Should be: <Box p="m" gap="xs" />

    // Wrong: Using 'size' on Button
    // <Button size="medium">Click</Button>
    // Should be: <Button $size="medium">Click</Button>

    // Wrong: Using '$size' on Box
    // <Box $size="m">Content</Box>
    // Should be: <Box size="m">Content</Box>

    // Wrong: Missing 'as' on Text
    // <Text fontSize="xl">Heading</Text>
    // Should be: <Text as="h1" fontSize="xl">Heading</Text>
  };
}

// ============================================================================
// TYPE GUARDS (HELPER FUNCTIONS)
// ============================================================================

/**
 * Check if a value is a valid SpaceToken
 */
export function isSpaceToken(value: any): value is SpaceToken {
  return ["mini", "xs", "s", "m", "l", "xl", "xxl", "xxxl"].includes(value);
}

/**
 * Check if a value is a valid ComponentSize
 */
export function isComponentSize(value: any): value is ComponentSize {
  return ["small", "medium", "large"].includes(value);
}

/**
 * Check if a value is a valid FontSizeToken
 */
export function isFontSizeToken(value: any): value is FontSizeToken {
  return ["xs", "s", "m", "l", "xl", "xxl", "xxxl"].includes(value);
}
