import AuthButton from "@/components/AuthButton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { MdEmail } from "react-icons/md";

export default async function ProtectedPage() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/");
  }

  return (
    <>
      <AuthButton />
      <Button variant={"outline"}>
        Outlined
        <MdEmail />
      </Button>
      <Button variant={"filled"}>Filled</Button>
      <Button variant={"ctaFilled"}>CTA Filled</Button>
      <Button variant={"ctaOutlined"}>CTA Outlined</Button>
      <Label>Label</Label>
      <Input placeholder="placeholder" />
    </>
  );
}
