"use client";

import { MapIcon } from "lucide-react";

const page = () => {
  return (
    <div className="w-full h-40 flex flex-col justify-center items-center mt-4 comp-bg">
      <div className="flex justify-center items-center  gap-4">
        <MapIcon className="w-8 h-8 " />
        <h3>Guideme </h3>
      </div>
      <p className="subtitle">© 2025 GuideMe. All rights reserved.</p>
    </div>
  );
};

export default page;
