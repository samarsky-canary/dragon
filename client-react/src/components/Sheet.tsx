import React, { FC, useEffect, RefObject } from 'react';
import * as d3 from 'd3';


 
export const D3Sample : FC = () => {
    const ref: RefObject<HTMLDivElement> = React.createRef();

    const draw = () => {
        d3.select(ref.current).append('p').text('D3 заглушка');
        d3.select('svg').append('g').attr('transform', 'translate(250, 0)')
        .append('rect').attr('width', 500).attr('height', 500).attr('fill', 'gray');
    }
    

    useEffect(()=> {
        draw()
    });

    return (
        <div className='D3Sample' ref={ref}>
            <svg width="500" height="500">
                <g transform="translate(0, 0)">
                    <rect width="500" height="500" fill="gray" />
                </g>
            </svg>
        </div>
    );
}