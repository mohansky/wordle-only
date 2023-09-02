import { BarList, Card, Title, Bold, Flex, Text } from "@tremor/react";

export default function ScoresBarList ({data}: any)  {
    return(
  <Card className="max-w-lg">
    <Title>Website Analytics</Title>
    <Flex className="mt-4">
      <Text>
        <Bold>Source</Bold>
      </Text>
      <Text>
        <Bold>Visits</Bold>
      </Text>
    </Flex>
    <BarList data={data} className="mt-2" />
  </Card>
)};
