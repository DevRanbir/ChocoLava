"use client";

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

// Location-specific crowd density data
const locationCrowdData = {
  "Madhya Marg": [
    { time: "6:00", density: 420 },
    { time: "7:00", density: 680 },
    { time: "8:00", density: 950 },
    { time: "9:00", density: 1200 },
    { time: "10:00", density: 1050 },
    { time: "11:00", density: 850 },
    { time: "12:00", density: 780 },
    { time: "13:00", density: 920 },
    { time: "14:00", density: 650 },
    { time: "15:00", density: 520 },
    { time: "16:00", density: 1150 },
    { time: "17:00", density: 1350 },
    { time: "18:00", density: 1500 },
    { time: "19:00", density: 1200 },
    { time: "20:00", density: 980 },
    { time: "21:00", density: 720 },
    { time: "22:00", density: 480 },
  ],
  "Dakshin Marg": [
    { time: "6:00", density: 280 },
    { time: "7:00", density: 450 },
    { time: "8:00", density: 620 },
    { time: "9:00", density: 780 },
    { time: "10:00", density: 680 },
    { time: "11:00", density: 520 },
    { time: "12:00", density: 480 },
    { time: "13:00", density: 580 },
    { time: "14:00", density: 380 },
    { time: "15:00", density: 320 },
    { time: "16:00", density: 720 },
    { time: "17:00", density: 850 },
    { time: "18:00", density: 950 },
    { time: "19:00", density: 780 },
    { time: "20:00", density: 620 },
    { time: "21:00", density: 420 },
    { time: "22:00", density: 280 },
  ],
  "Shanti Path": [
    { time: "6:00", density: 120 },
    { time: "7:00", density: 180 },
    { time: "8:00", density: 250 },
    { time: "9:00", density: 320 },
    { time: "10:00", density: 280 },
    { time: "11:00", density: 220 },
    { time: "12:00", density: 200 },
    { time: "13:00", density: 240 },
    { time: "14:00", density: 160 },
    { time: "15:00", density: 140 },
    { time: "16:00", density: 300 },
    { time: "17:00", density: 380 },
    { time: "18:00", density: 420 },
    { time: "19:00", density: 340 },
    { time: "20:00", density: 280 },
    { time: "21:00", density: 200 },
    { time: "22:00", density: 150 },
  ],
  "Jan Marg": [
    { time: "6:00", density: 320 },
    { time: "7:00", density: 520 },
    { time: "8:00", density: 720 },
    { time: "9:00", density: 920 },
    { time: "10:00", density: 800 },
    { time: "11:00", density: 620 },
    { time: "12:00", density: 580 },
    { time: "13:00", density: 680 },
    { time: "14:00", density: 450 },
    { time: "15:00", density: 380 },
    { time: "16:00", density: 850 },
    { time: "17:00", density: 1020 },
    { time: "18:00", density: 1150 },
    { time: "19:00", density: 920 },
    { time: "20:00", density: 750 },
    { time: "21:00", density: 520 },
    { time: "22:00", density: 350 },
  ],
  "Vikas Marg": [
    { time: "6:00", density: 480 },
    { time: "7:00", density: 750 },
    { time: "8:00", density: 1050 },
    { time: "9:00", density: 1320 },
    { time: "10:00", density: 1150 },
    { time: "11:00", density: 920 },
    { time: "12:00", density: 850 },
    { time: "13:00", density: 980 },
    { time: "14:00", density: 720 },
    { time: "15:00", density: 580 },
    { time: "16:00", density: 1250 },
    { time: "17:00", density: 1450 },
    { time: "18:00", density: 1620 },
    { time: "19:00", density: 1320 },
    { time: "20:00", density: 1080 },
    { time: "21:00", density: 780 },
    { time: "22:00", density: 520 },
  ],
  "Sector 17 Market Road": [
    { time: "6:00", density: 80 },
    { time: "7:00", density: 120 },
    { time: "8:00", density: 180 },
    { time: "9:00", density: 240 },
    { time: "10:00", density: 220 },
    { time: "11:00", density: 180 },
    { time: "12:00", density: 160 },
    { time: "13:00", density: 200 },
    { time: "14:00", density: 130 },
    { time: "15:00", density: 110 },
    { time: "16:00", density: 250 },
    { time: "17:00", density: 320 },
    { time: "18:00", density: 380 },
    { time: "19:00", density: 300 },
    { time: "20:00", density: 240 },
    { time: "21:00", density: 170 },
    { time: "22:00", density: 120 },
  ],
};

const chartConfig = {
  density: {
    label: "People Count",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

interface Chart03Props {
  selectedLocation?: string;
}

export function Chart03({ selectedLocation = "Madhya Marg" }: Chart03Props) {
  const crowdData = locationCrowdData[selectedLocation as keyof typeof locationCrowdData] || locationCrowdData["Madhya Marg"];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-gray-800 dark:text-gray-200">
          Crowd Density
          <span className="text-sm font-normal text-gray-500 block">
            Location: {selectedLocation}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={crowdData}
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
              domain={[0, 1700]}
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar
              dataKey="density"
              fill="#000000"
              radius={[2, 2, 0, 0]}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
