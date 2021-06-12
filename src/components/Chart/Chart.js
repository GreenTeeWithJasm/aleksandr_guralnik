import { useContext } from "react";
import { StockCtx } from "../../context/stock-data";
import PropTypes from "prop-types";

import {
	AreaChart,
	ReferenceLine,
	Area,
	CartesianGrid,
	XAxis,
	YAxis,
	Tooltip,
	Label,
} from "recharts";

import classes from "./Chart.module.css";

const tooltipLabelFormatter = (name, props) => {
	if (props && props[0]) {
		const date = new Date(props[0].payload.Date);
		return `Date: ${date.toLocaleDateString(navigator.language, {
			hour: "2-digit",
			minute: "2-digit",
		})}`;
	} else {
		return name;
	}
};

const tooltipFormatter = (value) => {
	return value.toFixed(3);
};

const Chart = () => {
	const { data, sorting } = useContext(StockCtx);

	const average = data.reduce((acc, item) => acc + item.Close, 0) / data.length;

  const chartWidth = window.screen.width < 850 ? window.screen.width * 0.75 : 800

  const XAxisTickFormatter = (val) => {
    if (sorting.id !== '1ws') {
      const tick = new Date(val);
      return `${tick.getHours()}:${
        tick.getMinutes() < 10 ? "0" + tick.getMinutes() : tick.getMinutes()
      }`;
    } else {
      const tick = new Date(val);
      return `${tick.getDate()}.${tick.getMonth()}.${tick.getFullYear()}`
    }
  };

	return (
		<div className={classes.Chart}>
			<AreaChart width={chartWidth} height={300} data={data}>
				<Area type="linear" dataKey="Close" fill="#8884d8" stroke="#8884d8" />
				<ReferenceLine
					y={average}
					stroke="red"
					strokeDasharray="3 3"
					label={
						<Label
							className={classes.label}
							position="right"
							value={average.toFixed(1)}
						/>
					}
				/>
				<CartesianGrid stroke="#ccc" />
				<XAxis dataKey="Date" tickFormatter={XAxisTickFormatter.bind(sorting.id)} />
				<YAxis
					orientation="right"
					interval="preserveEnd"
					domain={["auto", "auto"]}
				/>
				<Tooltip
					formatter={tooltipFormatter}
					labelFormatter={tooltipLabelFormatter}
				/>
			</AreaChart>
		</div>
	);
};

Chart.propTypes = {
	data: PropTypes.array,
};

Chart.defaultProps = {
	data: [],
};

export default Chart;
