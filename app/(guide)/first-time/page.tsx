"use client";

import Select from "react-select";
import { useRouter } from "next/navigation";

import { useGetCurrentPosition } from "@/lib/helper/useGetCurrentPosition";

import { zodResolver } from "@hookform/resolvers/zod";
import { firstTimeGuideSchema } from "@/lib/zodSchema/firstTimeSchema";
import { useForm, Controller } from "react-hook-form";

const page = () => {
  const router = useRouter();

  // 1. Call the hook at the TOP LEVEL
  const position = useGetCurrentPosition();
  // const initData = {
  //   speciality: [] as string[],
  //   hourlyRate: 10,
  //   profileURL: "",
  //   available: false,
  //   bio: "",
  //   location: [] as number[],
  //   experience: "",
  //   toursCompleted: 0,
  //   responseTime: "",
  //   certifications: [] as string[],
  //   languages: [] as string[],
  //   phone: 0,
  // };

  const {
    handleSubmit,
    control,
    register,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(firstTimeGuideSchema),
  });

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

  const handleFirstLogin = async (guideRemainingData: any) => {
    try {
      console.log(guideRemainingData);
      console.log(position);

      if (!position) {
        alert("Geoposition is required!");
        return;
      }

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
      router.push(`/dashboard?id=${data.data.AccountData.id}&page=1`);
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

          <form onSubmit={handleSubmit(handleFirstLogin)} className="my-4">
            {/* //profile  */}
            <div className="mb-4">
              <label className="">Profile upload</label>
              <input
                className="border rounded-xl w-full px-4 py-2  mt-2 "
                placeholder=" Upload Profile reamiang"
                type="text"
                {...register("profileURL")}
              />
              {errors.profileURL?.message && (
                <p className="  text-xs w-full text-red-500 ">
                  {String(errors.profileURL.message)}
                </p>
              )}
            </div>

            {/* //phone number  */}
            <div className="mb-4">
              <label className="">Contact </label>
              <input
                className="border rounded-xl w-full px-4 py-2  mt-2"
                // placeholder=""

                type="number"
                {...register("phone")}
              />
              {errors.phone?.message && (
                <p className="  text-xs w-full text-red-500 ">
                  {String(errors.phone.message)}
                </p>
              )}
            </div>

            <div className="mb-4">
              <label className="">Hourly Rate</label>
              <input
                className="border rounded-xl w-full px-4 py-2  mt-2 "
                type="number"
                min={10}
                max={100}
                {...register("hourlyRate")}
              />
              {errors.hourlyRate?.message && (
                <p className="  text-xs w-full text-red-500 ">
                  {String(errors.hourlyRate.message)}
                </p>
              )}
            </div>

            <div className="mb-4">
              <label className="">About Yourself</label>
              <textarea
                className="border rounded-xl w-full px-4 py-2  mt-2 "
                placeholder=" Write something about yourself"
                rows={5}
                {...register("bio")}
              />
              {errors.bio?.message && (
                <p className="  text-xs w-full text-red-500 ">
                  {String(errors.bio.message)}
                </p>
              )}
            </div>

            <div>
              <label className="">Speciality</label>
              <Controller
                name="speciality"
                control={control}
                render={({ field: { onChange, value, ref } }) => (
                  <Select
                    ref={ref}
                    defaultValue={[specialtyOptions[2]]}
                    isMulti
                    name="speciality"
                    value={specialtyOptions.filter((opt) =>
                      (value as string[])?.includes(opt.value)
                    )}
                    onChange={(e) => {
                      console.log(e);
                      const data = e.map((ele) => ele.value);
                      console.log(data);
                      onChange(data);
                    }}
                    options={specialtyOptions}
                    className="basic-multi-select"
                    classNamePrefix="select"
                  />
                )}
              />
              {errors.speciality?.message && (
                <p className="  text-xs w-full text-red-500 ">
                  {String(errors.speciality.message)}
                </p>
              )}
            </div>

            {/* lang  */}
            <div>
              <label className="">Language</label>
              <Controller
                name="languages"
                control={control}
                render={({ field: { onChange, value, ref } }) => (
                  <Select
                    ref={ref}
                    defaultValue={[languageOptions[1]]}
                    isMulti
                    name="languages"
                    value={languageOptions.filter((opt) =>
                      (value as string[])?.includes(opt.value)
                    )}
                    onChange={(e) => {
                      console.log(e);
                      const data = e.map((ele) => ele.value);
                      console.log(data);
                      onChange(data);
                    }}
                    options={languageOptions}
                    className="basic-multi-select"
                    classNamePrefix="select"
                  />
                )}
              />
              {errors.languages?.message && (
                <p className="  text-xs w-full text-red-500 ">
                  {String(errors.languages.message)}
                </p>
              )}
            </div>

            <div>
              <label className="">Certification</label>

              <Controller
                name="certifications"
                control={control}
                render={({ field: { onChange, value, ref } }) => (
                  <Select
                    ref={ref}
                    defaultValue={[certificationOptions[1]]}
                    isMulti
                    name="certifications"
                    value={certificationOptions.filter((opt) =>
                      (value as string[])?.includes(opt.value)
                    )}
                    onChange={(e) => {
                      console.log(e);
                      const data = e.map((ele) => ele.value);
                      console.log(data);
                      onChange(data);
                    }}
                    options={certificationOptions}
                    className="basic-multi-select"
                    classNamePrefix="select"
                  />
                )}
              />
              {errors.certifications?.message && (
                <p className="  text-xs w-full text-red-500 ">
                  {String(errors.certifications.message)}
                </p>
              )}
            </div>

            <div>
              <label className="">Experience</label>

              <Controller
                name="experience"
                control={control}
                render={({ field: { onChange, value, ref } }) => (
                  <Select
                    ref={ref}
                    name="experience"
                    value={experienceOptions.find((opt) => opt.value === value)}
                    onChange={(e) => {
                      console.log(e);
                      const data = e?.value || "";
                      console.log(data);
                      onChange(data);
                    }}
                    options={experienceOptions}
                    className="basic-select"
                    classNamePrefix="select"
                  />
                )}
              />
              {errors.experience?.message && (
                <p className="  text-xs w-full text-red-500 ">
                  {String(errors.experience.message)}
                </p>
              )}
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

            {/* <Button onClick={handleFirstLogin}> Continue</Button> */}
            <button
              type="submit"
              className="rounded-xl w-full hover:cursor-pointer p-2 text-white bg-linear-to-r from-blue-700 to-blue-600 "
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center">
                  <div className="h-6 w-6 animate-spin rounded-full border-4 border-gray-300 border-t-blue-600"></div>
                </div>
              ) : (
                "Continue"
              )}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default page;
