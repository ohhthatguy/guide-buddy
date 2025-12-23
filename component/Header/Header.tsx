"use client";

import ThemeToggle from "../ThemeToggle/ThemeToggle";
import Button from "../Button/page";
import { MapIcon, Sun, Moon } from "lucide-react";
import { useRouter } from "next/navigation";

const page = () => {
  const router = useRouter();

  return (
    <div className="w-full flex justify-between px-12 py-4 items-center ">
      <div
        onClick={() => router.push("/")}
        className="flex justify-center items-center gap-4"
      >
        <MapIcon className="h-8 w-8" />
        <section className="text-2xl ">Guideme</section>
      </div>

      <div className="flex justify-center items-center gap-8">
        <ThemeToggle />

        <Button onClick={() => router.push("/login")} varient="secondary">
          Log In
        </Button>
        <Button onClick={() => router.push("/signup")}>Sign Up</Button>
      </div>
    </div>
  );
};

export default page;
