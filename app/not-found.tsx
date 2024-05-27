import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

export default function NotFound404() {
  return (
    <section className="grid h-screen place-items-center">
      <div className=" space-y-10 text-center">
        <p className="font-heading text-step6">This page does not exist.</p>
        <Button variant={"ctaFilled"} asChild>
          <Link href={`/protected`}>Return to homepage</Link>
        </Button>
      </div>
    </section>
  );
}
