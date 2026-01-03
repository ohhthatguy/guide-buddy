"use client";
import { useState, ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import Button from "../../../component/Button/page";

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

  const [loginData, setLoginData] = useState(initloginData);

  const handleLogin = async () => {
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
          router.push(`/home?id=${data.id}`); //with the id
        }
      } else if (data.role == "guide") {
        if (data.isFirstTime) {
          router.push(`/first-time`); //for now
          // the extra thigns to choose on guide if first time
        } else {
          router.push(`/dashboard?id=${data.id}`); //with the id
        }
      }
    } catch (error) {
      console.log("Error in loggin at frontend: ", error);
    }
  };

  const handleInputDataChange = (e: ChangeEvent<HTMLInputElement>) => {
    setLoginData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <>
      <div className=" flex justify-center items-center p-8">
        <div className="comp-bg rounded-2xl max-w-xl p-8 ">
          <h3 className="text-center">Welcome back</h3>

          <div className="my-4">
            <label className="">Email</label>
            <input
              className="border rounded-xl w-full px-4 py-2  mt-2 mb-4"
              placeholder=" youremail@gmail.com"
              name="email"
              onChange={handleInputDataChange}
              value={loginData.email}
              type="email"
              required
            />

            <label className="">Password</label>
            <input
              className="border rounded-xl w-full px-4 py-2  mt-2 mb-8"
              placeholder="Enter Your Password"
              name="password"
              onChange={handleInputDataChange}
              value={loginData.password}
              type="password"
              required
            />

            <Button onClick={handleLogin} size="full">
              Log in
            </Button>

            <div className="mt-4">
              <Button onClick={() => router.push("/dashboard")} size="full">
                GUIDE DASHBOARD
              </Button>
            </div>
          </div>

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
    </>
  );
};

export default page;
