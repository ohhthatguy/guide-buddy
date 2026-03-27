"use client";

import ThemeToggle from "../ThemeToggle/ThemeToggle";
import Button from "../Button/page";
import { MapIcon, Sun, Moon } from "lucide-react";
import { useRouter } from "next/navigation";

const page = () => {
  const router = useRouter();

  return (
    <div className="w-full border-b-2 shadow-2xl flex justify-between p-4 items-center ">
      <div
        onClick={() => router.push("/")}
        className="flex justify-center items-center gap-4"
      >
        <section className="text-2xl italic text-blue-700 font-bold ">
          GuideBuddy
        </section>
      </div>

      <div className="flex justify-center items-center gap-8">
        <ThemeToggle />

        {/* <Button onClick={() => router.push("/login")} varient="secondary">
          Log In
        </Button>
        <Button onClick={() => router.push("/signup")}>Sign Up</Button> */}
      </div>
    </div>
  );
};

export default page;
