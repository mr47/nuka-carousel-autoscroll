"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Bullet = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Bullet = exports.Bullet = function (_Component) {
    _inherits(Bullet, _Component);

    function Bullet() {
        _classCallCheck(this, Bullet);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(Bullet).apply(this, arguments));
    }

    _createClass(Bullet, [{
        key: 'render',
        value: function render() {
            var _this2 = this;

            var _props = this.props;
            var slideCount = _props.slideCount;
            var slidesToScroll = _props.slidesToScroll;
            var goToSlide = _props.goToSlide;
            var currentSlide = _props.currentSlide;

            var indexes = this.getIndexes(slideCount, slidesToScroll);
            return _react2.default.createElement(
                'ul',
                { style: this.getListStyles() },
                indexes.map(function (index) {
                    return _react2.default.createElement(
                        'li',
                        { style: _this2.getListItemStyles(), key: index },
                        _react2.default.createElement(
                            'button',
                            {
                                style: _this2.getButtonStyles(currentSlide === index),
                                onClick: goToSlide.bind(null, index) },
                            '•'
                        )
                    );
                })
            );
        }
    }, {
        key: 'getIndexes',
        value: function getIndexes(count, inc) {
            var arr = [];
            for (var i = 0; i < count; i += inc) {
                arr.push(i);
            }
            return arr;
        }
    }, {
        key: 'getListStyles',
        value: function getListStyles() {
            return {
                position: 'relative',
                margin: 0,
                top: -10,
                padding: 0
            };
        }
    }, {
        key: 'getListItemStyles',
        value: function getListItemStyles() {
            return {
                listStyleType: 'none',
                display: 'inline-block'
            };
        }
    }, {
        key: 'getButtonStyles',
        value: function getButtonStyles(active) {
            return {
                border: 0,
                background: 'transparent',
                color: '#dedede',
                cursor: 'pointer',
                padding: 10,
                outline: 0,
                fontSize: 24,
                opacity: active ? 1 : 0.5
            };
        }
    }]);

    return Bullet;
}(_react.Component);

Bullet.PropTypes = {
    slideCount: _react.PropTypes.number,
    slidesToScroll: _react.PropTypes.number,
    goToSlide: _react.PropTypes.func.isRequired,
    currentSlide: _react.PropTypes.number
};
exports.default = {
    component: Bullet,
    position: 'BottomCenter'
};