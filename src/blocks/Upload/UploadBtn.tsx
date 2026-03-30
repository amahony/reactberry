import React from "react";
import { Button, Box } from "@/design-system/elements";
import { UploadContainerProps } from "./types";
import { IconDotsAnim, IconUpload } from "@/design-system/icons";

function UploadBtn({
  children,
  getRootProps,
  label,
  loading,
  icon,
  buttonProps = {},
}: UploadContainerProps) {
  return (
    <Button
      variant="primary"
      $size="small"
      disabled={loading}
      {...buttonProps}
      {...getRootProps()}
    >
      {loading ? (
        <>
          <Box as={IconDotsAnim} size="1rem" /> Working
        </>
      ) : (
        <>
          <Box as={icon || IconUpload} size="1rem" />
          {label && label}
        </>
      )}

      {children}
    </Button>
  );
}

export default UploadBtn;
