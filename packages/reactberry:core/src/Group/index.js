import styled, { css } from 'styled-components';

import Box from '../Box';

const HorizontalButtons = css`
  > * {
    text-align: center;
    border-radius: 0;
    margin: 0;
    align-items: center;
  }
  > *:first-child {
    border-top-left-radius: 8px;
    border-bottom-left-radius: 8px;
  }
  > *:last-child {
    border-top-right-radius: 8px;
    border-bottom-right-radius: 8px;
  }
`;
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
`;

const HorizontalTabs = css`
  > * {
    text-align: center;
    align-items: center;
    border: 1px solid transparent;
  }
  > *:first-child {
    border-radius: 8px 0 0 0;
  }
`;

const HorizontalAvatars = css`
  flex-direction: row-reverse;
  > * {
    border: 2px solid white;
    margin-left: -8px;
    transition: 0.125s ease-in-out;
  }
  &:hover {
    > * {
      margin-left: -2px;
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
      justify-content: start;
      align-items: start;
      ${props => props.type === 'buttons' && VerticalButtons};
      ${props => props.type === 'avatars' && VerticalAvatars};
    `};
`;

Group.defaultProps = {
  display: 'flex',
  alignItems: 'center'
};

export default Group;
