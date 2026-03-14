const React = require('react');

const createIconComponent = require('./createIconComponent');

const ChevronSmallDownIcon = createIconComponent({
  content: React.createElement(
    'g',
    null,
    React.createElement('path', {
      d: 'M12 15a.997.997 0 01-.707-.293L6.586 10 8 8.586l4 4 4-4L17.414 10l-4.707 4.707A.997.997 0 0112 15z'
    })
  ),
  displayName: 'ChevronSmallDownIcon',
  height: 24,
  width: 24
});

module.exports = ChevronSmallDownIcon;