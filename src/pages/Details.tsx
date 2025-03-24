import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { heroImages } from "@/lib/imageUtils";
import { Container, Section, Grid, Flex, Heading } from "@radix-ui/themes";
import { useMediaQuery } from "react-responsive";
const Details = () => {
  const isMobile = useMediaQuery(
    {query: '(max-width: 768px)'}
  );
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
                  <p>时间: 4:20 PM</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>地点</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Grand Island Mansion</p>
                  <p className="mt-2">13415 Grand Island Rd, Walnut Grove, CA 95690</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>婚礼流程</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc list-inside space-y-2">
                    <li>16:20 签到</li>
                    <li>17:00 仪式</li>
                    <li>17:30 大合照</li>
                    <li>17:45 下午茶</li>
                    <li>19:00 致辞 晚宴</li>
                    <li>20:00 切蛋糕 甜品</li>
                    <li>20:30 跳舞 派对</li>
                    <li>22:00 结束</li>
                  </ul>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>衣着建议</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="mb-2">"春日派对 / 碎花 / 优雅"</p>
                  <p className="mb-2">建议穿着以下色系：</p>
                  <p className="mb-4">香槟色 绿色 粉色 紫色</p>
                  <p className="mb-4">我们会设置最佳着装奖投票，期待你的参与~</p>

                  <h3 className="text-xl font-semibold mt-6 mb-2">小贴士</h3>
                  <p className="mb-2">5月加州天气约为白天25°C，晚上15°C</p>
                  <p className="mb-2">请做好防晒，准备一件外套保暖哦</p>
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
      <div className="flex justify-center items-center h-auto">
        <img src={isMobile ? heroImages.ending : heroImages.endingDesktop} alt="Ending" className="w-full h-[70vh] object-cover" />
      </div>

    </Section>
  );
};

export default Details; 