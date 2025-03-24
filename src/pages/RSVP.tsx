import { useState } from "react";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../components/ui/dialog";
import MenuHoverCard from "@/components/ui/MenuHoverCard";
import MusicSearch from "@/components/ui/MusicSearch";
import { db } from "../config/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

const RSVP = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    attending: "",
    meal: "",
    allergies: "",
    accommodation: "",
    song: "",
    songData: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    
    try {
      await addDoc(collection(db, "rsvps"), {
        ...formData,
        createdAt: serverTimestamp(),
      });
      
      console.log("RSVP successfully submitted to Firestore");
      setIsSubmitted(true);
    } catch (err) {
      console.error("Error submitting RSVP:", err);
      setError("提交失败，请稍后重试或联系我们。");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="py-8">
      <h1 className="text-3xl font-bold text-center mb-8">RSVP</h1>
      
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>请填写问卷</CardTitle>
          <CardDescription>为了更好地安排婚礼，请每位参加者填写一份</CardDescription>
        </CardHeader>
        
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="name">
                姓名
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full p-2 border rounded-md"
                placeholder="请输入您的姓名"
              />
              <p className="text-xs text-gray-500 mt-1">如果有家属一起参加，请一人填写一份</p>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="phone">
                电话号码
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                className="w-full p-2 border rounded-md"
                placeholder="请输入您的电话号码"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="email">
                邮箱
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full p-2 border rounded-md"
                placeholder="请输入您的邮箱"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="attending">
                2025.5.15日可以来参加吗？
              </label>
              <select
                id="attending"
                name="attending"
                value={formData.attending}
                onChange={handleChange}
                required
                className="w-full p-2 border rounded-md"
              >
                <option value="">请选择</option>
                <option value="yes">可以参加</option>
                <option value="no">无法参加</option>
              </select>
            </div>
            
            {formData.attending === "yes" && (
              <>
                <div>
                  <label className="block text-sm font-medium mb-1" htmlFor="meal">
                    <span className="flex justify-center items-center gap-1">请选择菜单<MenuHoverCard /></span>
                  </label>
                  <select
                    id="meal"
                    name="meal"
                    value={formData.meal}
                    onChange={handleChange}
                    required
                    className="w-full p-2 border rounded-md"
                  >
                    <option value="">请选择</option>
                    <option value="beef">A. 牛肉</option>
                    <option value="fish">B. 鱼肉</option>
                    <option value="vegetarian">C. 素食</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1" htmlFor="allergies">
                    食物过敏/禁忌
                  </label>
                  <textarea
                    id="allergies"
                    name="allergies"
                    value={formData.allergies}
                    onChange={handleChange}
                    className="w-full p-2 border rounded-md"
                    placeholder="如有食物过敏或禁忌，请在此注明"
                    rows={2}
                  ></textarea>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1" htmlFor="accommodation">
                    需要住宿吗？
                  </label>
                  <select
                    id="accommodation"
                    name="accommodation"
                    value={formData.accommodation}
                    onChange={handleChange}
                    required
                    className="w-full p-2 border rounded-md"
                  >
                    <option value="">请选择</option>
                    <option value="yes">需要</option>
                    <option value="no">不需要</option>
                  </select>
                  <p className="text-xs text-gray-500 mt-1">15日当晚我们会提供庄园内部的一晚住宿，由于房间有限，我们会优先安排外地和住的远的朋友，但本地朋友会尽量安排</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1" htmlFor="song">
                    请选择一首您想在婚礼上听到的歌曲，如果搜索不到，可以直接输入歌曲和歌手名
                  </label>
                  <MusicSearch 
                    value={formData.song}
                    onSelect={(track) => {
                      setFormData(prev => ({ 
                        ...prev, 
                        song: `${track.name} - ${track.artists[0].name}`,
                        songData: JSON.stringify(track)
                      }));
                    }}
                    placeholder="搜索歌曲..."
                  />
                </div>
              </>
            )}
          </CardContent>
          
          <CardFooter className="flex flex-col gap-2">
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <Button 
              type="submit" 
              className="w-full" 
              disabled={isLoading}
            >
              {isLoading ? "提交中..." : "提交"}
            </Button>
          </CardFooter>
        </form>
      </Card>
      
      <Dialog open={isSubmitted} onOpenChange={setIsSubmitted}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>

            <DialogTitle>感谢您的回复！</DialogTitle>
            <DialogDescription>
              我们已收到您的RSVP信息，期待在婚礼上见到您。
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex justify-between">
            <Button variant="outline" onClick={() => window.location.href = "/registry"}>前往礼物登记</Button>
          </DialogFooter>

        </DialogContent>
      </Dialog>
    </div>
  );
};

export default RSVP; 