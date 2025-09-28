"use client";

import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Cell } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

// Location-specific incident distribution data
const locationIncidentData = {
  "Madhya Marg": [
    { type: "Medical", count: 52, fill: "#ef4444" },
    { type: "Fire", count: 18, fill: "#f97316" },
    { type: "Traffic", count: 38, fill: "#eab308" },
    { type: "Crime", count: 22, fill: "#3b82f6" },
    { type: "Natural", count: 10, fill: "#22c55e" },
  ],
  "Dakshin Marg": [
    { type: "Medical", count: 45, fill: "#ef4444" },
    { type: "Fire", count: 12, fill: "#f97316" },
    { type: "Traffic", count: 32, fill: "#eab308" },
    { type: "Crime", count: 18, fill: "#3b82f6" },
    { type: "Natural", count: 8, fill: "#22c55e" },
  ],
  "Shanti Path": [
    { type: "Medical", count: 28, fill: "#ef4444" },
    { type: "Fire", count: 6, fill: "#f97316" },
    { type: "Traffic", count: 18, fill: "#eab308" },
    { type: "Crime", count: 10, fill: "#3b82f6" },
    { type: "Natural", count: 5, fill: "#22c55e" },
  ],
  "Jan Marg": [
    { type: "Medical", count: 42, fill: "#ef4444" },
    { type: "Fire", count: 14, fill: "#f97316" },
    { type: "Traffic", count: 28, fill: "#eab308" },
    { type: "Crime", count: 19, fill: "#3b82f6" },
    { type: "Natural", count: 7, fill: "#22c55e" },
  ],
  "Vikas Marg": [
    { type: "Medical", count: 68, fill: "#ef4444" },
    { type: "Fire", count: 25, fill: "#f97316" },
    { type: "Traffic", count: 58, fill: "#eab308" },
    { type: "Crime", count: 32, fill: "#3b82f6" },
    { type: "Natural", count: 12, fill: "#22c55e" },
  ],
  "Sector 17 Market Road": [
    { type: "Medical", count: 35, fill: "#ef4444" },
    { type: "Fire", count: 8, fill: "#f97316" },
    { type: "Traffic", count: 22, fill: "#eab308" },
    { type: "Crime", count: 14, fill: "#3b82f6" },
    { type: "Natural", count: 6, fill: "#22c55e" },
  ],
};

const chartConfig = {
  count: {
    label: "Incidents",
  },
} satisfies ChartConfig;

interface Chart06Props {
  selectedLocation?: string;
}

export function Chart06({ selectedLocation = "Madhya Marg" }: Chart06Props) {
  const incidentData = locationIncidentData[selectedLocation as keyof typeof locationIncidentData] || locationIncidentData["Madhya Marg"];
  const totalIncidents = incidentData.reduce((sum, item) => sum + item.count, 0);
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-gray-800 dark:text-gray-200">
          Incident Distribution - {selectedLocation}
        </CardTitle>
        <div className="text-2xl font-bold">{totalIncidents} Total Today</div>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={incidentData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="type"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="count" radius={[4, 4, 0, 0]}>
              {incidentData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
