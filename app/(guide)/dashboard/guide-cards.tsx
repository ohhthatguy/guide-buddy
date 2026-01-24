"use client";
import type { StatCard } from "./type/type";
import { DollarSign, Users, Star, TrendingUp } from "lucide-react";
import { useTheme } from "next-themes";

import { useEffect, useState } from "react";

const GuideCards = () => {
  const { theme } = useTheme();
  const initStats: StatCard[] = [
    {
      title: "Total Earnings",
      value: "$0",

      icon: DollarSign,
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      title: "Total Tour",
      value: "0",

      icon: Users,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      title: "Avg Rating",
      value: "0",

      icon: Star,
      color: "text-yellow-600",
      bgColor: "bg-yellow-100",
    },
    {
      title: "Completion Rate",
      value: "0%",

      icon: TrendingUp,
      color: "text-purple-600",
      bgColor: "bg-purple-100",
    },
  ];
  const [stats, setStats] = useState<StatCard[]>(initStats);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/guide/dashboard");
        const data = await res.json();
        console.log(data);

        if (!data) {
          throw new Error("Data is not fetched in guide cards");
        }

        const afterfetch = initStats.map((e: StatCard) => {
          const guide = data.data.GuideData;
          let newValue = e.value;

          // Determine the new value based on the title
          if (e.title === "Total Earnings")
            newValue = `$ ${guide.totalEarning}`;
          else if (e.title === "Total Tour")
            newValue = `${guide.toursCompleted}`;
          else if (e.title === "Avg Rating") newValue = `${guide.rating}`;
          else if (e.title === "Completion Rate")
            newValue = `${guide.completionRate} %`;

          // Return a NEW object copy with the updated value
          return { ...e, value: newValue };
        });

        setStats(afterfetch);
      } catch (error) {
        console.log("ERRO: ", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="flex justify-between gap-4">
      {stats?.map((e: StatCard, index: number) => {
        const Icon = e.icon;

        return (
          <div key={index} className="comp-bg p-8 rounded-md flex-1 ">
            <div className="flex justify-between mb-4 items-center">
              <Icon
                size={56}
                className={`p-2 rounded-md ${e.bgColor} ${e.color} `}
              />
              <div className="font-medium text-xl">{e.value}</div>
            </div>

            <div>
              <div
                className={`${
                  theme == "light" ? "text-gray-700" : "text-gray-400"
                }`}
              >
                {e.title}
              </div>
              <div className="font-medium text-3xl">{e.value}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default GuideCards;
