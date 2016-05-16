"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.NukaDecorate = exports.AutoScrollDecorator = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _bullet = require('./bullet');

var _bullet2 = _interopRequireDefault(_bullet);

var _autoScrollBase = require('./autoScrollBase');

var _autoScrollBase2 = _interopRequireDefault(_autoScrollBase);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/*
*    Can be defined as decorator for nuka component
*    options = {
*        duration: <AutoScrollDuration>
*        maxTickCount: <Duration> / <Ticks>
*        decorators: <NukaDecorators>
*    }
*   or can be done by using <AutoScrollDecorator> with options
 */
/*
*
* Internal its using react context api. Its using 2 seperated timers for it
*
* */
function NukaDecorate(options) {
    return function (NukaComponent) {
        var _class, _temp2;

        return _temp2 = _class = function (_Component) {
            _inherits(Carousel, _Component);

            function Carousel() {
                var _Object$getPrototypeO;

                var _temp, _this, _ret;

                _classCallCheck(this, Carousel);

                for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
                    args[_key] = arguments[_key];
                }

                return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(Carousel)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.state = {
                    _nuka: false
                }, _temp), _possibleConstructorReturn(_this, _ret);
            }

            _createClass(Carousel, [{
                key: 'componentWillMount',
                value: function componentWillMount() {
                    if (!options.progressComponent || !options.progressComponent instanceof _react.Component) {
                        console && console.warn && console.warn("NukaCarouselAutoscroll: Please define and progressIcon component.");
                    }
                }
            }, {
                key: 'componentDidMount',
                value: function componentDidMount() {
                    this.setState({
                        _nuka: this._nuka
                    });
                }
            }, {
                key: 'getChildContext',
                value: function getChildContext() {
                    return {
                        _nuka: this.state._nuka
                    };
                }
            }, {
                key: 'render',
                value: function render() {
                    var _this2 = this;

                    var children = this.props.children;

                    var _options = _extends({
                        progressComponent: null,
                        duration: 5000,
                        maxTickCount: 10,
                        decorators: [_bullet2.default]
                    }, options);
                    return _react2.default.createElement(
                        NukaComponent,
                        _extends({ ref: function ref(_ref) {
                                return _this2._nuka = _ref;
                            }, decorators: [].concat(_toConsumableArray(_options.decorators), [(0, _autoScrollBase2.default)(_options)(_options.progressComponent)]) }, this.props),
                        children
                    );
                }
            }]);

            return Carousel;
        }(_react.Component), _class.PropTypes = {
            children: _react.PropTypes.oneOfType([_react.PropTypes.arrayOf(_react.PropTypes.element), _react.PropTypes.element]).isRequired
        }, _class.childContextTypes = {
            _nuka: _react.PropTypes.any.isRequired
        }, _temp2;
    };
}

exports.default = NukaDecorate;
exports.AutoScrollDecorator = _autoScrollBase2.default;
exports.NukaDecorate = NukaDecorate;