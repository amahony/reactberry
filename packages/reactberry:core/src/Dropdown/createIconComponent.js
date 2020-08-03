'use strict';

Object.defineProperty(exports, "__esModule", {
         value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var createIconComponent = function createIconComponent(_ref) {
         var content = _ref.content,
             height = _ref.height,
             width = _ref.width;
         return function (props) {
                  return _react2.default.createElement('svg', {
                           style: { fill: props.fill || 'currentColor' },
                           viewBox: '0 0 ' + width + ' ' + height,
                           width: '' + (props.width || width),
                           height: '' + (props.height || height)
                  }, content);
         };
};

exports.default = createIconComponent;