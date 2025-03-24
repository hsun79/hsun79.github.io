import { useState } from "react";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "../components/ui/dialog";
import { venmoQR } from "@/lib/imageUtils";

const Registry = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [paymentType, setPaymentType] = useState<"venmo" | "zelle" | null>(null);

  const handleCopyVenmo = () => {
    navigator.clipboard.writeText('@zzz123321');
    setPaymentType("venmo");
    setDialogOpen(true);
  };

  const handleCopyZelle = () => {
    navigator.clipboard.writeText('6504609537');
    setPaymentType("zelle");
    setDialogOpen(true);
  };

  return (
    <div className="py-8">
      <h1 className="text-3xl font-bold text-center mb-8">婚礼基金</h1>
      
      <div className="max-w-2xl mx-auto">
        <Card className="mb-8 border-none bg-transparent text-card-foreground shadow-none">
          <CardHeader>
            <CardTitle>感谢您的祝福</CardTitle>
            <CardDescription>
              我们最珍视的是您的出席和祝福。如果您想送礼物，我们设立了婚礼基金为大家提供尽可能好的餐食和住宿。
            </CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center">
            <div className="bg-white w-64 h-64 rounded-lg flex items-center justify-center">
              <img src={venmoQR} alt="Venmo/Zelle QR Code" className="w-full h-full object-contain p-4" />
            </div>
          </CardContent>
          <CardFooter className="flex justify-center gap-4">
            <Button onClick={handleCopyVenmo} variant="outline">复制Venmo账号</Button>
            <Button onClick={handleCopyZelle} variant="outline">复制Zelle账号</Button>
          </CardFooter>
        </Card>
        
        <div className="text-center text-gray-600">
          <p>再次感谢您的支持！</p>
        </div>
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>账号已复制</DialogTitle>
            <DialogDescription>
              {paymentType === "venmo" ? (
                <>
                  Venmo账号 <span className="font-semibold">@zzz123321</span> 已复制到剪贴板。
                  <p className="mt-2">收款人: <span className="font-semibold">Christine zzz</span></p>
                </>
              ) : (
                <>
                  Zelle账号 <span className="font-semibold">6504609537</span> 已复制到剪贴板。
                  <p className="mt-2">收款人: <span className="font-semibold">JIAYING HUANG</span></p>
                </>
              )}
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Registry; 