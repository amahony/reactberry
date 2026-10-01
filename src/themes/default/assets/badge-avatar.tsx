"use client"

import { useId } from "react"
import { motion } from "motion/react"
import Box, { BoxProps } from "../../../elements/box"

type Expression =
  | "happy"
  | "sad"
  | "neutral"
  | "surprised"
  | "laugh"
  | "cry"
  | "confused"

type BadgeAvatarProps = BoxProps & {
  /**
   * Character expression:
   * - happy: upward smile (default)
   * - sad: downward frown
   * - neutral: straight line
   * - surprised: open circle
   * - laugh: big open smile
   * - cry: exaggerated downward frown
   * - confused: wavy line
   */
  expression?: Expression
  /** @deprecated Use expression="sad" instead */
  sad?: boolean
  /**
   * When true, the badge shape is filled with the animated teal↔purple
   * gradient. Otherwise it uses `currentColor` (driven by the `color` prop).
   */
  gradient?: boolean
}

export default function BadgeAvatar({
  expression = "happy",
  sad = false,
  gradient = false,
  ...rest
}: BadgeAvatarProps) {
  // Support legacy sad prop for backward compatibility
  const finalExpression: Expression = sad ? "sad" : expression
  // Unique per-instance id so multiple avatars don't share one gradient def
  const gradientId = `badgeGradient-${useId().replace(/:/g, "")}`
  return (
    <Box
      as="svg"
      width="100%"
      height="100%"
      viewBox="0 0 600 650"
      fill="none"
      color="primary"
      xmlns="http://www.w3.org/2000/svg"
      {...rest}
    >
      {gradient && (
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="1">
            <motion.stop
              offset="0%"
              initial={{ stopColor: "#06B6D4" }}
              animate={{ stopColor: ["#06B6D4", "#8B5CF6", "#06B6D4"] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.stop
              offset="100%"
              initial={{ stopColor: "#8B5CF6" }}
              animate={{ stopColor: ["#8B5CF6", "#06B6D4", "#8B5CF6"] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />
          </linearGradient>
        </defs>
      )}
      <path
        d="M536 54H429.252C396.248 20.6763 350.496 0 300 0C249.505 0 203.753 20.6763 170.749 54H64C28.6538 54 0 82.6538 0 118V414.03C0 443.503 14.4307 471.108 38.6318 487.931L248.632 633.901C279.514 655.367 320.486 655.367 351.368 633.901L561.368 487.931C585.569 471.108 600 443.503 600 414.03V118C600 82.6538 571.346 54 536 54Z"
        fill={gradient ? `url(#${gradientId})` : "currentColor"}
      />
      <path
        d="M515.449 490.621L337.67 614.195C326.559 621.918 313.532 626.001 300 626.001C286.468 626.001 273.441 621.918 262.33 614.195L84.5508 490.621C143.32 426.748 224.172 390 299.999 390C375.828 390 456.68 426.748 515.449 490.621ZM458 182C458 269.122 387.122 340 300 340C212.878 340 142 269.122 142 182C142 94.8784 212.878 24 300 24C387.122 24 458 94.8784 458 182Z"
        fill="white"
      />
      {/* Happy/Sad: curved smile/frown */}
      {(finalExpression === "happy" || finalExpression === "sad") && (
        <motion.path
          d="M245.009 239.029C247.229 236.809 250.773 236.679 253.155 238.724C280.05 261.817 319.945 261.817 346.84 238.724C349.218 236.682 352.77 236.813 354.986 239.029L367.749 251.795C368.92 252.966 369.555 254.57 369.504 256.226C369.452 257.882 368.717 259.441 367.476 260.539C328.998 294.553 270.997 294.553 232.519 260.539C231.278 259.442 230.547 257.882 230.495 256.227C230.443 254.572 231.075 252.965 232.245 251.795L245.009 239.029Z"
          fill="currentColor"
          initial={{ scale: 0, scaleY: 0, opacity: 0 }}
          animate={{
            scale: 1,
            scaleY: finalExpression === "sad" ? -1 : 1,
            opacity: 1,
          }}
          transition={{
            duration: 0.5,
            delay: 0.3,
            ease: "backOut",
          }}
          style={{ transformOrigin: "300px 260px", transformBox: "fill-box" }}
        />
      )}

      {/* Neutral: straight horizontal line */}
      {finalExpression === "neutral" && (
        <motion.rect
          x="230"
          y="230"
          width="140"
          height="30"
          rx="10"
          fill="currentColor"
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{
            duration: 0.5,
            delay: 0.3,
            ease: "backOut",
          }}
          style={{ transformOrigin: "300px 260px", transformBox: "fill-box" }}
        />
      )}

      {/* Surprised: open circle */}
      {finalExpression === "surprised" && (
        <motion.circle
          cx="300"
          cy="260"
          r="35"
          fill="currentColor"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{
            duration: 0.5,
            delay: 0.3,
            ease: "backOut",
          }}
          style={{ transformOrigin: "300px 260px", transformBox: "fill-box" }}
        />
      )}

      {/* Laugh: big open smile (wide mouth shape) */}
      {finalExpression === "laugh" && (
        <motion.g transform="translate(215, 210) scale(0.6)">
          <motion.path
            d="M252.209 0.266706C260.783 -1.52926 271.562 6.01733 270.376 14.6973C260.889 84.144 203.997 137.521 135.233 137.521C66.4687 137.521 9.57746 84.144 0.0900693 14.6973C-1.09573 6.01733 9.68283 -1.52926 18.2573 0.266713C36.8796 4.16724 71.8303 8.49689 135.233 8.49689C198.636 8.49689 233.587 4.16723 252.209 0.266706Z"
            fill="currentColor"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              duration: 0.5,
              delay: 0.3,
              ease: "backOut",
            }}
            style={{ transformOrigin: "135px 70px", transformBox: "fill-box" }}
          />
        </motion.g>
      )}

      {/* Cry: flipped laugh (big frown) with tears */}
      {finalExpression === "cry" && (
        <>
          {/* Big frown (inverted laugh mouth) */}
          <motion.g transform="translate(215, 260) scale(0.6, -0.52)">
            <motion.path
              d="M252.209 0.266706C260.783 -1.52926 271.562 6.01733 270.376 14.6973C260.889 84.144 203.997 137.521 135.233 137.521C66.4687 137.521 9.57746 84.144 0.0900693 14.6973C-1.09573 6.01733 9.68283 -1.52926 18.2573 0.266713C36.8796 4.16724 71.8303 8.49689 135.233 8.49689C198.636 8.49689 233.587 4.16723 252.209 0.266706Z"
              fill="currentColor"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{
                duration: 0.5,
                delay: 0.3,
                ease: "backOut",
              }}
              style={{
                transformOrigin: "135px 70px",
                transformBox: "fill-box",
              }}
            />
          </motion.g>
          {/* Tear drops */}
          <motion.circle
            cx="260"
            cy="290"
            r="8"
            fill="currentColor"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: [0, 1, 1, 0] }}
            transition={{
              duration: 1.2,
              delay: 0.6,
              ease: "easeIn",
              repeat: Infinity,
              repeatDelay: 0.3,
            }}
          />
          <motion.circle
            cx="340"
            cy="290"
            r="8"
            fill="currentColor"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: [0, 1, 1, 0] }}
            transition={{
              duration: 1.2,
              delay: 0.8,
              ease: "easeIn",
              repeat: Infinity,
              repeatDelay: 0.3,
            }}
          />
        </>
      )}

      {/* Confused: wavy line */}
      {finalExpression === "confused" && (
        <motion.path
          d="M225 245 Q 240 230, 255 245 T 285 245 Q 300 230, 315 245 T 345 245 Q 360 230, 375 245"
          stroke="currentColor"
          strokeWidth="25"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{
            duration: 0.5,
            delay: 0.3,
            ease: "backOut",
          }}
        />
      )}
    </Box>
  )
}
