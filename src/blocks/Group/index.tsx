"use client"
import Box, { BoxProps } from "@/design-system/elements/box"
import React from "react"
import styled, { css } from "styled-components"

interface GroupProps extends BoxProps {
  type?: "buttons" | "avatars" | "tabs"
  vertical?: boolean
  children?: React.ReactNode
  className?: string
  [key: string]: any
}

const HorizontalButtons = css`
  > .button {
    text-align: center;
    border-radius: 0;
    margin: 0;
    align-items: center;
    margin-left: -1px;
    z-index: 1;
  }
  .dropdown > :first-child {
    text-align: center;
    border-radius: 0;
    margin: 0;
    align-items: center;
    margin-left: -1px;
    z-index: 1;
  }
  > :first-child {
    border-top-left-radius: 8px;
    border-bottom-left-radius: 8px;
    margin-left: 0;
  }
  .dropdown:first-child {
    > :first-child {
      border-top-left-radius: 8px;
      border-bottom-left-radius: 8px;
      margin-left: 0;
    }
  }
  > :last-child {
    border-top-right-radius: 8px;
    border-bottom-right-radius: 8px;
  }
  .dropdown:last-child {
    > :first-child {
      border-top-right-radius: 8px;
      border-bottom-right-radius: 8px;
    }
  }
  > :hover {
    z-index: 2;
  }
`

const VerticalButtons = css`
  > * {
    justify-content: center;
  }
  > *:first-child {
    border-radius: 8px 8px 0 0;
  }
  > *:last-child {
    border-radius: 0 0 8px 8px;
  }
`

const HorizontalTabs = css`
  > * {
    text-align: center;
    align-items: center;
    border: 1px solid transparent;
  }
  > *:first-child {
    border-radius: 8px 0 0 0;
  }
`

const VerticalTabs = css`
  > * {
    width: 100%;
  }
  > *:first-child {
    border-radius: 0;
  }
`

const HorizontalAvatars = css`
  flex-direction: row-reverse;
  > div {
    /*border: 2px solid transparent;*/
    margin-right: -0.75em;
    transition: 0.125s ease-in-out;
    z-index: 0;
  }
  &:hover {
    > div {
      &:hover {
        /*border: 2px solid transparent;*/
        transform: scale(1.05);
        z-index: 1;
      }
    }
  }
`

const VerticalAvatars = css`
  justify-content: center;
`

const StyledBox = styled(Box)<GroupProps>`
  ${(props) => props.type === "buttons" && HorizontalButtons};
  ${(props) => props.type === "avatars" && HorizontalAvatars};
  ${(props) => props.type === "tabs" && HorizontalTabs};
  ${(props) =>
    props.vertical
      ? css`
          display: flex;
          flex-direction: column;
          justify-content: start;
          align-items: start;
          ${props.type === "buttons" && VerticalButtons};
          ${props.type === "avatars" && VerticalAvatars};
          ${props.type === "tabs" && VerticalTabs};
        `
      : ""};
`

const Group: React.FC<GroupProps> = ({
  children,
  className,
  type,
  vertical,
  ...props
}) => {
  return (
    <StyledBox
      className={className}
      type={type}
      vertical={vertical}
      display="flex"
      alignItems="center"
      {...props}
    >
      {children}
    </StyledBox>
  )
}

export default Group
