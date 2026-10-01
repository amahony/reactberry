"use client";
import {
  isValidElement,
  useState,
  type ComponentType,
  type ReactElement,
} from "react";

import Box, { BoxProps } from "../../elements/box";
import Text from "../../elements/text";
import { pickColor } from "../../utils/pickColor";
import Icon from "../Icon";
import Image from "next/image";

/**
 * `icon` accepts a registered icon name (resolved through the design-system
 * `Icon` component), a React component (e.g. an imported SVG component) or
 * an already-rendered element. When omitted, Avatar falls back to the default
 * user silhouette.
 */
type AvatarIcon = string | ComponentType<any> | ReactElement;

interface AvatarProps extends BoxProps {
  autocolor?: boolean;
  name?: string | undefined;
  type?: "text" | "icon" | "image";
  src?: string; // image URL for type="image"
  alt?: string; // alt text for accessibility
  withPresence?: boolean;
  fontSize?: string;
  /** Icon source used when `type="icon"`. Falls back to the silhouette. */
  icon?: AvatarIcon;
  /** Additional props forwarded to the rendered icon node. */
  iconProps?: { [key: string]: any };
  /**
   * Rendered instead of the image when `type="image"` has no `src` or the
   * image fails to load (broken URL, expired signature, offline host).
   */
  fallbackType?: "text" | "icon";
  status?: {
    label: string;
    color: string;
    border: string;
    size?: string;
  } | null;
  [key: string]: any;
}

const defaultProps = {
  display: "inline-flex",
  name: "Aa",
  shape: "circle",
  flex: "none",
  overflow: "hidden",
};

const transformStyle = {
  transform: "translate(25%, 25%)",
};

function getUserInitials(name?: string) {
  if (!name) return "Aa";
  const [first, last] = name.split(" ");
  return last
    ? `${first[0].toUpperCase()}${last[0].toUpperCase()}`
    : first.slice(0, 2).toUpperCase();
}

/**
 * Identity of an image ignoring the query string. Avatar URLs are presigned
 * (a fresh signature on every refetch), so the query must not be part of the
 * key or a known-broken image would be retried after each refetch.
 */
function getImageKey(src?: string) {
  return src ? src.split("?")[0] : "";
}

// Shared across instances so a remount (list re-render, popover reopen) does
// not retry an image that already failed this session.
const failedImageKeys = new Set<string>();

const Avatar: React.FC<AvatarProps> = (props) => {
  const {
    autocolor = true,
    name = "Aa",
    color,
    type = "text",
    src,
    alt,
    withPresence = false,
    status = { label: "online", color: "green", border: "surface" },
    size,
    fontSize = "75%",
    statusProps = {},
    icon,
    iconProps = {},
    fallbackType = "icon",
    ...restProps
  } = props;

  // A broken image URL would otherwise leave an empty circle showing the raw
  // alt text, so fall back to the initials/silhouette rendering instead.
  // Tracking the failed key (not the full URL) keeps the fallback stable
  // across refetches that only change the presigned signature.
  const imageKey = getImageKey(src);
  const [failedKey, setFailedKey] = useState<string | null>(null);

  const imageFailed =
    Boolean(src) && (failedKey === imageKey || failedImageKeys.has(imageKey));
  const resolvedType =
    type === "image" && (!src || imageFailed) ? fallbackType : type;

  const renderIcon = () => {
    if (!icon) return null;
    if (typeof icon === "string") {
      return <Icon icon={icon} color="white" {...iconProps} />;
    }
    if (isValidElement(icon)) return icon;
    return <Box as={icon as ComponentType<any>} color="white" {...iconProps} />;
  };

  return (
    <Box display="inline-flex" alignItems={"center"} position={"relative"}>
      <Box
        {...defaultProps}
        color={autocolor ? pickColor(String(name)) : color || "neutral"}
        name={name}
        position="relative"
        size={size || "2.5rem"}
        {...restProps}
      >
        {resolvedType === "image" && src && (
          <Box
            as={Image}
            backgroundColor={"dark"}
            src={src}
            loading="eager"
            placeholder="blur"
            blurDataURL={
              "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mM8feRIPQAHiQLUpr/inAAAAABJRU5ErkJggg=="
            }
            alt={alt || name || "avatar"}
            fill
            sizes="100%"
            style={{ objectFit: "cover" }}
            onError={() => {
              failedImageKeys.add(imageKey);
              setFailedKey(imageKey);
            }}
          />
        )}

        {resolvedType === "text" && (
          <Box
            width="100%"
            height="100%"
            bg="currentColor"
            display={"flex"}
            alignItems={"center"}
            justifyContent={"center"}
          >
            <Text color="white" fontSize={fontSize} fontWeight="800">
              {getUserInitials(name)}
            </Text>
          </Box>
        )}

        {resolvedType === "icon" &&
          (icon ? (
            <Box
              width="100%"
              height="100%"
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              {renderIcon()}
            </Box>
          ) : (
            <svg
              fill="currentColor"
              width="100%"
              height="100%"
              viewBox="0 0 100 100"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g>
                <rect x="0" y="0" width="100" height="100" />
                <path
                  d="M30.224 36.982C30.224 25.964 39.319 17 50.5 17c11.18 0 20.276 8.964 20.276 19.982v4.996c0 11.019-9.095 19.983-20.276 19.983-11.18 0-20.276-8.964-20.276-19.983v-4.996zM84 98.198c0 .924-.75 1.67-1.675 1.67h-63.65c-.925 0-1.675-.746-1.675-1.67v-3.34c0-14.737 12.023-26.726 26.8-26.726h13.4c14.777 0 26.8 11.99 26.8 26.725v3.341z"
                  fill="white"
                  fillRule="nonzero"
                />
              </g>
            </svg>
          ))}
      </Box>

      {withPresence && status && (
        <Box
          bg={status.color}
          position="absolute"
          size={size ? `calc(${status.size || size} / 2.5)` : "0.625rem"}
          shape="circle"
          bottom="0"
          top="auto"
          left="auto"
          right="0"
          zIndex="1"
          border="0.125em solid"
          borderColor={status.border || "surface"}
          style={transformStyle}
          {...statusProps}
        />
      )}
    </Box>
  );
};

export default Avatar;
