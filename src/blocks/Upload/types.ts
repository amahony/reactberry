import { DropzoneOptions, DropzoneRootProps } from "react-dropzone";

export type UploadComponent = "button" | "dropzone";
export type DropzoneProps = {
  showPreview?: boolean;
  imgSrc?: string;
  /** Optional icon node to render inside the dropzone empty state */
  icon?: React.ReactNode;
  /** Optional title/heading for the dropzone empty state */
  title?: string | React.ReactNode;
  /** Optional description text under the title; falls back to label */
  description?: string | React.ReactNode;
};

export type UploadContainerProps = {
  getRootProps: <T extends DropzoneRootProps>(props?: T) => T;
  label?: string | React.ReactNode;
  isDragActive: boolean;
  isDragAccept: boolean;
  isDragReject: boolean;
  dropzoneProps?: Partial<DropzoneProps>;
  children: any;
  loading?: boolean;
  icon?: React.ReactNode;
  buttonProps?: any;
  dropzoneContainerProps?: any;
};

export type UploadProps = Partial<DropzoneOptions> & {
  type?: UploadComponent;
  label?: string | React.ReactNode;
  icon?: any;
  dropzoneProps?: Partial<DropzoneProps>;
  loading?: boolean;
  buttonProps?: any;
  dropzoneContainerProps?: any;
};
