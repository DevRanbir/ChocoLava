
"use client";

import { Line, LineChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const locationResponseData = {
  "Madhya Marg": [
    { type: "Medical", avgTime: 8.2, target: 8.0 },
    { type: "Fire", avgTime: 12.5, target: 12.0 },
    { type: "Police", avgTime: 6.3, target: 7.0 },
    { type: "Traffic", avgTime: 15.8, target: 15.0 },
    { type: "Rescue", avgTime: 18.2, target: 20.0 },
  ],
  "Dakshin Marg": [
    { type: "Medical", avgTime: 7.5, target: 8.0 },
    { type: "Fire", avgTime: 11.2, target: 12.0 },
    { type: "Police", avgTime: 5.8, target: 7.0 },
    { type: "Traffic", avgTime: 14.3, target: 15.0 },
    { type: "Rescue", avgTime: 17.1, target: 20.0 },
  ],
  "Shanti Path": [
    { type: "Medical", avgTime: 6.8, target: 8.0 },
    { type: "Fire", avgTime: 9.5, target: 12.0 },
    { type: "Police", avgTime: 4.2, target: 7.0 },
    { type: "Traffic", avgTime: 11.7, target: 15.0 },
    { type: "Rescue", avgTime: 14.8, target: 20.0 },
  ],
  "Jan Marg": [
    { type: "Medical", avgTime: 7.8, target: 8.0 },
    { type: "Fire", avgTime: 11.8, target: 12.0 },
    { type: "Police", avgTime: 5.5, target: 7.0 },
    { type: "Traffic", avgTime: 13.9, target: 15.0 },
    { type: "Rescue", avgTime: 16.5, target: 20.0 },
  ],
  "Vikas Marg": [
    { type: "Medical", avgTime: 9.3, target: 8.0 },
    { type: "Fire", avgTime: 14.2, target: 12.0 },
    { type: "Police", avgTime: 7.8, target: 7.0 },
    { type: "Traffic", avgTime: 18.5, target: 15.0 },
    { type: "Rescue", avgTime: 21.3, target: 20.0 },
  ],
  "Sector 17 Market Road": [
    { type: "Medical", avgTime: 6.2, target: 8.0 },
    { type: "Fire", avgTime: 8.8, target: 12.0 },
    { type: "Police", avgTime: 3.9, target: 7.0 },
    { type: "Traffic", avgTime: 10.5, target: 15.0 },
    { type: "Rescue", avgTime: 13.7, target: 20.0 },
  ],
};

const chartConfig = {
  avgTime: {
    label: "Avg Response Time (min)",
    color: "hsl(var(--chart-1))",
  },
  target: {
    label: "Target Time (min)",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

interface Chart05Props {
  selectedLocation?: string;
}

export function Chart05({ selectedLocation = "Madhya Marg" }: Chart05Props) {
  const responseTimeData = locationResponseData[selectedLocation as keyof typeof locationResponseData] || locationResponseData["Madhya Marg"];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-gray-800 dark:text-gray-200">
          Emergency Response Times
          <span className="text-sm font-normal text-gray-500 block">
            Location: {selectedLocation}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart
            accessibilityLayer
            data={responseTimeData}
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
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <Line
              dataKey="avgTime"
              type="monotone"
              stroke="var(--color-avgTime)"
              strokeWidth={3}
              dot={{
                fill: "var(--color-avgTime)",
                strokeWidth: 2,
                r: 4,
              }}
              activeDot={{
                r: 6,
              }}
            />
            <Line
              dataKey="target"
              type="monotone"
              stroke="var(--color-target)"
              strokeWidth={2}
              strokeDasharray="5 5"
              dot={{
                fill: "var(--color-target)",
                strokeWidth: 2,
                r: 3,
              }}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}