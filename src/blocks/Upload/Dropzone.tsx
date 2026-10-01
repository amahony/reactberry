"use client";
import React from "react";
import { Box, Text } from "../../elements";
import Image from "next/image";
import { UploadContainerProps } from "./types";

const getColor = (props: any) => {
  if (props.isDragAccept) {
    return "success.subtle";
  }

  if (props.isDragReject) {
    return "error.subtle";
  }

  if (props.isDragActive) {
    return "info.subtle";
  }

  return "brand.subtle";
};

function Dropzone({
  getRootProps,
  isDragActive,
  isDragAccept,
  isDragReject,
  label = "",
  loading = false,
  dropzoneProps = {},
  children,
  dropzoneContainerProps = {},
}: UploadContainerProps) {
  const { imgSrc, showPreview, icon, title, description } = dropzoneProps;

  return (
    <Text
      as="div"
      {...getRootProps()}
      flex={1}
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      textAlign="center"
      borderWidth="1.5px"
      borderStyle="dashed"
      shape="rounded"
      cursor={loading ? "wait" : "pointer"}
      skin={getColor({ isDragActive, isDragAccept, isDragReject })}
      // p={showPreview && imgSrc ? 0 : "2rem"}
      style={{
        outline: "none",
        transition: "border 0.24s ease-in-out",
        cursor: loading ? "default" : "pointer",
        padding: showPreview && imgSrc ? 0 : "2rem",
        opacity: loading ? 0.7 : 1,
        ...dropzoneContainerProps?.style,
      }}
      {...dropzoneContainerProps}
    >
      {loading ? (
        <Box display="flex" flexDirection="column" alignItems="center" gap="s">
          <Box
            as="span"
            display="inline-block"
            size="1.5rem"
            border="2px solid"
            borderColor="transparent.light.3"
            borderTop="2px solid"
            borderTopColor="primary"
            borderRadius="50%"
            style={{
              animation: "spin 0.8s linear infinite",
            }}
          />
          <Text fontSize="s" color="secondary">
            Processing…
          </Text>
          <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        </Box>
      ) : showPreview && imgSrc ? (
        <Image src={imgSrc} alt="dropzone-result" style={{ width: "100%" }} />
      ) : (
        <>
          {icon && <Box mb="s">{icon}</Box>}
          {title && (
            <Text
              as="h3"
              fontSize="m"
              fontWeight={600}
              mb={description ? "xs" : "0"}
              color="primary"
            >
              {title}
            </Text>
          )}
          <Text color="secondary">
            {description || label || (
              <>
                Drag and drop files here, or <b>click to select files</b>
              </>
            )}
          </Text>
        </>
      )}
      {children}
    </Text>
  );
}

export default Dropzone;
