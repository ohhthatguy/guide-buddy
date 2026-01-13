"use client";
import { MessageSquareHeart, Star } from "lucide-react";
import { useState } from "react";
import type { ReviewType } from "../guide-profile/type/type";

const ReviewSection = ({
  clientId,
  guideId,
}: {
  clientId: string;
  guideId: string;
}) => {
  const initReview: ReviewType = {
    rating: 0,
    comment: "",
    date: "",
    clientId: clientId,
    guideId: guideId,
  };
  const [reviewObj, setReviewObj] = useState<ReviewType>(initReview);

  const handleReview = async () => {
    try {
      const DataToBACKEND = {
        ...reviewObj,
        date: new Date().toLocaleDateString(),
      };
      console.log(DataToBACKEND);

      const res = await fetch("/api/user/activity/giveReview", {
        method: "POST",
        body: JSON.stringify(DataToBACKEND),
      });

      const data = await res.json();

      console.log("succesfsully saved review.", data);
    } catch (error) {
      console.log("Faield to  save review.", error);
    }
  };

  return (
    <div className="comp-bg rounded-md p-4 ">
      <div className="flex gap-4 items-center">
        <MessageSquareHeart />
        <h4>Leave a Review</h4>
      </div>

      <div className="ele-comp grid gap-4">
        <div>
          <h5>OVERALL RATING</h5>
          <div className="flex gap-4 ">
            {[1, 2, 3, 4, 5].map((_, index) => {
              return (
                <Star
                  onClick={() =>
                    setReviewObj(() => ({ ...reviewObj, rating: index + 1 }))
                  }
                  key={index}
                  className={` ${
                    reviewObj.rating >= index + 1 && "fill-yellow-300"
                  } hover:cursor-pointer `}
                />
              );
            })}
          </div>
        </div>

        <div>
          <h5>FEEDBACK</h5>

          <textarea
            name="note"
            rows={5}
            value={reviewObj.comment}
            onChange={(ele) =>
              setReviewObj({ ...reviewObj, comment: ele.target.value })
            }
            className="w-full ele-bg p-2 border rounded-md"
            placeholder="Share your experience..."
          />
        </div>

        <button
          onClick={handleReview}
          className={`${
            "text-white bg-blue-700"
            //   theme == "light"
            //   ? "text-black comp-bg"
            //   : "text-white comp-bg"
          } min-w-16 text-center rounded-xl hover:cursor-pointer p-2  `}
        >
          {/* {isLoading ? (
          <div className="flex items-center justify-center">
            <div className="h-12 w-12 animate-spin rounded-full border-4 border-gray-300 border-t-blue-600"></div>
          </div>
        ) : (
          "Save"
        )} */}
          Submit Review
        </button>
      </div>
    </div>
  );
};

export default ReviewSection;
