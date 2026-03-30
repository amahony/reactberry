"use client";
import {
  Dialog,
  DialogProps,
  DialogPanel,
  DialogBackdrop,
} from "@headlessui/react";
import { useRef, useState } from "react";
import Box, { BoxProps } from "@/design-system/elements/box";
import { useRouter } from "next/navigation";

type ModalProps = DialogProps<any> &
  BoxProps & {
    initial?: boolean;
    goBack?: boolean;
    children: React.ReactNode;
    onClose?: any;
    panelProps?: any;
    backdropProps?: any;
  };

export default function Modal({
  initial = false,
  goBack = true,
  children,
  onClose = () => null,
  panelProps,
  backdropProps,
  ...props
}: ModalProps) {
  const [isOpen, setIsOpen] = useState(initial);
  const overlayRef = useRef(null);
  const router = useRouter();

  function handleClose() {
    if (goBack) return router.back();
    setIsOpen(false);
  }

  return (
    <Box
      as={Dialog}
      open={isOpen}
      onClose={onClose || handleClose}
      position="fixed"
      top="0"
      left="0"
      width="100%"
      height="100%"
      display="flex"
      alignItems="center"
      justifyContent="center"
      zIndex="99999"
      {...props}
    >
      <Box
        as={DialogPanel}
        position="relative"
        width="100%"
        maxWidth="80rem"
        maxHeight="90vh"
        mx="auto"
        {...panelProps}
      >
        {children}
      </Box>
      <Box
        as={DialogBackdrop}
        ref={overlayRef}
        key="backdrop"
        bg="rgba(0,0,0,0.6)"
        position="fixed"
        top="0"
        left="0"
        width="100%"
        height="100%"
        zIndex="-1"
        style={{ backdropFilter: "blur(10px)" }}
        {...backdropProps}
      />
    </Box>
  );
}
