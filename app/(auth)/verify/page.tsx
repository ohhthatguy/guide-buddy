"use client";
import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";

export default function Verify() {
  type statusType =
    | "VERIFYING"
    | "VERIFIED"
    | "NOT_VERIFIED"
    | "INVALID_TOKEN"
    | "TOKEN_EXPIRED";

  const searchParams = useSearchParams();
  const token = searchParams.get("verifiyToken"); // This gets the ${code} part

  const [status, setStatus] = useState<statusType>("VERIFYING");

  useEffect(() => {
    if (!token) {
      setStatus("INVALID_TOKEN");
      return;
    }

    const verifyUser = async () => {
      const res = await fetch("/api/user/verify", {
        method: "POST",
        body: JSON.stringify({ token }),
      });

      const data = await res.json();

      if (res.ok) {
        setStatus(data.message);
      } else {
        setStatus(data.message || "NOT_VERIFIED");
      }

      console.log("From verify mail: ", data);
    };

    verifyUser();
  }, [token]);

  return (
    <div>
      <h1>Verify your account</h1>
      <p>Token received: {token}</p>

      <br />
      {status == "VERIFYING" ? (
        <div className=" w-8 h-8 border border-blue-600 border-t-comp-bg animate-spin "></div>
      ) : status == "INVALID_TOKEN" ? (
        <div className="text-red-700">
          Token Provided is invalid. PLease Try Again!
        </div>
      ) : status == "NOT_VERIFIED" ? (
        <div className="text-red-700">Not verified. PLease Try Again!</div>
      ) : status == "TOKEN_EXPIRED" ? (
        <div className="text-red-700">Token Expired. PLease Try Again!</div>
      ) : (
        <div className="text-green-700">
          Successfully Verfied. PLease procced to login page
        </div>
      )}
    </div>
  );
}
