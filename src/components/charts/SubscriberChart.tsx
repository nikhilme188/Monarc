import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

export default function SubscriberChart({ data }: { data: number[] }) {
  const chartData = data.map((v, i) => ({ name: `Month ${i+1}`, subscribers: v }));

  return (
    <ResponsiveContainer width="100%" height={200}>
      <LineChart data={chartData}>
        <XAxis dataKey="name" stroke="#FFD700"/>
        <YAxis stroke="#FFD700"/>
        <Tooltip />
        <Line type="monotone" dataKey="subscribers" stroke="#00FFFF" strokeWidth={3} />
      </LineChart>
    </ResponsiveContainer>
  );
}
