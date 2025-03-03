import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";

const OurStory = () => {
  return (
    <div className="py-8">
      <h1 className="text-3xl font-bold text-center mb-8">我们的故事</h1>
      
      <div className="max-w-3xl mx-auto">
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>相遇</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              [相遇的故事]
            </p>
          </CardContent>
        </Card>
        
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>相恋</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              [恋爱的点滴]
            </p>
          </CardContent>
        </Card>
        
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>结婚</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              [婚礼的回忆]
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>三年回顾</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              [婚后三年的美好时光]
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default OurStory; 