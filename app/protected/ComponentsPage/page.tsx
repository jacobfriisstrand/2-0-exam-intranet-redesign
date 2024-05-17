import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { MdEmail } from "react-icons/md";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function ProtectedPage() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/");
  }

  return (
    <div className="flex flex-col gap-4">
      <Button variant={"outline"}>
        <MdEmail />
        Outlined with icon
      </Button>
      <Button variant={"filled"}>Filled</Button>
      <Button variant={"ctaFilled"}>CTA Filled</Button>
      <Button variant={"ctaOutlined"}>CTA Outlined</Button>

      <Label>Input with label</Label>
      <Input icon={<MdEmail />} placeholder="Input with icon" />

      <div>
        <Label variant="hiddenLabel">Input without label</Label>
        <Input placeholder="Input without icon and label" />
      </div>
      <Textarea placeholder="Textarea" />
    </div>
  );
}
