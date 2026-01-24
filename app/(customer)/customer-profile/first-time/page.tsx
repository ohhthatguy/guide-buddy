"use client";

import Select from "react-select";
import { useRouter } from "next/navigation";

import { zodResolver } from "@hookform/resolvers/zod";
import { firstTimeCustomerSchema } from "@/lib/zodSchema/firstTimeSchema";
import { useForm, Controller } from "react-hook-form";

const page = () => {
  const router = useRouter();

  // const handleInputDataChange = (
  //   e:
  //     | ChangeEvent<HTMLInputElement>
  //     | ChangeEvent<HTMLSelectElement>
  //     | ChangeEvent<HTMLTextAreaElement>
  // ) => {
  //   setClientRemainingData((prev) => ({
  //     ...prev,
  //     [e.target.name]: e.target.value,
  //   }));
  // };

  const {
    handleSubmit,
    control,
    register,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(firstTimeCustomerSchema),
  });

  // const initData = {
  //   phone: 0,
  //   profileURL: "",
  //   bio: "",
  //   languages: [] as string[],
  // };

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

  // const [clientRemainingData, setClientRemainingData] = useState(initData);

  const handleFirstLogin = async (clientRemainingData: any) => {
    try {
      console.log(clientRemainingData);

      const res = await fetch("/api/user/first_time_login", {
        method: "POST",
        body: JSON.stringify(clientRemainingData),
      });

      const data = await res.json();

      console.log(data);
      router.push(`/home?id=${data.data.AccountData.id}&view=map`);
    } catch (error) {
      console.log("Error at forntend in firstitme client login: ", error);
    }
  };

  return (
    <>
      <div className=" flex justify-center items-center p-8 w-full">
        <div className="comp-bg rounded-2xl min-w-2xl p-8 ">
          <h3 className="text-center">Tell us more!</h3>

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

            <button
              type="submit"
              className="rounded-xl w-full hover:cursor-pointer p-2 text-white bg-linear-to-r mt-4 from-blue-700 to-blue-600 "
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
