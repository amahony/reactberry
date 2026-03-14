const React = require('react');

const createIconComponent = require('./createIconComponent');

const ChevronSmallUpIcon = createIconComponent({
  content: React.createElement(
    'g',
    null,
    React.createElement('path', {
      d: 'M16 15.414l-4-4-4 4L6.586 14l4.707-4.707a.999.999 0 011.414 0L17.414 14 16 15.414z'
    })
  ),
  displayName: 'ChevronSmallUpIcon',
  height: 24,
  width: 24
});

module.exports = ChevronSmallUpIcon;