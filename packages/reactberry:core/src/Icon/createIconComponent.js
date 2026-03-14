const React = require('react');

function createIconComponent({content, displayName, height, width}) {
  const IconComponent = ({
    fill = 'currentColor',
    height: iconHeight = height,
    width: iconWidth = width,
    ...props
  }) =>
    React.createElement(
      'svg',
      {
        fill,
        viewBox: `0 0 ${width} ${height}`,
        width: iconWidth,
        height: iconHeight,
        ...props
      },
      content
    );

  IconComponent.displayName = displayName;

  return IconComponent;
}

module.exports = createIconComponent;