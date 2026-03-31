"use client";
import Box, { BoxProps } from "../../elements/box";
import Text from "../../elements/text";
import { pickColor } from "../../utils/pickColor";
import Image from "next/image";

interface AvatarProps extends BoxProps {
  autocolor?: boolean;
  name?: string | undefined;
  type?: "text" | "icon" | "image"; // Add "image" to possible types
  src?: string; // Add src prop for image URL
  alt?: string; // Add alt text for accessibility
  withPresence?: boolean;
  fontSize?: string;
  status?: {
    label: string;
    color: string;
    border: string;
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

function getUserInitials(name?: string) {
  if (!name) return "Aa";
  const [first, last] = name.split(" ");
  return last
    ? `${first[0].toUpperCase()}${last[0].toUpperCase()}`
    : first.slice(0, 2).toUpperCase();
}

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
    ...restProps
  } = props;

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
        {type === "image" && src && (
          <Box
            as={Image}
            backgroundColor={"white"}
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
          />
        )}

        {/*old way*/}
        {/*{type === "text" && (
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
              <text
                x="50%"
                y="50%"
                dy="4%"
                //alignmentBaseline="baseline"
                dominantBaseline="middle"
                textAnchor="middle"
                fill="white"
                fontFamily="sans-serif"
                fontWeight="700"
                fontSize={fontSize}
              >
                {getUserInitials(name)}
              </text>
            </g>
          </svg>
        )}*/}

        {type === "text" && (
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

        {type === "icon" && (
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
        )}
      </Box>

      {withPresence && status && (
        <Box
          bg={status.color}
          position="absolute"
          size={size ? `calc(${size} / 2.5)` : "0.625rem"}
          maxWidth={"1rem"}
          maxHeight={"1rem"}
          shape="circle"
          bottom="0"
          left="auto"
          right={`calc(${size} / 7.5 * -1)`}
          zIndex="1"
          border="1.5px solid"
          borderColor="surface"
        />
      )}
    </Box>
  );
};

export default Avatar;
