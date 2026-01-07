import { NotepadText } from "lucide-react";
import NotePartInput from "./NotePartInput";
import TourModel from "@/lib/database/Model/Tour";

const NotePart = async ({
  tourID,
  role,
}: {
  tourID: string;
  role: "guide" | "client";
}) => {
  try {
    const updateQuery = await TourModel.findOne({ _id: tourID });

    const data =
      updateQuery?.guideNote ?? "NO EXTRA NOTE OR INSTRUCTION FROM GUIDE";

    return (
      <div className=" comp-bg rounded-md p-4 flex flex-col justify-between">
        <div className="grid  ">
          <div className="flex gap-2  items-center">
            <NotepadText />
            <h4>Notes</h4>
          </div>
          <p className="text-sm  ">
            Add notes or instructions visible to the customer on their booking
            confirmation
          </p>
        </div>

        <div className=" flex-2 overflow-auto p-2 ele-bg my-2 italic">
          {data}
        </div>

        {role == "guide" && <NotePartInput tourID={tourID} />}

        {/* <div className="">
        <textarea
          name="note"
          rows={5}
          value={note}
          onChange={(ele) => setNote(ele.target.value)}
          className="w-full ele-bg p-2 border rounded-md"
          placeholder="e.g. Please bring comfortable walking shoes and water. We Will meet at the main gate."
        />
        <button
          onClick={handleNote}
          className={`${
            "text-white bg-blue-700"
            //   theme == "light"
            //   ? "text-black comp-bg"
            //   : "text-white comp-bg"
          } min-w-16 text-center rounded-xl hover:cursor-pointer p-2  `}
        >
          {isLoading ? (
            <div className="flex items-center justify-center">
              <div className="h-12 w-12 animate-spin rounded-full border-4 border-gray-300 border-t-blue-600"></div>
            </div>
          ) : (
            "Save"
          )}
        </button>
      </div> */}
      </div>
    );
  } catch (error) {
    console.log("ERROR in frontend notepart: ", error);
  }
};

export default NotePart;
