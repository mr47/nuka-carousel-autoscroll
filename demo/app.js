'use strict';

import NukaDecorate from '../index';
import ProgressIcon from '../src/autoScrollProgress';
import NukaCarousel from 'nuka-carousel';
import React from 'react';
import ReactDom from 'react-dom';

window.React = React;

const Nuka = NukaDecorate({
    duration: 3500,
    progressComponent: ProgressIcon

})(NukaCarousel);

class App extends React.Component{
    render() {
        return (
            <div style={{width: '50%', margin: 'auto'}}>
                <Nuka ref="carousel">
                    <img src="http://placehold.it/1000x400/eef2f4/&text=slide1"/>
                    <img src="http://placehold.it/1000x400/eef2f4/&text=slide2"/>
                    <img src="http://placehold.it/1000x400/eef2f4/&text=slide3"/>
                    <img src="http://placehold.it/1000x400/eef2f4/&text=slide4"/>
                    <img src="http://placehold.it/1000x400/eef2f4/&text=slide5"/>
                    <img src="http://placehold.it/1000x400/eef2f4/&text=slide6"/>
                </Nuka>
            </div>
        )
    }
}

const content = document.getElementById('content');

ReactDom.render(<App/>, content);

