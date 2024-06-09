"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import githubIcon from "@/public/github.svg";
import { signIn } from "next-auth/react";
export function GithubSignInButton() {
  return (
    <Button variant="outline" size="icon" onClick={() => signIn("github")}>
      <Image src={githubIcon} alt={"Github Icon"} className="w-4 h-4" />
    </Button>
  );
}
