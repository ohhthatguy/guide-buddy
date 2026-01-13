"use client";

import { Star } from "lucide-react";
import { useTheme } from "next-themes";
import { useState, useEffect, useRef } from "react";
import type { ReviewTypeFromBackend, GuideType } from "../../type/type";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { isFinalPage } from "@/lib/helper/pagination";
import Link from "next/link";

const Reviews = ({
  id,
  role,
  Guidedata,
  page,
}: {
  id: string;
  role: "guide" | "customer";
  Guidedata: GuideType;
  page: string;
}) => {
  const reviewRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const pathname = usePathname();

  const { theme } = useTheme();
  console.log(
    "we call api with id to fetch reviews here in this component: ",
    id
  );

  const [review, setReview] = useState<ReviewTypeFromBackend[] | []>([]);
  const [totalReviewCount, setTotalReviewCount] = useState<number>(0);
  // const [pageState, setPageState] = useState(page);

  const searchParams = useSearchParams();

  const focusReview = searchParams.get("focusReview");
  const pageParam = searchParams.get("page");

  // console.log("PAGE PAGE PAGE: ", pageParam);

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
          }&page=${page}`
        );
        const data = await res.json();

        if (focusReview && reviewRef.current) {
          reviewRef.current?.scrollIntoView({
            behavior: "smooth",
            block: "center",
          });

          const params = new URLSearchParams(window.location.search);

          if (params.has("focusReview")) {
            params.delete("focusReview"); // Remove only this key

            // Update the URL without a page refresh or jumping the scroll
            // remove the ?focusReview part after scroll into view
            const newUrl = params.toString()
              ? `${pathname}?${params.toString()}`
              : pathname;
            router.replace(newUrl, { scroll: false });
          }
        }

        console.log(data.finalData);
        setReview(data.finalData);
        setTotalReviewCount(data.totalReviewCount);

        const element = document.getElementById("next-review-link");
        if (element && Number(page) > 1) {
          element.scrollIntoView({
            behavior: "smooth",
            block: "center",
          });
        }
      } catch (err) {
        console.log("ERROR IN GETTING THE REVEIEW", err);
      }
    };

    fetchReviews();
  }, [page]);

  console.log("TOTOAL REVIEW CONT OF THIS GUIDE: ", totalReviewCount);

  const createPageURL = () => {
    const params = new URLSearchParams(searchParams.toString());
    const pageNumber = Number(page) + 1;
    params.set("page", pageNumber.toString());

    return `${pathname}?${params.toString()}`;
  };

  return (
    <div className="comp-bg p-4 rounded-2xl">
      <h3 ref={reviewRef} className="mb-4">
        Review ({totalReviewCount})
      </h3>

      <div className=" h-[60vh] overflow-auto px-4">
        {review ? (
          review?.map((e: ReviewTypeFromBackend, index) => (
            <div key={index}>
              <div className="ele-bg p-4  grid gap-4">
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

              {!isFinalPage(Number(page), totalReviewCount) &&
                review.length - 1 == index && (
                  <div className=" text-center">
                    <Link
                      className="text-blue-600 underline"
                      href={createPageURL()}
                    >
                      More
                    </Link>
                  </div>
                )}
              {review.length - 1 == index && <div id="next-review-link"></div>}
            </div>
          ))
        ) : (
          <div className=" h-[60vh] overflow-auto px-4 flex justify-center items-center">
            No reviews yet!
          </div>
        )}
      </div>
    </div>
  );
};

export default Reviews;
