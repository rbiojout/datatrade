import React from "react";
import PropTypes from "prop-types";

import { scaleTime } from "d3-scale";
import { curveMonotoneX } from "d3-shape";

import { ChartCanvas, Chart } from "react-stockcharts";
import { AreaSeries } from "react-stockcharts/lib/series";
import { XAxis, YAxis } from "react-stockcharts/lib/axes";
import { fitWidth } from "react-stockcharts/lib/helper";
import { createVerticalLinearGradient, hexToRGBA } from "react-stockcharts/lib/utils";

import { timeParse } from "d3-time-format";

function parseData(parse) {
	return function(d) {
		d.date = parse(d.date);
		d.open = +d.open;
		d.high = +d.high;
		d.low = +d.low;
		d.close = +d.close;
		d.volume = +d.volume;

		return d;
	};
}

const parseDate = timeParse("%Y-%m-%d");

const canvasGradient = createVerticalLinearGradient([
	{ stop: 0, color: hexToRGBA("#b5d0ff", 0.2) },
	{ stop: 0.7, color: hexToRGBA("#6fa4fc", 0.4) },
	{ stop: 1, color: hexToRGBA("#4286f4", 0.8) },
]);

class SimpleAeraChart extends React.Component {
    constructor(props) {
        super(props)
    }
	render() {
        const { data, type, width, ratio } = this.props;
        //const data = initialData.map(item => {return {...item, date: Date(item.date)}});
        //const data = initialData.map(parseData(parseDate));
        console.log('DATA '+ data +'/'+!data)

        let canvas 

        if(!data || data.lenght==0){
            console.log('WAIT');
            canvas = (<div></div>);
        } else {
            console.log('CONTINUE '+data[0].date +'/'+data[0].open)
        }
		return (
			<ChartCanvas ratio={ratio} width={width} height={400}
				margin={{ left: 50, right: 50, top: 10, bottom: 30 }}
				seriesName="MSFT"
                data={data} 
                type={type}
                xAccessor={d => d.date} 
				xScale={scaleTime()}
				xExtents={[new Date(1980, 1, 1), new Date(2013, 1, 1)]}
			>
				<Chart id={0} yExtents={d => d.close}>
					<defs>
						<linearGradient id="MyGradient" x1="0" y1="100%" x2="0" y2="0%">
							<stop offset="0%" stopColor="#b5d0ff" stopOpacity={0.2} />
							<stop offset="70%" stopColor="#6fa4fc" stopOpacity={0.4} />
							<stop offset="100%"  stopColor="#4286f4" stopOpacity={0.8} />
						</linearGradient>
					</defs>
					<XAxis axisAt="bottom" orient="bottom" ticks={6}/>
					<YAxis axisAt="left" orient="left" />
					<AreaSeries
						yAccessor={d => d.close}
						fill="url(#MyGradient)"
						strokeWidth={2}
						interpolation={curveMonotoneX}
						canvasGradient={canvasGradient}
					/>
				</Chart>
			</ChartCanvas>
        );

	}
}


SimpleAeraChart.propTypes = {
	data: PropTypes.array.isRequired,
	width: PropTypes.number.isRequired,
	ratio: PropTypes.number.isRequired,
	type: PropTypes.oneOf(["svg", "hybrid"]).isRequired,
};

SimpleAeraChart.defaultProps = {
	type: "svg",
};
SimpleAeraChart = fitWidth(SimpleAeraChart);

export default SimpleAeraChart;