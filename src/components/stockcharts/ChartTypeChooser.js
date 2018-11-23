import React, { Component } from "react";
import PropTypes from "prop-types";
import { AreaSeries, LineSeries, CandlestickSeries } from "react-stockcharts/lib/series";

import { BaseChart, canvasGradient } from './BaseChart';
import { curveMonotoneX } from "d3-shape";

import { FormGroup, Label, Col, Input } from 'reactstrap';

import { parseDate, parseData} from './utils';
import { API_ROOT } from '../../api-config.js';

const chartOptions = { 
    "CandleStickChart":"Candle Stick Chart",
    "AreaChart":"Area Chart",
    "LineChart":"Line Chart",
}

class ChartTypeChooser extends Component {
	constructor(props) {
		super(props);
		this.state = {
            chartType: Object.keys(chartOptions)[0],
            data: null,
            serieChart: this.selectChartType(Object.keys(chartOptions)[0]),
		};
		this.handleChartTypeChange = this.handleChartTypeChange.bind(this);
    }
    /*
    componentDidMount() {
        this.handleTickerSymbol(this.props.tickerSymbol)
    }

    componentDidUpdate(prevProps) {
        if (this.props.tickerSymbol !== prevProps.tickerSymbol) {
            this.handleTickerSymbol(this.props.tickerSymbol)
        }
      }

    handleTickerSymbol(tickerSymbol) {
        fetch(`${API_ROOT}/ticksByTicker/${tickerSymbol}`)
            .then(response => response.json())
            .then(data => data.map(parseData(parseDate)))
            .then(data => {
                this.setState({ data: data }); })
    }
    */

	handleChartTypeChange(e) {
        let serieChart = this.selectChartType(e.target.value);
        this.setState({
            chartType: e.target.value,
            serieChart: serieChart,
		});
    }
    selectChartType(newChartType) {
        let serieChart;
        switch (newChartType) {
            case 'AreaChart':
                serieChart = <AreaSeries yAccessor={d => d.close} fill="url(#MyGradient)"
                    strokeWidth={2}
                    interpolation={curveMonotoneX}
                    canvasGradient={canvasGradient}/>
                break;
            case 'CandleStickChart':
                serieChart = <CandlestickSeries />
                break;
            case 'LineChart':
                serieChart = <LineSeries yAccessor={d => d.close} 
                    stroke="#ff7f0e"
                    strokeWidth={2}/>
                break;
            default:
                serieChart = <CandlestickSeries />
                break;
        }

        return serieChart;
    }

    createOptions() {
        let options = [];
        for (var key in chartOptions) {
            options.push( <option key={key} value={key}>{chartOptions[key]}</option> )
        }
        return options
    }

	render() {
        if (this.props.data == null) {
			return <div>Loading...</div>
        }
         return (


			<div>
                <FormGroup row>
                <Label for="chartType" sm={2}>Chart Type</Label>
                <Col sm={10}>
                <Input type="select" name="chartType" id="chartType" onChange={this.handleChartTypeChange} value={this.state.chartType}>
                    {this.createOptions()}
                </Input>
                </Col>
            </FormGroup>
            <BaseChart style={'hybrid'} data={this.props.data} serieChart={this.state.serieChart}/>
			</div>
		);
	}
}

ChartTypeChooser.propTypes = {
    tickerSymbol: PropTypes.string.isRequired,
};

ChartTypeChooser.defaultProps = {
};

export { ChartTypeChooser };
