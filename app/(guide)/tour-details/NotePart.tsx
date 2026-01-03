import { NotepadText } from "lucide-react";

const NotePart = () => {
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
        this is the place
      </div>

      <div className="">
        <textarea
          name="note"
          rows={5}
          className="w-full ele-bg p-2 border rounded-md"
          placeholder="e.g. Please bring comfortable walking shoes and water. We Will meet at the main gate."
        />
        <button
          className={`${
            "text-white bg-blue-700"
            //   theme == "light"
            //   ? "text-black comp-bg"
            //   : "text-white comp-bg"
          } min-w-16 text-center rounded-xl hover:cursor-pointer p-2  `}
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default NotePart;
