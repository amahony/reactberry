'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _createIconComponent = require('./createIconComponent');

var _createIconComponent2 = _interopRequireDefault(_createIconComponent);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {default: obj};
}

var IconSmallDown = (0, _createIconComponent2.default)({
  content: _react2.default.createElement(
    'g',
    null,
    _react2.default.createElement('path', {
      d:
        'M12 15a.997.997 0 01-.707-.293L6.586 10 8 8.586l4 4 4-4L17.414 10l-4.707 4.707A.997.997 0 0112 15z'
    })
  ),
  height: 24,
  width: 24
});
IconSmallDown.displayName = 'IconSmallDown';
exports.default = IconSmallDown;
