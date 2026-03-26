"use client";
import z from "zod";
import Select from "react-select";
import { ImageUp } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { firstTimeCustomerSchema } from "@/lib/zodSchema/firstTimeSchema";
import { useForm, Controller } from "react-hook-form";
import { useEffect, useState } from "react";
import { uploadToCloudinary } from "@/lib/helper/uploadToCloudinary";
import toast from "react-hot-toast";
type CustomerSchemaType = z.infer<typeof firstTimeCustomerSchema>;

const CustomerEditForm = ({
  name,
  contact,
  bio,
  languages,
  _id,
  profileURL,
  setIsCustomerDataUpdated,
  modalBtn,
}: {
  name: string;
  contact: string;
  bio: string;
  languages: CustomerSchemaType["languages"];
  _id: string;
  profileURL: string;
  setIsCustomerDataUpdated: any;
  modalBtn: React.RefObject<HTMLDialogElement | null>;
}) => {
  const {
    handleSubmit,
    control,
    register,
    reset,
    setValue,
    getValues,
    formState: { isDirty, errors, isSubmitting, dirtyFields },
  } = useForm({
    resolver: zodResolver(firstTimeCustomerSchema),
  });
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
  const [isProfileUploadLoading, setIsProfileUploadLoading] =
    useState<boolean>(false);
  useEffect(() => {
    if (bio) {
      reset({
        profileURL: profileURL,
        phone: contact,
        bio: bio,
        languages: languages,
      });
    }
  }, [bio]);

  console.log("dirtyFields: ", dirtyFields);

  const handleCustomerProfileEdit = async (customerEditedData: any) => {
    try {
      console.log(customerEditedData);
      const finalCustomerEditedData = { ...customerEditedData, _id };

      const res = await fetch("/api/user/activity/updateProfile", {
        method: "PUT",
        body: JSON.stringify(finalCustomerEditedData),
      });

      const data = await res.json();

      console.log(data);
      setIsCustomerDataUpdated(true);
      modalBtn.current?.close();

      //   router.push(`/home?id=${data.data.AccountData.id}&view=map`);
    } catch (error) {
      console.log("Error at forntend in firstitme client login: ", error);
    }
  };

  const handleProfileURL = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (errors.profileURL?.message) {
      toast.error(String(errors.profileURL.message));
      return;
    }
    const file = e.target.files?.[0];
    if (!file) {
      toast.error("Photo is not found!");
      return;
    }
    setIsProfileUploadLoading(true);

    try {
      const cloudinaryUrl = await uploadToCloudinary(file);

      if (cloudinaryUrl) {
        setValue("profileURL", cloudinaryUrl);
        toast.success("photo send and url get success");
        console.log("PRofile url: ", cloudinaryUrl);
      }
    } catch (error) {
      toast.error("Error in getting the url");
    }
    setIsProfileUploadLoading(false);
  };

  console.log(errors);

  return (
    <div className=" flex justify-center items-center  mt-2  ">
      <div className="comp-bg rounded-2xl p-4">
        <form onSubmit={handleSubmit(handleCustomerProfileEdit)} className="">
          {/* //profile  */}
          <div className="mb-4 ">
            <label className="">Profile upload</label>

            <div className=" flex justify-center items-center   ">
              <div className=" relative ">
                <img
                  src={
                    getValues("profileURL")
                      ? getValues("profileURL")
                      : profileURL
                  }
                  className={`object-cover object-top rounded-full h-24 w-24 relative ${isProfileUploadLoading && "opacity-50 "}`}
                  alt="Profile"
                />

                <div
                  className={`${isProfileUploadLoading && "block"} hidden h-8 w-8 absolute top-8 left-8 animate-spin rounded-full border-4 border-blue-500 border-t-transparent`}
                ></div>

                <div className=" absolute bottom-0 right-0">
                  <label className="cursor-pointer">
                    <ImageUp className="border w-8 z-10 h-8 rounded-full p-1 fill-white bg-black border-white hover:scale-110 scale-100 duration-200 transition-all " />

                    <input
                      type="file"
                      className="hidden"
                      onChange={handleProfileURL}
                    />
                  </label>
                  {/* {errors.profileURL?.message && (
                    <p className="  text-xs w-full text-red-500 ">
                      {String(errors.profileURL.message)}
                    </p>
                  )} */}
                </div>
              </div>
            </div>
          </div>

          {/* //phone number  */}
          <div className="mb-4">
            <label className="">Contact </label>
            <input
              className="border rounded-xl w-full px-4 py-2  mt-2"
              // placeholder=""

              type="text"
              inputMode="numeric"
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
                    (value as string[])?.includes(opt.value),
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
            disabled={!isDirty || isSubmitting}
          >
            {isSubmitting ? (
              <div className="flex items-center justify-center">
                <div className="h-6 w-6 animate-spin rounded-full border-4 border-gray-300 border-t-blue-600"></div>
              </div>
            ) : (
              "Edit profile"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CustomerEditForm;
