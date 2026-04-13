"use client";

import { useRouter } from "next/navigation";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { loginZodSchema } from "@/lib/zodSchema/authSchema";
import { useRef } from "react";

const page = () => {
  const router = useRouter();

  type loginType = {
    email: string;
    password: string;
  };

  const initloginData: loginType = {
    email: "",
    password: "",
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(loginZodSchema),
    defaultValues: initloginData,
  });
  const modalBtn = useRef<HTMLDialogElement | null>(null);

  const handleLogin: SubmitHandler<loginType> = async (loginData) => {
    console.log(loginData);

    try {
      const res = await fetch("/api/user/login", {
        method: "POST",
        body: JSON.stringify(loginData),
      });

      console.log(res);

      const data = await res.json();

      console.log("data at login frontend: ", data);

      if (data.role == "customer") {
        if (data.isFirstTime) {
          router.push(`/customer-profile/first-time`);
        } else {
          router.push(`/home?id=${data.id}&view=map`); //with the id
        }
      } else if (data.role == "guide") {
        if (data.isFirstTime) {
          router.push(`/first-time`); //for now
          // the extra thigns to choose on guide if first time
        } else {
          router.push(`/dashboard?id=${data.id}&page=1`); //with the id
        }
      }
    } catch (error) {
      console.log("Error in loggin at frontend: ", error);
    }
  };

  return (
    <>
      <div className=" flex justify-center items-center p-8">
        <div className="comp-bg rounded-2xl w-xl p-8 ">
          <div>
            <h3 className="text-center">Welcome back</h3>
            <div className="text-right">
              <button
                onClick={() => modalBtn.current?.showModal()}
                className="p-2 bg-blue-700 rounded-md text-white hover:cursor-pointer hover:scale-105 scale-100 duration-300 transition-all"
              >
                Guest Mode
              </button>
            </div>
          </div>

          {/* 1. Use a proper form tag */}
          <form onSubmit={handleSubmit(handleLogin)} className="my-4">
            <div className=" mb-4">
              <label>Email</label>
              <input
                className="border rounded-xl w-full px-4 py-2  mt-2 "
                placeholder="youremail@gmail.com"
                {...register("email")}
                // type="email"
              />
              {errors.email?.message && (
                <p className="  text-xs w-full text-red-500 ">
                  {String(errors.email.message)}
                </p>
              )}
            </div>

            <div className=" mb-4">
              <label>Password</label>
              <input
                className="border rounded-xl w-full px-4 py-2  mt-2 "
                placeholder="Enter Your Password"
                {...register("password")}
                type="password"
              />
              {errors.password?.message && (
                <p className="text-xs w-full text-red-500">
                  {String(errors.password.message)}
                </p>
              )}
            </div>

            {/* 2. Button must be type submit. DO NOT use onClick={handleSubmit} */}
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
                "Log in"
              )}
            </button>
          </form>

          <p>
            Don't have an account?{" "}
            <span
              className="text-blue-700 cursor-pointer "
              onClick={() => router.push("/signup")}
            >
              Sign up
            </span>
          </p>
        </div>
      </div>

      <dialog
        ref={modalBtn}
        className="m-auto w-8/12 relative comp-bg rounded-lg p-4"
      >
        <button
          onClick={() => modalBtn.current?.close()}
          className="absolute right-1 w-12 top-1 p-2 bg-blue-700 rounded-md text-white hover:cursor-pointer hover:scale-105 scale-100 duration-300 transition-all"
        >
          X
        </button>
        <div className="grid gap-4  bg-comp-bg p-4 ele-bg">
          <div>
            <div className="text-3xl  font-bold">GUIDE</div>

            <div className="text-2xl">email: guidedai@gmail.com</div>
            <div className="text-2xl">password: guide</div>
          </div>

          <div>
            <div className="text-3xl  font-bold">TOURIST</div>

            <div className="text-2xl">email: customer@.com</div>
            <div className="text-2xl">password: customer</div>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default page;
