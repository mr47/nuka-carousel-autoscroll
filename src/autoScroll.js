"use strict";

import React, { Component, PropTypes } from 'react';
import Bullet from './bullet';
import AutoScrollDecorator from './autoScrollBase';
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
function NukaDecorate(options){
    return (NukaComponent)=>(
        class Carousel extends Component{
            state = {
                _nuka: false
            };
            static PropTypes = {
                children: PropTypes.oneOfType([
                    PropTypes.arrayOf(PropTypes.element),
                    PropTypes.element
                ]).isRequired
            };
            static childContextTypes = {
                _nuka: PropTypes.any.isRequired
            };
            componentWillMount(){
                if (!options.progressComponent || !options.progressComponent instanceof Component){
                    console && console.warn && console.warn("NukaCarouselAutoscroll: Please define and progressIcon component.");
                }
            }
            componentDidMount(){
                this.setState({
                    _nuka: this._nuka
                });
            }
            getChildContext() {
                return {
                    _nuka: this.state._nuka
                };
            }
            render(){
                const { children } = this.props;
                const _options = {
                    progressComponent: null,
                    duration: 5000,
                    maxTickCount: 10,
                    decorators : [Bullet],
                    ...options
                };
                return (
                    <NukaComponent ref={(ref) => this._nuka = ref} decorators={[..._options.decorators, AutoScrollDecorator(_options)(_options.progressComponent)]} {...this.props}>
                        { children }
                    </NukaComponent>
                );

            }
        }
    );
}

export default NukaDecorate;

export { AutoScrollDecorator, NukaDecorate };
