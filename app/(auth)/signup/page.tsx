"use client";

import { useState, ChangeEvent } from "react";
import { useRouter } from "next/navigation";
// import Button from "../../component/Button/page";
import type { AccountType } from "../type/type";
import Button from "../../../component/Button/page";

import { zodResolver } from "@hookform/resolvers/zod";
import { signUpZodSchema } from "@/lib/zodSchema/authSchema";
import { useForm, SubmitHandler } from "react-hook-form";

const page = () => {
  const router = useRouter();

  const initSignupData: AccountType = {
    email: "",
    password: "",
    name: "",
    confirmPassword: "",
    role: "",
    isFirstTime: true,
    isVerified: false,
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(signUpZodSchema),
    defaultValues: initSignupData,
  });

  const handleSignup: SubmitHandler<AccountType> = async (signupData) => {
    console.log(signupData);

    try {
      const res = await fetch("/api/user/signup", {
        method: "POST",
        body: JSON.stringify(signupData),
      });
      const data = await res.json();
      console.log(data);
    } catch (error) {
      console.log("error at signup: ", error);
    }
  };

  return (
    <>
      <div className=" flex justify-center items-center p-8">
        <div className="comp-bg rounded-2xl w-xl p-8 ">
          <h3 className="text-center">Create Account</h3>

          <form onSubmit={handleSubmit(handleSignup)} className="my-4">
            <div className="mb-4">
              <label className="">Full Name</label>
              <input
                className="border rounded-xl w-full px-4 py-2  mt-2 "
                placeholder=" John Doe"
                {...register("name")}
                type="text"
              />
              {errors.name?.message && (
                <p className="  text-xs w-full text-red-500 ">
                  {String(errors.name.message)}
                </p>
              )}
            </div>

            <fieldset className="flex gap-8 mb-4">
              <div>
                <label className="">Email</label>
                <input
                  className="border rounded-xl w-full px-4 py-2  mt-2 "
                  placeholder=" youremail@gmail.com"
                  {...register("email")}
                  type="email"
                />
                {errors.email?.message && (
                  <p className="  text-xs w-full text-red-500 ">
                    {String(errors.email.message)}
                  </p>
                )}
              </div>

              <div>
                <label className="">Password</label>
                <input
                  className="border rounded-xl w-full px-4 py-2  mt-2 "
                  placeholder="Enter Your Password"
                  {...register("password")}
                  type="password"
                />
                {errors.password?.message && (
                  <p className="  text-xs w-full text-red-500 ">
                    {String(errors.password.message)}
                  </p>
                )}
              </div>
            </fieldset>

            <div className="mb-8">
              <label className="">Confirm Password</label>
              <input
                className="border rounded-xl w-full px-4 py-2  mt-2 "
                placeholder="Confirm Your Password"
                type="confirmPassword"
                {...register("confirmPassword")}
              />
              {errors.confirmPassword?.message && (
                <p className="  text-xs w-full text-red-500 ">
                  {String(errors.confirmPassword.message)}
                </p>
              )}
            </div>

            <div className="mb-8">
              <label className="">I want to </label>
              <br />

              <select
                {...register("role")}
                className="border rounded-xl w-full p-4 mt-2 "
                defaultValue={""}
              >
                <option value="" disabled hidden>
                  What are you looking for ?
                </option>

                <option value="customer">Find a Guide</option>
                <option value="guide">Become a Guide</option>
              </select>
              {errors.role?.message && (
                <p className="  text-xs w-full text-red-500 ">
                  {String(errors.role.message)}
                </p>
              )}
            </div>

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
                "sign up"
              )}
            </button>
          </form>

          <p>
            Already have an account?{" "}
            <span
              className="text-blue-700 cursor-pointer "
              onClick={() => router.push("/login")}
            >
              Login
            </span>
          </p>
        </div>
      </div>
    </>
  );
};

export default page;
