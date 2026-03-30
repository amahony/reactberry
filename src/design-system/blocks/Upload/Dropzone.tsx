"use client";
import React from "react";
import styled from "styled-components";
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

const DropzoneContainer = styled(Box)`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 0.25rem;
  border-width: 1.5px;
  border-radius: 8px;
  border-style: dashed;
  outline: none;
  transition: border 0.24s ease-in-out;
`;

function Dropzone({
  getRootProps,
  isDragActive,
  isDragAccept,
  isDragReject,
  label = "",
  dropzoneProps = {},
  children,
  dropzoneContainerProps = {},
}: UploadContainerProps) {
  const { imgSrc, showPreview, icon, title, description } = dropzoneProps;

  return (
    <DropzoneContainer
      {...getRootProps()}
      skin={getColor({ isDragActive, isDragAccept, isDragReject })}
      {...dropzoneContainerProps}
      style={{
        cursor: "pointer",
        padding: showPreview && imgSrc ? 0 : "2rem",
        ...dropzoneContainerProps?.style,
      }}
    >
      {showPreview && imgSrc ? (
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
          <Text fontSize="small" color="secondary">
            {description || label || (
              <>
                Drag and drop files here, or <b>click to select files</b>
              </>
            )}
          </Text>
        </>
      )}
      {children}
    </DropzoneContainer>
  );
}

export default Dropzone;
