"use client";

import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";
import Image from "next/image";
import googleIcon from "@/public/google.svg";
export function GoogleSignInButton() {
  return (
    <Button variant="outline" size="icon">
      <Image
        src={googleIcon}
        alt={"Google Icon"}
        onClick={() => signIn("google")}
        className="w-6 h-6"
      />
    </Button>
  );
}
