"use client";
import type { StatCard } from "./type/type";
import { DollarSign, Users, Star, TrendingUp } from "lucide-react";
import { useTheme } from "next-themes";

const GuideCards = () => {
  const { theme } = useTheme();
  const stats: StatCard[] = [
    {
      title: "Total Earnings",
      value: "$12,450",
      change: "+12.5%",
      icon: DollarSign,
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      title: "Tours This Month",
      value: "28",
      change: "+8.3%",
      icon: Users,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      title: "Avg Rating",
      value: "4.9",
      change: "+0.2",
      icon: Star,
      color: "text-yellow-600",
      bgColor: "bg-yellow-100",
    },
    {
      title: "Completion Rate",
      value: "98%",
      change: "+2%",
      icon: TrendingUp,
      color: "text-purple-600",
      bgColor: "bg-purple-100",
    },
  ];

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
