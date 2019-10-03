import React, { Component } from 'react';
import { Line } from 'react-chartjs-2';

const titleCallbackGenerator = (xAxisFormatter) => (dataArray, data) => {
	const pointData = dataArray[0];
	const xValue = data.datasets[pointData.datasetIndex].data[pointData.index].x;
	return xAxisFormatter(xValue);
};

const defaultXAxisFormatter = (value) => value;

class PregnancyLineChart extends Component {
	render() {
		const { label, lineColor, data, xAxisMax, xAxisMin = 0, xAxisFormatter = defaultXAxisFormatter } = this.props;

		const chartData = {
			labels: [...Array(xAxisMax + 1).keys()].filter((val) => val >= xAxisMin),
			datasets: [
				{
					label,
					data,
					fill: false,
					borderColor: lineColor,
				}
			]
		};

		const options = {
			maintainAspectRatio: false,
			tooltips: {
				callbacks: {
					title: titleCallbackGenerator(xAxisFormatter)
				}
			},
			scales: {
				xAxes: [{
					ticks: {
						callback: xAxisFormatter
					}
				}]
			}
		};

		return (
			<Line
				data={chartData}
				options={options}
				height={400}
				width={600}
			/>
		);
	}
}

export default PregnancyLineChart;
