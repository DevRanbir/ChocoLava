"use client";

import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

// Location-specific noise pollution data
const locationNoiseData = {
  "Madhya Marg": [
    { time: "2:00", level: 65 },
    { time: "4:00", level: 72 },
    { time: "6:00", level: 88 },
    { time: "8:00", level: 95 },
    { time: "10:00", level: 85 },
    { time: "12:00", level: 78 },
    { time: "14:00", level: 82 },
    { time: "16:00", level: 92 },
    { time: "18:00", level: 105 },
    { time: "20:00", level: 98 },
    { time: "22:00", level: 75 },
    { time: "23:00", level: 68 },
  ],
  "Dakshin Marg": [
    { time: "2:00", level: 55 },
    { time: "4:00", level: 62 },
    { time: "6:00", level: 78 },
    { time: "8:00", level: 85 },
    { time: "10:00", level: 75 },
    { time: "12:00", level: 68 },
    { time: "14:00", level: 72 },
    { time: "16:00", level: 82 },
    { time: "18:00", level: 95 },
    { time: "20:00", level: 88 },
    { time: "22:00", level: 65 },
    { time: "23:00", level: 58 },
  ],
  "Shanti Path": [
    { time: "2:00", level: 35 },
    { time: "4:00", level: 42 },
    { time: "6:00", level: 58 },
    { time: "8:00", level: 65 },
    { time: "10:00", level: 55 },
    { time: "12:00", level: 48 },
    { time: "14:00", level: 52 },
    { time: "16:00", level: 62 },
    { time: "18:00", level: 75 },
    { time: "20:00", level: 68 },
    { time: "22:00", level: 45 },
    { time: "23:00", level: 38 },
  ],
  "Jan Marg": [
    { time: "2:00", level: 50 },
    { time: "4:00", level: 57 },
    { time: "6:00", level: 73 },
    { time: "8:00", level: 80 },
    { time: "10:00", level: 70 },
    { time: "12:00", level: 63 },
    { time: "14:00", level: 67 },
    { time: "16:00", level: 77 },
    { time: "18:00", level: 90 },
    { time: "20:00", level: 83 },
    { time: "22:00", level: 60 },
    { time: "23:00", level: 53 },
  ],
  "Vikas Marg": [
    { time: "2:00", level: 70 },
    { time: "4:00", level: 77 },
    { time: "6:00", level: 93 },
    { time: "8:00", level: 100 },
    { time: "10:00", level: 90 },
    { time: "12:00", level: 83 },
    { time: "14:00", level: 87 },
    { time: "16:00", level: 97 },
    { time: "18:00", level: 110 },
    { time: "20:00", level: 103 },
    { time: "22:00", level: 80 },
    { time: "23:00", level: 73 },
  ],
  "Sector 17 Market Road": [
    { time: "2:00", level: 30 },
    { time: "4:00", level: 37 },
    { time: "6:00", level: 53 },
    { time: "8:00", level: 60 },
    { time: "10:00", level: 50 },
    { time: "12:00", level: 43 },
    { time: "14:00", level: 47 },
    { time: "16:00", level: 57 },
    { time: "18:00", level: 70 },
    { time: "20:00", level: 63 },
    { time: "22:00", level: 40 },
    { time: "23:00", level: 33 },
  ],
};

const chartConfig = {
  level: {
    label: "Noise Level (dB)",
    color: "hsl(var(--chart-3))",
  },
} satisfies ChartConfig;

interface Chart04Props {
  selectedLocation?: string;
}

export function Chart04({ selectedLocation = "Madhya Marg" }: Chart04Props) {
  const noisePollutionData = locationNoiseData[selectedLocation as keyof typeof locationNoiseData] || locationNoiseData["Madhya Marg"];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-gray-800 dark:text-gray-200">
          Noise Pollution Trend
          <span className="text-sm font-normal text-gray-500 block">
            Location: {selectedLocation}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <AreaChart
            accessibilityLayer
            data={noisePollutionData}
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
              domain={[0, 120]}
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <defs>
              <linearGradient id="fillLevel" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="#ef4444"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="#ef4444"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <Area
              dataKey="level"
              type="natural"
              fill="url(#fillLevel)"
              fillOpacity={0.4}
              stroke="#ef4444"
              strokeWidth={2}
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
