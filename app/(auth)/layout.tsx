import Image from "next/image";
import backgroundImage from "@/public/login_background.jpg";
import logo from "@/public/netflix_logo.svg";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/options";
import { redirect } from "next/navigation";
export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  if (session) return redirect("/home");
  return (
    <main className="relative flex h-screen w-screen flex-col bg-black md:items-center md:justify-center md:bg-transparent">
      <Image
        src={backgroundImage}
        alt="Background Image"
        className="hidden sm:flex sm:object-cover -z-10 brightness-50"
        priority
        fill
      />
      <Image
        src={logo}
        alt="Logo"
        className="left-4 top-4 absolute object-contain md:left-10 md:top-6"
        width={120}
        height={120}
        priority
      />
      {children}
    </main>
  );
}
