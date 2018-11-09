import React, { Component } from "react";
import PropTypes from "prop-types";
import { AreaChart } from './stockcharts/AreaChart';
import { CandleStickChart } from './stockcharts/CandleStickChart';
import { LineAndScatterChartGrid } from './stockcharts/LineAndScatterChartGrid';
import { CandleStickChartForDiscontinuousIntraDay } from './stockcharts/CandleStickChartForDiscontinuousIntraDay';

import { getData } from "./utils"

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
		getData().then(data => {
			this.setState({ data: data })
		})
	}
	handleChartTypeChange(e) {
        // console.log(e.target.value);
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
        console.log(`this.state.chartType ${this.state.chartType}`);
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
        console.log(`chart ${chart}`);
		return (
			<div>
				<label>ChartType: </label>
				<select name="chartType" id="chartType" onChange={this.handleChartTypeChange} value={this.state.chartType} >
					<option value="AreaChart">AreaChart</option>
					<option value="CandleStickChart">CandleStickChart</option>
                    <option value="LineAndScatterChartGrid">LineAndScatterChartGrid</option>
                    <option value="DiscontinuousCandle">DiscontinuousCandle</option>
				</select>
                {chart}
                {console.log(`chart in ${chart}`)}
			</div>
		);
	}
}

ChartTypeChooser.propTypes = {
	chartType: PropTypes.oneOf(["AreaChart", "CandleStickChart", "LineAndScatterChartGrid"]),
	//children: PropTypes.func.isRequired,
	//style: PropTypes.object.isRequired,
};

ChartTypeChooser.defaultProps = {
	chartType: "AreaChart",
	//style: {},
};

export { ChartTypeChooser };