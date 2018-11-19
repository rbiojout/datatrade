import React, { Component } from "react";
import PropTypes from "prop-types";
import { AreaChart } from './stockcharts/AreaChart';
import { CandleStickChart } from './stockcharts/CandleStickChart';
import { LineAndScatterChartGrid } from './stockcharts/LineAndScatterChartGrid';
import { CandleStickChartForDiscontinuousIntraDay } from './stockcharts/CandleStickChartForDiscontinuousIntraDay';

import { FormGroup, Label, Col, Input } from 'reactstrap';

import { fetchTicks } from '../../actions/tickers';

import { getData, parseDate, parseData } from "./utils"

class ChartTypeChooser extends Component {
	constructor(props) {
		super(props);
		this.state = {
            chartType: this.props.chartType,
            data: null,
            chart: null
		};
		this.handleChartTypeChange = this.handleChartTypeChange.bind(this);
    }
    componentDidMount() {
		//getData().then(data => {
		//	this.setState({ data: data })
        //})
        this.handleTickerSymbol(this.props.tickerSymbol)
    }

    componentDidUpdate(prevProps) {
        if (this.props.tickerSymbol !== prevProps.tickerSymbol) {
            this.handleTickerSymbol(this.props.tickerSymbol)
        }
      }

    handleTickerSymbol(tickerSymbol) {
        fetch(`/api/v1/ticksByTicker/${tickerSymbol}`)
            .then(response => response.json())
            .then(data => data.map(parseData(parseDate)))
            .then(data => {
                this.setState({ data: data }); })
    }

	handleChartTypeChange(e) {
        let chart;
        switch (this.state.chartType) {
            case 'AreaChart':
                chart = <AreaChart style='hybrid' data={this.state.data}/>
            case 'CandleStickChart':
                chart = <CandleStickChart style='hybrid' data={this.state.data}/>
            case 'LineAndScatterChartGrid':
                chart = <LineAndScatterChartGrid style='hybrid' data={this.state.data}/>
        }
		this.setState({
            chart: chart,
			chartType: e.target.value
		});
	}
	render() {
        if (this.state.data == null) {
			return <div>Loading...</div>
        }
        //let chart = <AreaChart style='hybrid' width='400' ratio='1' data={this.state.data}/>;
        //let chart = <LineAndScatterChartGrid style='hybrid' data={this.state.data}/>;
        let chart = <CandleStickChart style='hybrid' data={this.state.data}/>;
        switch (this.state.chartType) {
            case 'AreaChart':
                chart = <AreaChart style='hybrid' data={this.state.data}/>;
                break;
            case 'CandleStickChart':
                chart = <CandleStickChart style='hybrid' data={this.state.data}/>
                break;
            case 'LineAndScatterChartGrid':
                chart = <LineAndScatterChartGrid style='hybrid' data={this.state.data}/>
                break;
            case 'DiscontinuousCandle':
                chart = <CandleStickChartForDiscontinuousIntraDay style='hybrid' data={this.state.data}/>
                break;
        }
        return (


			<div>
				<FormGroup row>
                <Label for="chartType" sm={2}>Chart Type</Label>
                <Col sm={10}>
                <Input type="select" name="chartType" id="chartType" onChange={this.handleChartTypeChange} value={this.state.chartType}>
                    <option value="AreaChart">AreaChart</option>
					<option value="CandleStickChart">CandleStickChart</option>
                    <option value="LineAndScatterChartGrid">LineAndScatterChartGrid</option>
                    <option value="DiscontinuousCandle">DiscontinuousCandle</option>
                </Input>
                </Col>
            </FormGroup>
                {chart}
			</div>
		);
	}
}

ChartTypeChooser.propTypes = {
    tickerSymbol: PropTypes.string.isRequired,
	chartType: PropTypes.oneOf(["AreaChart", "CandleStickChart", "LineAndScatterChartGrid"]),
	//children: PropTypes.func.isRequired,
	//style: PropTypes.object.isRequired,
};

ChartTypeChooser.defaultProps = {
	chartType: "AreaChart",
	//style: {},
};

export { ChartTypeChooser };
