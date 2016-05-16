"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.default = function () {
    var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];


    return function (DecoratedComponent) {
        var duration = options.duration || 5000;
        var maxTickCount = options.maxTickCount || 10;

        var TimerComponent = function (_Component) {
            _inherits(TimerComponent, _Component);

            function TimerComponent() {
                var _Object$getPrototypeO;

                var _temp, _this, _ret;

                _classCallCheck(this, TimerComponent);

                for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
                    args[_key] = arguments[_key];
                }

                return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(TimerComponent)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this._timer = -1, _this._tickTimer = -1, _this.state = {
                    progress: 0,
                    tickProgress: 0
                }, _temp), _possibleConstructorReturn(_this, _ret);
            }

            _createClass(TimerComponent, [{
                key: "getIndexes",
                value: function getIndexes(count, inc) {
                    var arr = [];
                    for (var i = 0; i < count; i += inc) {
                        arr.push(i);
                    }return arr;
                }
            }, {
                key: "getNextSlideIndex",
                value: function getNextSlideIndex() {
                    var _props = this.props;
                    var slideCount = _props.slideCount;
                    var slidesToScroll = _props.slidesToScroll;
                    var currentSlide = _props.currentSlide;

                    var nextSlide = currentSlide + slidesToScroll;
                    return slideCount !== nextSlide || slideCount < nextSlide ? this._indexes[nextSlide] : 0;
                }
            }, {
                key: "scrollNext",
                value: function scrollNext() {
                    var next = this.getNextSlideIndex();
                    var _props2 = this.props;
                    var goToSlide = _props2.goToSlide;
                    var slideCount = _props2.slideCount;

                    this.updateTickProgress(-1);
                    this.updateProgress(Math.round((next + 1) / slideCount * 100));
                    // next slide
                    goToSlide(next);
                    //console.log(`Go to slides [${slideCount}]: ${this._indexes}, index: ${nextSlide}, _nuka: ${this.context._nuka}`)
                }
            }, {
                key: "initAutoScroll",
                value: function initAutoScroll() {
                    var _this2 = this;

                    clearInterval(this._timer);
                    clearInterval(this._tickTimer);
                    this._timer = setInterval(function () {
                        _this2.context._nuka && !_this2.context._nuka.state.dragging && _this2.scrollNext();
                    }, options.duration || 5000);
                    this._tickTimer = setInterval(function () {
                        _this2.context._nuka && !_this2.context._nuka.state.dragging && _this2.updateTickProgress(Math.round(duration / maxTickCount / duration * 100));
                    }, Math.round(duration / maxTickCount));
                }
            }, {
                key: "getProgress",
                value: function getProgress() {
                    var _props3 = this.props;
                    var slideCount = _props3.slideCount;
                    var currentSlide = _props3.currentSlide;

                    return Math.round((currentSlide + 1) / slideCount * 100);
                }
            }, {
                key: "updateTickProgress",
                value: function updateTickProgress(progress) {
                    //console.log(` T:${this.state.tickProgress}, P: ${this.state.progress} `);
                    this.setState({
                        tickProgress: progress > 0 ? this.state.tickProgress + progress : 0
                    });
                }
            }, {
                key: "updateProgress",
                value: function updateProgress(progress) {
                    this.setState({
                        progress: progress
                    });
                }
            }, {
                key: "updateIndexes",
                value: function updateIndexes() {
                    var _props4 = this.props;
                    var slideCount = _props4.slideCount;
                    var slidesToScroll = _props4.slidesToScroll;

                    this._indexes = this.getIndexes(slideCount, slidesToScroll);
                }
            }, {
                key: "shouldComponentUpdate",
                value: function shouldComponentUpdate(nextProps, nextState) {
                    return this.state.progress !== nextState.progress;
                }
            }, {
                key: "componentDidMount",
                value: function componentDidMount() {
                    this.updateIndexes();
                    this.initAutoScroll();
                }
            }, {
                key: "componentDidUpdate",
                value: function componentDidUpdate(prevProps) {
                    prevProps.slideCount !== this.props.slideCount && this.updateIndexes();
                    if (prevProps.currentSlide !== this.props.currentSlide) {
                        this.updateProgress(this.getProgress());
                        this.updateTickProgress(this.state.tickProgress);
                    }
                }
            }, {
                key: "componentWillUnmount",
                value: function componentWillUnmount() {
                    clearInterval(this._timer);
                    clearInterval(this._tickTimer);
                }
            }, {
                key: "render",
                value: function render() {
                    var children = this.props.children;

                    return _react2.default.createElement(
                        DecoratedComponent,
                        _extends({ progress: this.state.progress, tickProgress: this.state.tickProgress }, this.props),
                        children ? children : ""
                    );
                }
            }]);

            return TimerComponent;
        }(_react.Component);

        TimerComponent.contextTypes = {
            _nuka: _react.PropTypes.any.isRequired
        };
        TimerComponent.PropTypes = {
            slideCount: _react.PropTypes.number,
            slidesToScroll: _react.PropTypes.number,
            goToSlide: _react.PropTypes.func.isRequired,
            currentSlide: _react.PropTypes.number,
            children: _react.PropTypes.oneOfType([_react.PropTypes.arrayOf(_react.PropTypes.element), _react.PropTypes.element])
        };


        return {
            component: TimerComponent,
            position: options.position || 'BottomRight'
        };
    };
};

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }