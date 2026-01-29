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
import { useRouter, usePathname, useSearchParams } from "next/navigation";

const SpecialCustomerHomeHeader = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const selectedView = searchParams.get("view");
  const id = searchParams.get("id");

  const handleLogoClick = async () => {
    try {
      const res = await fetch("/api/redirect");
      const data = await res.json();

      console.log(data);

      router.push(data.data);
    } catch (error) {
      console.log("Error in clicking logo route (frontend): ", error);
    }
  };

  const handleLogout = async () => {
    try {
      const res = await fetch("/api/user/logout", {
        method: "GET",
      });
      console.log(res);
      const data = await res.json();
      console.log("Succesfuly logout: ", data);
      window.location.href = "/login";
    } catch (error) {
      console.log("Error while logging out: ", error);
    }
  };

  const handleProfileCustomer = async () => {
    try {
      const res = await fetch("/api/redirect/profile");
      const data = await res.json();

      if (!data) {
        console.log(
          "something wrong in handleProfileCustomer header account customer",
        );
        return;
      }

      router.push(data.data);
    } catch (error) {
      console.log(
        "Error in clicking the proifle section header customer: ",
        error,
      );
    }
  };

  const handleViewChange = () => {
    const replacedView = selectedView === "map" ? "list" : "map";
    console.log("Repalced view; ", replacedView);

    router.push(`${pathname}?id=${id}&view=${replacedView}`);
  };

  return (
    // <div className="w-full absolute z-1000  flex justify-between px-12 py-4 items-center ">
    <div className="w-full absolute z-1000  flex justify-between items-center ele-bg p-1">
      <div className="flex justify-center items-center gap-4  ">
        <MapIcon className=" sm:h-8 sm:w-8 text-black" />
        <section className=" text-sm sm:text-xl text-black">Guideme</section>
      </div>

      <div className="flex justify-center items-center gap-8">
        {/* <ThemeToggle /> */}
        <TableOfContents
          onClick={handleViewChange}
          className=" sm:h-10 sm:w-10 sm:p-2 rounded-full sm:ele-bg hover:cursor-pointer"
        />
        <UserRound
          onClick={handleProfileCustomer}
          className="sm:h-10 sm:w-10 sm:p-2 rounded-full sm:ele-bg hover:cursor-pointer"
        />
        <LogOut
          onClick={handleLogout}
          className="sm:h-10 sm:w-10 sm:p-2 rounded-full sm:ele-bg hover:cursor-pointer"
        />
      </div>
    </div>
  );
};

export default SpecialCustomerHomeHeader;
