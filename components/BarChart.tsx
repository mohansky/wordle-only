import { Card, Title, BarChart, Subtitle } from "@tremor/react";

export default function ScoresBarChart({chartdata}: any) {
  return (
    <Card>
      <Title>Scores of week</Title>
      <Subtitle>
        Scores by user
      </Subtitle>
      <BarChart
        className="mt-6"
        data={chartdata}
        index="profiles.username"
        categories={["wordle", "worldle", "q1", "q2", "q3", "q4" ]}
        colors={["blue", "red", "orange", "teal", "rose", "slate"]}
        // valueFormatter={dataFormatter}
        yAxisWidth={20}
      />
    </Card>
  )
}
