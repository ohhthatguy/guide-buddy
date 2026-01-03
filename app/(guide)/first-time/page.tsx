"use client";

import { useState, ChangeEvent } from "react";
import Select from "react-select";
import { useRouter } from "next/navigation";
import Button from "@/component/Button/page";
import type { GuideType } from "../guide-profile/type/type";
import { useGetCurrentPosition } from "@/lib/helper/useGetCurrentPosition";
const page = () => {
  const router = useRouter();

  // 1. Call the hook at the TOP LEVEL
  const position = useGetCurrentPosition();

  const handleInputDataChange = (
    e:
      | ChangeEvent<HTMLInputElement>
      | ChangeEvent<HTMLSelectElement>
      | ChangeEvent<HTMLTextAreaElement>
  ) => {
    setGuideRemainingData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const initData = {
    speciality: [] as string[],
    hourlyRate: 10,
    profileURL: "",
    available: false,
    bio: "",
    location: [] as number[],
    experience: "",
    toursCompleted: 0,
    responseTime: "",
    certifications: [] as string[],
    languages: [] as string[],
  };

  const specialtyOptions = [
    { value: "trekking", label: "High Altitude Trekking" },
    { value: "climbing", label: "Rock & Ice Climbing" },
    { value: "mountaineering", label: "Mountaineering" },
    { value: "culture", label: "Cultural & Heritage Tours" },
    { value: "wildlife", label: "Wildlife Safari" },
    { value: "first_aid", label: "Wilderness First Aid" },
    { value: "rescue", label: "Search & Rescue" },
    { value: "photography", label: "Landscape Photography" },
    { value: "cycling", label: "Mountain Biking" },
    { value: "rafting", label: "White Water Rafting" },
  ];

  const languageOptions = [
    { value: "english", label: "English" },
    { value: "nepali", label: "Nepali" },
    { value: "hindi", label: "Hindi" },
    { value: "spanish", label: "Spanish" },
    { value: "french", label: "French" },
    { value: "german", label: "German" },
    { value: "chinese", label: "Chinese" },
    { value: "japanese", label: "Japanese" },
  ];

  const certificationOptions = [
    { value: "wfa", label: "Wilderness First Aid (WFA)" },
    { value: "wfr", label: "Wilderness First Responder (WFR)" },
    { value: "nmga", label: "Nepal Mountaineering Guide Association" },
    { value: "nma", label: "Nepal Mountaineering Association" },
    { value: "uiagm", label: "IFMGA / UIAGM Mountain Guide" },
    { value: "lnt", label: "Leave No Trace Trainer" },
    { value: "avalanche_1", label: "AIARE Avalanche Level 1" },
    { value: "cpr", label: "Red Cross CPR & Basic First Aid" },
    { value: "rock_instructor", label: "Certified Rock Climbing Instructor" },
  ];

  const experienceOptions = [
    { value: "0-1", label: "Less than 1 year" },
    { value: "1-3", label: "1 - 3 years" },
    { value: "3-5", label: "3 - 5 years" },
    { value: "5-10", label: "5 - 10 years" },
    { value: "10+", label: "10+ years" },
  ];

  const [guideRemainingData, setGuideRemainingData] = useState(initData);

  const handleFirstLogin = async () => {
    try {
      // console.log(guideRemainingData);
      console.log(position);

      if (!position) {
        alert("Geoposition is required!");
        return;
      }

      setGuideRemainingData((prev) => ({
        ...prev,
        location: position,
      }));

      const guideRemainingDataWithLocation = {
        ...guideRemainingData,
        location: position,
      };
      console.log(guideRemainingDataWithLocation);

      const res = await fetch("/api/guide/first_time_login", {
        method: "POST",
        body: JSON.stringify(guideRemainingDataWithLocation),
      });

      const data = await res.json();

      console.log(data);
      router.push(`/dashboard?id=${data.AccountData.id}`);
    } catch (error) {
      console.log("Error at forntend in firstitme guide login: ", error);
    }
  };

  return (
    <>
      <div className=" flex justify-center items-center p-8 w-full">
        <div className="comp-bg rounded-2xl min-w-2xl p-8 ">
          <h3 className="text-center">Tell us more!</h3>

          {/* <div className="my-4">
            <label className="">Speciality</label>
            <input
              className="border rounded-xl w-full px-4 py-2  mt-2 mb-4"
              placeholder=" John Doe"
              name="name"
              type="text"
              onChange={handleInputDataChange}
              value={signupData.name}
              required
            />

            <fieldset className="flex gap-8">
              <div>
                <label className="">Email</label>
                <input
                  className="border rounded-xl w-full px-4 py-2  mt-2 mb-4"
                  placeholder=" youremail@gmail.com"
                  name="email"
                  type="email"
                  onChange={handleInputDataChange}
                  value={signupData.email}
                  required
                />
              </div>

              <div>
                <label className="">Password</label>
                <input
                  className="border rounded-xl w-full px-4 py-2  mt-2 mb-8"
                  placeholder="Enter Your Password"
                  name="password"
                  type="password"
                  onChange={handleInputDataChange}
                  value={signupData.password}
                  required
                />
              </div>
            </fieldset>

            <label className="">Confirm Password</label>
            <input
              className="border rounded-xl w-full px-4 py-2  mt-2 mb-8"
              placeholder="Confirm Your Password"
              name="confirmPassword"
              type="confirmPassword"
              onChange={handleInputDataChange}
              value={signupData.confirmPassword}
              required
            />

            <label className="">I want to </label>
            <br />

            <select
              name="role"
              onChange={handleInputDataChange}
              value={signupData.role}
              className="border rounded-xl w-full p-4 mt-2 mb-8"
            >
              <option value="customer">Find a Guide</option>
              <option value="guide">Become a Guide</option>
            </select>

            <Button size="full" onClick={handleSignup}>
              Log in
            </Button>
          </div> */}

          <div className="my-4">
            {/* //profile  */}
            <div>
              <label className="">Profile upload</label>
              <input
                className="border rounded-xl w-full px-4 py-2  mt-2 mb-4"
                placeholder=" Upload Profile reamiang"
                name="profileURL"
                type="text"
                onChange={handleInputDataChange}
                value={guideRemainingData.profileURL}
                required
              />
            </div>

            <div>
              <label className="">Hourly Rate</label>
              <input
                className="border rounded-xl w-full px-4 py-2  mt-2 mb-4"
                name="hourlyRate"
                type="number"
                min={10}
                max={100}
                onChange={handleInputDataChange}
                value={guideRemainingData.hourlyRate}
                required
              />
            </div>

            <div>
              <label className="">About Yourself</label>
              <textarea
                className="border rounded-xl w-full px-4 py-2  mt-2 mb-4"
                placeholder=" Write something about yourself"
                name="bio"
                rows={5}
                onChange={handleInputDataChange}
                value={guideRemainingData.bio}
                required
              />
            </div>

            <div>
              <label className="">Speciality</label>
              <Select
                defaultValue={[specialtyOptions[2]]}
                isMulti
                name="speciality"
                onChange={(e) => {
                  console.log(e);
                  const data = e.map((ele) => ele.value);
                  console.log(data);
                  setGuideRemainingData((prev) => ({
                    ...prev,
                    speciality: data,
                  }));
                }}
                options={specialtyOptions}
                className="basic-multi-select"
                classNamePrefix="select"
              />
            </div>

            {/* lang  */}
            <div>
              <label className="">Language</label>
              <Select
                defaultValue={[languageOptions[1]]}
                isMulti
                name="languages"
                onChange={(e) => {
                  console.log(e);
                  const data = e.map((ele) => ele.value);
                  console.log(data);
                  setGuideRemainingData((prev) => ({
                    ...prev,
                    languages: data,
                  }));
                }}
                options={languageOptions}
                className="basic-multi-select"
                classNamePrefix="select"
              />
            </div>

            <div>
              <label className="">Certification</label>
              <Select
                defaultValue={[certificationOptions[1]]}
                isMulti
                name="certifications"
                onChange={(e) => {
                  console.log(e);
                  const data = e.map((ele) => ele.value);
                  console.log(data);
                  setGuideRemainingData((prev) => ({
                    ...prev,
                    certifications: data,
                  }));
                }}
                options={certificationOptions}
                className="basic-multi-select"
                classNamePrefix="select"
              />
            </div>

            <div>
              <label className="">Experience</label>
              <Select
                defaultValue={[experienceOptions[1]]}
                name="experience"
                onChange={(e) => {
                  console.log(e);
                  const data = e?.value || "";
                  console.log(data);
                  setGuideRemainingData((prev) => ({
                    ...prev,
                    experience: data,
                  }));
                }}
                options={experienceOptions}
                className="basic-multi-select"
                classNamePrefix="select"
              />
            </div>
          </div>
          <p>
            Already have an account?{" "}
            <span
              className="text-blue-700 cursor-pointer "
              onClick={() => router.push("/login")}
            >
              Login
            </span>
          </p>

          <Button onClick={handleFirstLogin}> Continue</Button>
        </div>
      </div>
    </>
  );
};

export default page;
