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

var IconSmallUp = (0, _createIconComponent2.default)({
  content: _react2.default.createElement(
    'g',
    null,
    _react2.default.createElement('path', {
      d:
        'M16 15.414l-4-4-4 4L6.586 14l4.707-4.707a.999.999 0 011.414 0L17.414 14 16 15.414z'
    })
  ),
  height: 24,
  width: 24
});
IconSmallUp.displayName = 'IconSmallUp';
exports.default = IconSmallUp;
