"use strict";
import React, { Component, PropTypes } from 'react';

export default function(options = {}) {

    return (DecoratedComponent)=>{
        const duration = (options.duration || 5000);
        const maxTickCount = options.maxTickCount || 10;

        class TimerComponent extends Component{
            _timer = -1;
            _tickTimer = -1;
            state = {
                progress: 0,
                tickProgress: 0
            };
            static contextTypes = {
                _nuka: PropTypes.any.isRequired
            };
            static PropTypes = {
                slideCount: PropTypes.number,
                slidesToScroll: PropTypes.number,
                goToSlide: PropTypes.func.isRequired,
                currentSlide: PropTypes.number,
                children: PropTypes.oneOfType([
                    PropTypes.arrayOf(PropTypes.element),
                    PropTypes.element
                ])
            };
            getIndexes(count, inc) {
                let arr = [];
                for (let i = 0; i < count; i += inc) arr.push(i);
                return arr;
            }
            getNextSlideIndex(){
                const { slideCount, slidesToScroll, currentSlide } = this.props;
                const nextSlide = currentSlide + slidesToScroll;
                return slideCount !== nextSlide || slideCount < nextSlide ? this._indexes[nextSlide] : 0;
            }
            scrollNext(){
                const next = this.getNextSlideIndex();
                const { goToSlide, slideCount } = this.props;
                this.updateTickProgress(-1);
                this.updateProgress(Math.round(((next + 1) / slideCount) * 100));
                // next slide
                goToSlide( next );
                //console.log(`Go to slides [${slideCount}]: ${this._indexes}, index: ${nextSlide}, _nuka: ${this.context._nuka}`)
            }
            initAutoScroll(){
                clearInterval(this._timer);
                clearInterval(this._tickTimer);
                this._timer = setInterval(()=>{
                    this.context._nuka && !this.context._nuka.state.dragging && (this.scrollNext());
                }, options.duration || 5000);
                this._tickTimer = setInterval(()=>{
                    this.context._nuka && !this.context._nuka.state.dragging && this.updateTickProgress(Math.round(((duration / maxTickCount)/duration) * 100));
                }, Math.round( duration / maxTickCount ));
            }
            getProgress(){
                const { slideCount, currentSlide } = this.props;
                return Math.round(((currentSlide + 1) / slideCount) * 100);
            }
            updateTickProgress(progress){
                //console.log(` T:${this.state.tickProgress}, P: ${this.state.progress} `);
                this.setState({
                    tickProgress: progress>0 ? this.state.tickProgress + progress : 0
                });
            }
            updateProgress(progress){
                this.setState({
                    progress: progress
                });
            }
            updateIndexes(){
                const { slideCount, slidesToScroll } = this.props;
                this._indexes = this.getIndexes(slideCount, slidesToScroll);
            }
            componentDidMount(){
                this.updateIndexes();
                this.initAutoScroll();
            }
            componentDidUpdate (prevProps) {
                prevProps.slideCount !== this.props.slideCount && (this.updateIndexes());
                if (prevProps.currentSlide !== this.props.currentSlide) {
                    this.updateProgress(this.getProgress());
                    this.updateTickProgress(this.state.tickProgress);
                }
            }
            componentWillUnmount(){
                clearInterval(this._timer);
                clearInterval(this._tickTimer);
            }
            render() {
                const { children } = this.props;
                return (
                    <DecoratedComponent progress={this.state.progress} tickProgress={this.state.tickProgress} {...this.props}>
                        { children }
                    </DecoratedComponent>
                );
            }
        }

        return {
            component: TimerComponent,
            position: options.position || 'BottomRight'
        }
    }
}
