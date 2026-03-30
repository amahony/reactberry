import React, { useMemo } from "react";
import { useDropzone } from "react-dropzone";
import Dropzone from "./Dropzone";
import UploadBtn from "./UploadBtn";
import { UploadProps } from "./types";

function Upload({
  type = "button",
  label,
  icon,
  accept,
  onDropAccepted,
  onDropRejected,
  dropzoneProps,
  loading,
  buttonProps,
  dropzoneContainerProps,
  ...rest
}: UploadProps) {
  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    accept,
    onDropAccepted,
    onDropRejected,
    disabled: loading,
    ...rest,
  });

  const UploadContainer = useMemo(() => {
    switch (type) {
      case "dropzone":
        return Dropzone;
      case "button":
        return UploadBtn;
    }
  }, [type]);

  return (
    <UploadContainer
      label={label}
      icon={icon}
      dropzoneProps={dropzoneProps}
      loading={loading}
      getRootProps={getRootProps}
      isDragActive={isDragActive}
      isDragAccept={isDragAccept}
      isDragReject={isDragReject}
      buttonProps={buttonProps}
      dropzoneContainerProps={dropzoneContainerProps}
    >
      <input {...getInputProps()} />
    </UploadContainer>
  );
}

export default Upload;
