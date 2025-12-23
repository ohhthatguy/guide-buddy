"use client";

import { useTheme } from "next-themes";

const SearchBox = ({
  selectedView,
  setSelectedView,
}: {
  selectedView: "list" | "map";
  setSelectedView: React.Dispatch<React.SetStateAction<"list" | "map">>;
}) => {
  // type viewtype = "list" | "map";
  const { theme } = useTheme();
  // const [selectedView, setSelectedView] = useState<viewtype>("list");

  return (
    <div className=" place-items-center grid gap-4 py-8">
      <input
        className="border rounded-xl w-1/2 px-4 py-2  "
        type="text"
        name="searchbox"
        placeholder="Search by place"
      />

      <div className="flex justify-center items-center gap-4">
        <button
          onClick={() => setSelectedView("list")}
          className={`${
            selectedView == "list"
              ? "text-white bg-blue-700"
              : theme == "light"
              ? "text-black comp-bg"
              : "text-white comp-bg"
          } min-w-36 rounded-xl hover:cursor-pointer p-2  `}
        >
          {" "}
          List View{" "}
        </button>
        <button
          onClick={() => setSelectedView("map")}
          className={`${
            selectedView == "map"
              ? "text-white bg-blue-700"
              : theme == "light"
              ? "text-black comp-bg"
              : "text-white comp-bg"
          } min-w-36 rounded-xl hover:cursor-pointer p-2  `}
        >
          {" "}
          Map View{" "}
        </button>
      </div>
    </div>
  );
};

export default SearchBox;
