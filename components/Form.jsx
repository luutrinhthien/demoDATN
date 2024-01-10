import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"

export function Form() {
  return (
    (<main
      className="w-full max-w-lg mx-auto mt-10 px-4 py-8 rounded-xl bg-gradient-to-r from-green-300 from-10% via-green-200 via-30% to-green-100 to-90%">
      <h1 className="text-2xl font-bold text-center mb-4">Cập nhật Nhật ký</h1>
      <form className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="title">Tiêu đề</Label>
          <Input id="title" placeholder="Nhập tiêu đề của bạn" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="description">Mô tả</Label>
          <Textarea
            className="min-h-[100px]"
            id="description"
            placeholder="Nhập mô tả của bạn" />
        </div>
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="file">Tải lên file</Label>
          <Input id="file" type="file" />
        </div>
        <Button className="w-full rounded-xl bg-white" type="submit">
          Cập nhật Nhật ký
        </Button>
      </form>
    </main>)
  );
}
