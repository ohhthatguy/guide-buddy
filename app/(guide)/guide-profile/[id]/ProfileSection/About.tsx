"use client";
import { useTheme } from "next-themes";

const About = ({ aboutData }: { aboutData: any }) => {
  const { theme } = useTheme();
  return (
    <div className="comp-bg my-4 p-4 grid gap-4 rounded-2xl">
      <h3>About</h3>
      <p className="text-xl">{aboutData.bio}</p>

      <div className="flex  ">
        <div className="flex-1 ">
          <p
            className={`mb-1  ${
              theme == "light" ? "text-gray-700" : "text-gray-400"
            } `}
          >
            Languages
          </p>
          <div className="flex gap-4">
            {aboutData.languages.map((e: any, index: number) => (
              <span
                key={index}
                className={`p-1 rounded-xl text-sm ${
                  theme == "dark" ? "text-white" : "text-black"
                } ele-bg`}
              >
                {e}
              </span>
            ))}
          </div>
        </div>

        <div className="flex-2 text-right">
          <p
            className={`mb-1   ${
              theme == "light" ? "text-gray-700" : "text-gray-400"
            }`}
          >
            Experience
          </p>
          <div>
            <span className="ele-bg p-1 rounded-xl text-sm">
              {aboutData.experience} years{" "}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
