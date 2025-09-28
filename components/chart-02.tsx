"use client";

import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

// Location-specific AQI data
const locationAQIData = {
  "Madhya Marg": [
    { time: "0:00", aqi: 125 },
    { time: "2:00", aqi: 118 },
    { time: "4:00", aqi: 130 },
    { time: "6:00", aqi: 142 },
    { time: "8:00", aqi: 165 },
    { time: "10:00", aqi: 155 },
    { time: "12:00", aqi: 148 },
    { time: "14:00", aqi: 152 },
    { time: "16:00", aqi: 168 },
    { time: "18:00", aqi: 175 },
    { time: "20:00", aqi: 158 },
    { time: "22:00", aqi: 135 },
    { time: "23:00", aqi: 128 },
  ],
  "Dakshin Marg": [
    { time: "0:00", aqi: 95 },
    { time: "2:00", aqi: 88 },
    { time: "4:00", aqi: 92 },
    { time: "6:00", aqi: 108 },
    { time: "8:00", aqi: 125 },
    { time: "10:00", aqi: 118 },
    { time: "12:00", aqi: 112 },
    { time: "14:00", aqi: 115 },
    { time: "16:00", aqi: 128 },
    { time: "18:00", aqi: 135 },
    { time: "20:00", aqi: 118 },
    { time: "22:00", aqi: 105 },
    { time: "23:00", aqi: 98 },
  ],
  "Shanti Path": [
    { time: "0:00", aqi: 65 },
    { time: "2:00", aqi: 58 },
    { time: "4:00", aqi: 62 },
    { time: "6:00", aqi: 72 },
    { time: "8:00", aqi: 85 },
    { time: "10:00", aqi: 78 },
    { time: "12:00", aqi: 75 },
    { time: "14:00", aqi: 82 },
    { time: "16:00", aqi: 88 },
    { time: "18:00", aqi: 92 },
    { time: "20:00", aqi: 78 },
    { time: "22:00", aqi: 68 },
    { time: "23:00", aqi: 62 },
  ],
  "Jan Marg": [
    { time: "0:00", aqi: 105 },
    { time: "2:00", aqi: 98 },
    { time: "4:00", aqi: 110 },
    { time: "6:00", aqi: 122 },
    { time: "8:00", aqi: 145 },
    { time: "10:00", aqi: 138 },
    { time: "12:00", aqi: 132 },
    { time: "14:00", aqi: 135 },
    { time: "16:00", aqi: 148 },
    { time: "18:00", aqi: 155 },
    { time: "20:00", aqi: 138 },
    { time: "22:00", aqi: 115 },
    { time: "23:00", aqi: 108 },
  ],
  "Vikas Marg": [
    { time: "0:00", aqi: 135 },
    { time: "2:00", aqi: 128 },
    { time: "4:00", aqi: 140 },
    { time: "6:00", aqi: 152 },
    { time: "8:00", aqi: 175 },
    { time: "10:00", aqi: 168 },
    { time: "12:00", aqi: 158 },
    { time: "14:00", aqi: 162 },
    { time: "16:00", aqi: 178 },
    { time: "18:00", aqi: 185 },
    { time: "20:00", aqi: 168 },
    { time: "22:00", aqi: 145 },
    { time: "23:00", aqi: 138 },
  ],
  "Sector 17 Market Road": [
    { time: "0:00", aqi: 55 },
    { time: "2:00", aqi: 48 },
    { time: "4:00", aqi: 52 },
    { time: "6:00", aqi: 62 },
    { time: "8:00", aqi: 75 },
    { time: "10:00", aqi: 68 },
    { time: "12:00", aqi: 65 },
    { time: "14:00", aqi: 72 },
    { time: "16:00", aqi: 78 },
    { time: "18:00", aqi: 82 },
    { time: "20:00", aqi: 68 },
    { time: "22:00", aqi: 58 },
    { time: "23:00", aqi: 52 },
  ],
};

const chartConfig = {
  aqi: {
    label: "AQI",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

interface Chart02Props {
  selectedLocation?: string;
}

export function Chart02({ selectedLocation = "Madhya Marg" }: Chart02Props) {
  const aqiData = locationAQIData[selectedLocation as keyof typeof locationAQIData] || locationAQIData["Madhya Marg"];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-gray-800 dark:text-gray-200">
          AQI Trend (24h)
          <span className="text-sm font-normal text-gray-500 block">
            Location: {selectedLocation}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart
            accessibilityLayer
            data={aqiData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="time"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />
            <YAxis
              domain={[0, 200]}
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Line
              dataKey="aqi"
              type="natural"
              stroke="#22c55e"
              strokeWidth={3}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
