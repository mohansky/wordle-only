import { Card, Title, DonutChart } from "@tremor/react";

export default function ScoresDonutChart({scores}: any) {
  return (
    <Card className="">
      <Title>Sales</Title>
      <DonutChart
        className="mt-6"
        data={scores}
        category="wordle"
        index="profiles.username"
        // valueFormatter={valueFormatter}
        colors={["slate", "violet", "indigo", "rose", "cyan", "amber"]}
      />
    </Card>
  );
}
