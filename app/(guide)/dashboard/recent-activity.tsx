import type { RecentActivity } from "./type/type";
const RecentActivityComp = () => {
  const recentActivity: RecentActivity[] = [
    {
      id: "1",
      type: "review",
      message: "New 5-star review from Michael Chen",
      time: "2 hours ago",
    },
    {
      id: "2",
      type: "booking",
      message: "New booking request from Emma Wilson",
      time: "5 hours ago",
    },
    {
      id: "3",
      type: "payment",
      message: "Payment received: $120",
      time: "1 day ago",
    },
    {
      id: "4",
      type: "milestone",
      message: "Congratulations! 300th tour completed",
      time: "2 days ago",
    },
  ];
  return (
    <div className=" p-4 comp-bg rounded-2xl">
      <div className="mb-4">
        <h4>Recent Activity</h4>
        <p>Latest updates and notifications</p>
      </div>

      <div>
        {recentActivity?.length > 0 ? (
          recentActivity.map((e: RecentActivity, index: number) => (
            <div
              key={index}
              className="grid grid-cols-[5%_95%] gap-4 p-2 mb-4 ele-bg rounded-md"
            >
              <div className="flex justify-end  items-center">
                <span className=" inline-block rounded-full bg-blue-700 w-2 h-2"></span>
              </div>
              <div className="">
                <div>{e.message}</div>
                <div>{e.time}</div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-gray-700">
            You dont have any activity to show!
          </div>
        )}
      </div>
    </div>
  );
};

export default RecentActivityComp;
