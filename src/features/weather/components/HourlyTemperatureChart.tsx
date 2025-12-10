import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

type HourlyPointChart = { time: string; temp: number };

type Props = {
  data: HourlyPointChart[];
};

export function HourlyTemperatureChart({ data }: Props) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart
        data={data}
        margin={{ top: 20, right: 30, bottom: 60, left: 40 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="time"
          angle={-45}
          textAnchor="end"
          height={60}
          tick={{ fontSize: 12 }}
          interval={0}
        />
        <YAxis
          unit="°C"
          tick={{ fontSize: 12 }}
          label={{
            value: "Температура, °C",
            angle: -90,
            position: "insideLeft",
            style: { textAnchor: "middle", fontSize: 12 },
          }}
        />
        <Tooltip
          formatter={(value) => [`${value}°C`, "Температура"]}
          labelFormatter={(label) => `Время: ${label}`}
        />
        <Line
          type="monotone"
          dataKey="temp"
          stroke="#1e90ff"
          strokeWidth={3}
          dot={{ r: 4, fill: "#1e90ff" }}
          activeDot={{ r: 6, stroke: "#1e90ff", strokeWidth: 2 }}
          isAnimationActive={false}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
