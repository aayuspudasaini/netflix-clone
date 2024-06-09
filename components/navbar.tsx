"use client";
import Image from "next/image";
import Link from "next/link";
import netflix_logo from "@/public/netflix_logo.svg";
import { usePathname } from "next/navigation";
import { Bell, Search } from "lucide-react";
import UserNav from "./usernav";

interface LinkProps {
  name: string;
  href: string;
}
const Links: LinkProps[] = [
  {
    name: "Home",
    href: "/home",
  },

  {
    name: "Tv Shows",
    href: "/home/shows",
  },
  {
    name: "Movies",
    href: "/home/movies",
  },
  {
    name: "Recently Added",
    href: "/home/recently",
  },
  {
    name: "My Lists",
    href: "/home/user/list",
  },
];
export default function Navbar() {
  const pathname = usePathname();
  return (
    <div className="w-full max-w-7xl mx-auto items-center justify-between px-5 sm:px-6 py-5 lg:px-8 flex">
      <div className="flex items-center">
        <Link href={"/"} className="w-32">
          <Image src={netflix_logo} alt="Netflix Logo" priority />
        </Link>
        <ul className="lg:flex gap-x-4 ml-14 hidden">
          {Links.map((link, i) => (
            <div key={i}>
              {pathname === link.href ? (
                <li>
                  <Link
                    href={link.href}
                    className="text-white font-semibold underline text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ) : (
                <li>
                  <Link
                    href={link.href}
                    className="text-gray-300 font-normal text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              )}
            </div>
          ))}
        </ul>
      </div>
      <div className="flex items-center gap-x-8 ">
        <Search className="w-5 h-5 text-gray-500 cursor-pointer" />
        <Bell className="w-5 h-5 text-gray-500 cursor-pointer" />
        <UserNav />
      </div>
    </div>
  );
}
