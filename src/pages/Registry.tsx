import { Button } from "../components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../components/ui/card";

const Registry = () => {
  return (
    <div className="py-8">
      <h1 className="text-3xl font-bold text-center mb-8">婚礼基金</h1>
      
      <div className="max-w-2xl mx-auto">
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>感谢您的祝福</CardTitle>
            <CardDescription>
              我们最珍视的是您的出席和祝福。如果您想送礼物，我们设立了婚礼基金以确保所有需要住宿的朋友都能得到安排。
            </CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center">
            <div className="bg-gray-200 w-64 h-64 rounded-lg flex items-center justify-center">
              <p className="text-gray-500">Venmo/Zelle二维码</p>
            </div>
          </CardContent>
          <CardFooter className="flex justify-center">
            <Button>复制账号信息</Button>
          </CardFooter>
        </Card>
        
        <div className="text-center text-gray-600">
          <p>再次感谢您的祝福和支持！</p>
        </div>
      </div>
    </div>
  );
};

export default Registry; 