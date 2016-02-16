"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (props) {
    var progress = props.progress;
    var tickProgress = props.tickProgress;

    var className = 'progress-' + progress;
    var progressClass = styles[className];
    return _react2.default.createElement(
        'div',
        { className: styles.progress + ' ' + progressClass + ' ' + className },
        _react2.default.createElement(
            'div',
            { className: styles.circle },
            _react2.default.createElement(
                'div',
                { className: styles.mask + ' ' + styles.full },
                _react2.default.createElement('div', { className: styles.fill })
            ),
            _react2.default.createElement(
                'div',
                { className: styles.mask },
                _react2.default.createElement('div', { className: styles.fill }),
                _react2.default.createElement('div', { className: styles.fill + ' ' + styles.fix })
            ),
            _react2.default.createElement('div', { className: styles.shadow })
        ),
        _react2.default.createElement(
            'div',
            { className: styles.inset },
            _react2.default.createElement('div', { className: styles.percentage })
        )
    );
};

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _autoScroll = require('./autoScroll.scss');

var styles = _interopRequireWildcard(_autoScroll);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }