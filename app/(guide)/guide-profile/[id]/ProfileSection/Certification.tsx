"use client";
import { Shield } from "lucide-react";

const Certification = ({ certificationData }: { certificationData: any }) => {
  return (
    <div className="comp-bg my-4 p-4 grid gap-4 rounded-2xl">
      <div className="text-[clamp(2rem,5vw+0.1rem,3rem)]">Certification</div>

      <div className="flex gap-4 flex-col">
        {certificationData.certifications.map((e: any, index: number) => (
          <div key={index} className="flex gap-2 items-center">
            <Shield />
            <div className="font-normal text-xl">{e}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Certification;
