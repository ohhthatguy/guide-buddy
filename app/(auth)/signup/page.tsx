"use client";

import { useState, ChangeEvent } from "react";
import { useRouter } from "next/navigation";
// import Button from "../../component/Button/page";
import type { AccountType } from "../type/type";
import Button from "../../../component/Button/page";
const page = () => {
  const router = useRouter();

  const initSignupData: AccountType = {
    email: "",
    password: "",
    name: "",
    confirmPassword: "",
    role: "customer",
    isFirstTime: true,
  };

  const handleSignup = async () => {
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

  const handleInputDataChange = (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>
  ) => {
    setSignUpData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const [signupData, setSignUpData] = useState(initSignupData);

  return (
    <>
      <div className=" flex justify-center items-center p-8">
        <div className="comp-bg rounded-2xl max-w-xl p-8 ">
          <h3 className="text-center">Create Account</h3>

          <div className="my-4">
            <label className="">Full Name</label>
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
        </div>
      </div>
    </>
  );
};

export default page;
