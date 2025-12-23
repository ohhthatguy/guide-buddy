"use client";

import {
  MapIcon,
  Sun,
  Moon,
  TableOfContents,
  UserRound,
  Settings,
  LogOut,
} from "lucide-react";
import { useRouter } from "next/navigation";
import ThemeToggle from "@/component/ThemeToggle/ThemeToggle";

const Header = () => {
  const router = useRouter();

  return (
    <div className="w-full flex justify-between px-12 py-4 items-center comp-bg">
      <div
        onClick={() => router.push("/")}
        className="flex justify-center items-center gap-4"
      >
        <MapIcon className="h-8 w-8" />
        <section className="text-2xl ">Guideme</section>
      </div>

      <div className="flex justify-center items-center gap-8">
        <ThemeToggle />
        <Settings className="h-12 w-12 p-2 rounded-full ele-bg" />
        <UserRound className="h-12 w-12 p-2 rounded-full ele-bg" />
        <LogOut className="h-12 w-12 p-2 rounded-full ele-bg" />
      </div>
    </div>
  );
};

export default Header;
