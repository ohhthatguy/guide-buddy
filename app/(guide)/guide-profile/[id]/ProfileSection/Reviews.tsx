"use client";

import { Star } from "lucide-react";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";
import type { ReviewTypeFromBackend, GuideType } from "../../type/type";

const Reviews = ({
  id,
  role,
  Guidedata,
}: {
  id: string;
  role: "guide" | "customer";
  Guidedata: GuideType;
}) => {
  const { theme } = useTheme();
  console.log(
    "we call api with id to fetch reviews here in this component: ",
    id
  );

  const [review, setReview] = useState<ReviewTypeFromBackend[] | []>([]);

  // const demoReviews: ReviewType[] = [
  //   {
  //     id: "1",
  //     name: "John D.",
  //     rating: 5,
  //     comment: "Amazing tour! Very knowledgeable and friendly.",
  //     date: "2 days ago",
  //   },
  //   {
  //     id: "2",
  //     name: "Sarah M.",
  //     rating: 5,
  //     comment: "One of the best experiences of my trip.",
  //     date: "1 week ago",
  //   },
  //   {
  //     id: "3",
  //     name: "David L.",
  //     rating: 4,
  //     comment: "Great tour, learned a lot.",
  //     date: "2 weeks ago",
  //   },
  //   {
  //     id: "4",
  //     name: "Emily R.",
  //     rating: 5,
  //     comment: "Highly professional and fun!",
  //     date: "3 weeks ago",
  //   },
  //   {
  //     id: "5",
  //     name: "Michael K.",
  //     rating: 4,
  //     comment: "Worth every penny.",
  //     date: "1 month ago",
  //   },
  // ];

  useEffect(() => {
    const fetchReviews = async () => {
      console.log(id);
      console.log(Guidedata);

      try {
        const res = await fetch(
          `/api/user/activity/giveReview?guideId=${
            role === "guide" ? Guidedata.id : id
          }`
        );
        const data = await res.json();

        console.log(data.finalData);
        setReview(data.finalData);
      } catch (err) {
        console.log("ERROR IN GETTING THE REVEIEW", err);
      }
    };

    fetchReviews();
  }, []);

  return (
    <div className="comp-bg p-4 rounded-2xl">
      <h3 className="mb-4">Review ({review?.length})</h3>

      {review ? (
        review?.map((e: ReviewTypeFromBackend, index) => (
          <div className="ele-bg p-4  grid gap-4" key={index}>
            <div>
              <div className="flex justify-between">
                <div className="text-2xl">{e.clientName}</div>
                <div
                  className={`mb-1  ${
                    theme == "light" ? "text-gray-700" : "text-gray-400"
                  } `}
                >
                  {e.date}
                </div>
              </div>

              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={12}
                    className={`  ${
                      i < e.rating ? "fill-amber-400 " : "fill-gray-100"
                    }`}
                  />
                ))}
              </div>
            </div>

            <div
              className={` text-md ${
                theme == "light" ? "text-gray-600" : "text-gray-500"
              } `}
            >
              {e.comment}
            </div>

            <hr
              className={` mt-2 ${
                theme == "light" ? "text-gray-300" : "text-gray-800"
              } ${index + 1 == review.length ? "hidden" : "block"} `}
            />
          </div>
        ))
      ) : (
        <div>No reviews yet!</div>
      )}
    </div>
  );
};

export default Reviews;
