import styled, {css} from 'styled-components';

import Box from '../Box';

const HorizontalButtons = css`
  > * {
    text-align: center;
    border-radius: 0;
    margin: 0;
    align-items: center;
  }

  > * + * {
    margin-left: -1px;
  }

  > *:first-child {
    border-top-left-radius: ${({theme}) => theme.radii.medium};
    border-bottom-left-radius: ${({theme}) => theme.radii.medium};
  }

  > *:last-child {
    border-top-right-radius: ${({theme}) => theme.radii.medium};
    border-bottom-right-radius: ${({theme}) => theme.radii.medium};
  }
`;

const VerticalButtons = css`
  > * {
    justify-content: center;
    width: 100%;
  }

  > * + * {
    margin-top: -1px;
  }

  > *:first-child {
    border-radius: ${({theme}) => `${theme.radii.medium} ${theme.radii.medium} 0 0`};
  }

  > *:last-child {
    border-radius: ${({theme}) => `0 0 ${theme.radii.medium} ${theme.radii.medium}`};
  }
`;

const HorizontalTabs = css`
  > * {
    text-align: center;
    align-items: center;
    margin: 0;
  }
`;

const HorizontalAvatars = css`
  flex-direction: row-reverse;

  > * {
    border: 2px solid ${({theme}) => theme.colors.surface.default};
    margin-left: ${({theme}) => `calc(${theme.space.xsmall} * -1)`};
    transition: margin 0.125s ease-in-out;
  }

  &:hover {
    > * {
      margin-left: ${({theme}) => `calc(${theme.space.xxxsmall} * -1)`};
    }
  }
`;

const VerticalAvatars = css`
  justify-content: center;
`;

const Group = styled(Box)`
  ${props => props.type === 'buttons' && HorizontalButtons};
  ${props => props.type === 'avatars' && HorizontalAvatars};
  ${props => props.type === 'tabs' && HorizontalTabs};
  ${props =>
    props.vertical &&
    css`
      display: inline-flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: stretch;
      ${props => props.type === 'buttons' && VerticalButtons};
      ${props => props.type === 'avatars' && VerticalAvatars};
    `};
`;

Group.defaultProps = {
  display: 'flex',
  alignItems: 'center'
};

export default Group;
