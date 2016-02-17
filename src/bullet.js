"use strict";

import React,{Component, PropTypes} from 'react';

export class Bullet extends Component{
    static PropTypes = {
        slideCount: PropTypes.number,
        slidesToScroll: PropTypes.number,
        goToSlide: PropTypes.func.isRequired,
        currentSlide: PropTypes.number
    };
    render() {
        const {slideCount, slidesToScroll, goToSlide, currentSlide} = this.props;
        var indexes = this.getIndexes(slideCount, slidesToScroll);
        return (
            <ul style={this.getListStyles()}>
                {
                    indexes.map((index)=>{
                        return (
                            <li style={this.getListItemStyles()} key={index}>
                                <button
                                    style={this.getButtonStyles(currentSlide === index)}
                                    onClick={goToSlide.bind(null, index)}>
                                    &bull;
                                </button>
                            </li>
                        )
                    })
                }
            </ul>
        )
    }
    getIndexes(count, inc) {
        var arr = [];
        for (var i = 0; i < count; i += inc) {
            arr.push(i);
        }
        return arr;
    }
    getListStyles() {
        return {
            position: 'relative',
            margin: 0,
            top: -10,
            padding: 0
        }
    }
    getListItemStyles() {
        return {
            listStyleType: 'none',
            display: 'inline-block'
        }
    }
    getButtonStyles(active) {
        return {
            border: 0,
            background: 'transparent',
            color: '#cc181e',
            cursor: 'pointer',
            padding: 10,
            outline: 0,
            fontSize: 24,
            opacity: active ? 1 : 0.5
        }
    }
}

export default {
    component: Bullet,
    position: 'BottomCenter'
};
