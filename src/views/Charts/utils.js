
import { tsvParse, csvParse } from  "d3-dsv";
import { timeParse } from "d3-time-format";

export function parseData(parse) {
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

export const parseDate = timeParse("%Y-%m-%d");

export function getDataOld() {
	const promiseMSFT = fetch("https://cdn.rawgit.com/rrag/react-stockcharts/master/docs/data/MSFT.tsv")
		.then(response => response.text())
		.then(data => tsvParse(data, parseData(parseDate)))
	return promiseMSFT;
}

export function getData() {
    return fetch(`http://localhost:8000/api/v1/ticksByTicker/AAPL`)
      .then(response => response.json())
      .then(data => data.map(parseData(parseDate)))
}


const parseDateTime = timeParse("%Y-%m-%d %H:%M:%S");

export function getDataTime() {
	const promiseIntraDayContinuous = fetch("https://cdn.rawgit.com/rrag/react-stockcharts/master/docs/data/bitfinex_xbtusd_1m.csv")
		.then(response => response.text())
		.then(data => csvParse(data, parseData(parseDateTime)))
		.then(data => {
			data.sort((a, b) => {
				return a.date.valueOf() - b.date.valueOf();
			});
			return data;
		});
	return promiseIntraDayContinuous;
}
