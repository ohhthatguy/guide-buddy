"use client";
import { useState } from "react";
import toast from "react-hot-toast";
const NotePartInput = ({ tourID }: { tourID: string }) => {
  const [note, setNote] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleNote = async () => {
    if (!note) {
      toast.error("Please enter some notes");
      return;
    }

    try {
      const patchData = { tourID, guideNote: note ?? "default note" };
      setIsLoading(true);
      const res = await fetch("/api/guide/activity/guideNote", {
        method: "PATCH",
        body: JSON.stringify(patchData),
      });
      const data = await res.json();
      console.log(data);
    } catch (err) {
      console.log("ERROR in status upadte in guide side: ", err);
    }
    setIsLoading(false);
  };
  return (
    <div>
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
    </div>
  );
};

export default NotePartInput;
