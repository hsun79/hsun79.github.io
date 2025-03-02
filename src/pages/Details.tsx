import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Container, Section, Grid, Flex, Heading, Text } from "@radix-ui/themes";

const Details = () => {
  return (
    <Section size="3" className="w-full">
      <Container className="w-full">
        <div className="content-container py-8">
          <Flex direction="column" align="center" gap="6">
            <Heading size="6" align="center">婚礼详情</Heading>
            
            <Grid columns={{initial: "1", md: "2", lg: "3"}} gap="6" width="100%">
              <Card>
                <CardHeader>
                  <CardTitle>日期与时间</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>2025年5月15日</p>
                  <p>时间: [待定]</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>地点</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Grand Island Mansion</p>
                  <p>California</p>
                  <p className="mt-2">[地址详情]</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>婚礼流程</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc list-inside space-y-2">
                    <li>仪式 - [时间]</li>
                    <li>鸡尾酒会 - [时间]</li>
                    <li>晚宴 - [时间]</li>
                    <li>庆祝活动 - [时间]</li>
                  </ul>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>衣着建议</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>[衣着建议详情]</p>
                </CardContent>
              </Card>
              
              <Card className="md:col-span-2 lg:col-span-2">
                <CardHeader>
                  <CardTitle>住宿</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>我们将在庄园内提供一晚住宿，房间有限，我们会优先安排外地和住得远的朋友，但会尽量满足所有人的住宿需求。</p>
                  <p className="mt-2">如果你需要住宿，请在RSVP表格中注明。</p>
                </CardContent>
              </Card>
            </Grid>
          </Flex>
        </div>
      </Container>
    </Section>
  );
};

export default Details; 