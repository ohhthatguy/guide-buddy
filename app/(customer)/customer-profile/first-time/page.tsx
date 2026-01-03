"use client";

import { useState, ChangeEvent } from "react";
import Select from "react-select";
import { useRouter } from "next/navigation";
import Button from "@/component/Button/page";

const page = () => {
  const router = useRouter();

  const handleInputDataChange = (
    e:
      | ChangeEvent<HTMLInputElement>
      | ChangeEvent<HTMLSelectElement>
      | ChangeEvent<HTMLTextAreaElement>
  ) => {
    setClientRemainingData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const initData = {
    phone: 0,
    profileURL: "",
    bio: "",
    languages: [] as string[],
  };

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

  const [clientRemainingData, setClientRemainingData] = useState(initData);

  const handleFirstLogin = async () => {
    try {
      const res = await fetch("/api/user/first_time_login", {
        method: "POST",
        body: JSON.stringify(clientRemainingData),
      });

      const data = await res.json();

      console.log(data);
      router.push(`/home?id=${data.AccountData.id}`);
    } catch (error) {
      console.log("Error at forntend in firstitme guide login: ", error);
    }
  };

  return (
    <>
      <div className=" flex justify-center items-center p-8 w-full">
        <div className="comp-bg rounded-2xl min-w-2xl p-8 ">
          <h3 className="text-center">Tell us more!</h3>

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
                value={clientRemainingData.profileURL}
                required
              />
            </div>

            <div>
              <label className="">Contact Number</label>
              <input
                className="border rounded-xl w-full px-4 py-2  mt-2 mb-4"
                placeholder=" Upload Profile reamiang"
                name="phone"
                type="number"
                onChange={handleInputDataChange}
                value={clientRemainingData.phone}
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
                value={clientRemainingData.bio}
                required
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
                  setClientRemainingData((prev) => ({
                    ...prev,
                    languages: data,
                  }));
                }}
                options={languageOptions}
                className="basic-multi-select"
                classNamePrefix="select"
              />
            </div>
          </div>

          <Button onClick={handleFirstLogin}> Continue</Button>
        </div>
      </div>
    </>
  );
};

export default page;
