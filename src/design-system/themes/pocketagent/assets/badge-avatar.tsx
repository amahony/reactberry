"use client"

import { motion } from "motion/react"
import Box, { BoxProps } from "@/design-system/elements/box"

type BadgeAvatarProps = BoxProps & {
  /** Flip the smile upside down to show a sad face. */
  sad?: boolean
}

export default function BadgeAvatar({ sad = false, ...rest }: BadgeAvatarProps) {
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
      <path
        d="M536 54H429.252C396.248 20.6763 350.496 0 300 0C249.505 0 203.753 20.6763 170.749 54H64C28.6538 54 0 82.6538 0 118V414.03C0 443.503 14.4307 471.108 38.6318 487.931L248.632 633.901C279.514 655.367 320.486 655.367 351.368 633.901L561.368 487.931C585.569 471.108 600 443.503 600 414.03V118C600 82.6538 571.346 54 536 54Z"
        fill="currentColor"
      />
      <path
        d="M515.449 490.621L337.67 614.195C326.559 621.918 313.532 626.001 300 626.001C286.468 626.001 273.441 621.918 262.33 614.195L84.5508 490.621C143.32 426.748 224.172 390 299.999 390C375.828 390 456.68 426.748 515.449 490.621ZM458 182C458 269.122 387.122 340 300 340C212.878 340 142 269.122 142 182C142 94.8784 212.878 24 300 24C387.122 24 458 94.8784 458 182Z"
        fill="white"
      />
      <motion.path
        d="M245.009 239.029C247.229 236.809 250.773 236.679 253.155 238.724C280.05 261.817 319.945 261.817 346.84 238.724C349.218 236.682 352.77 236.813 354.986 239.029L367.749 251.795C368.92 252.966 369.555 254.57 369.504 256.226C369.452 257.882 368.717 259.441 367.476 260.539C328.998 294.553 270.997 294.553 232.519 260.539C231.278 259.442 230.547 257.882 230.495 256.227C230.443 254.572 231.075 252.965 232.245 251.795L245.009 239.029Z"
        fill="currentColor"
        initial={{ scale: 0, scaleY: 0, opacity: 0 }}
        animate={{ scale: 1, scaleY: sad ? -1 : 1, opacity: 1 }}
        transition={{
          duration: 0.5,
          delay: 0.3,
          ease: "backOut",
        }}
        style={{ transformOrigin: "300px 260px", transformBox: "fill-box" }}
      />
    </Box>
  )
}
