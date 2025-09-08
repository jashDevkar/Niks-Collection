"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Bounce, ToastContainer, toast } from "react-toastify";
import { url } from "../../../constants.js";
import Spinner from "@/app/components/Spinner.jsx";
import OtpInput from 'react-otp-input';

export default function OtpVerificationPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const userId = searchParams.get("userId");

    const [otp, setOtp] = useState("");
    const [loading, setLoading] = useState(false);

    const [resendCooldown, setResendCooldown] = useState(0);
    const [resendDelay, setResendDelay] = useState(60);


    useEffect(() => {
        let timer;
        if (resendCooldown > 0) {
            timer = setInterval(() => {
                setResendCooldown((prev) => prev - 1);
            }, 1000);
        }
        return () => clearInterval(timer);
    }, [resendCooldown]);

    const handleVerifyOtp = async () => {
        if (otp.length !== 6) {
            toast.error("Please enter a valid 6-digit OTP", { transition: Bounce });
            return;
        }

        try {
            setLoading(true);
            const res = await fetch(`${url}/verify-otp`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ otp,userId }),
            });

            const data = await res.json();

            if (res.ok) {
                toast.success("OTP Verified Successfully 🎉", { transition: Bounce });
                router.replace("/");
            } else {
                toast.error(data.message || "Invalid OTP", { transition: Bounce });
            }
        } catch (err) {
            console.error(err);
            toast.error("Something went wrong!", { transition: Bounce });
        } finally {
            setLoading(false);
        }
    };

    const handleResendOtp = async () => {
        try {
            setLoading(true);
            const res = await fetch(`${url}/resend-otp`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
            });

            const data = await res.json();

            if (res.ok) {
                toast.success("OTP resent successfully 📩", { transition: Bounce });

                // Start cooldown timer
                setResendCooldown(resendDelay);
                // Increase delay for next time
                setResendDelay((prev) => prev + 60);
            } else {
                toast.error(data.message || "Failed to resend OTP", {
                    transition: Bounce,
                });
            }
        } catch (err) {
            console.error(err);
            toast.error("Something went wrong!", { transition: Bounce });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
            <ToastContainer theme="light" transition={Bounce} />

            <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-8 mt-20">
                <h1 className="text-center font-semibold text-2xl">OTP Verification</h1>
                <p className="text-sm text-gray-700 text-center mb-6">
                    Enter the 6-digit OTP sent to your email
                </p>

                {/* OTP Input */}
                <div className="flex justify-center mb-4">  
                    <OtpInput
                        value={otp}
                        onChange={setOtp}
                        numInputs={6}
                        renderSeparator={<span className="w-3"></span>}
                        renderInput={(props) => (
                            <input
                                {...props}
                                className="!w-10 !h-12 md:!w-12 md:!h-14 text-center border-2 border-gray-300 focus:border-pink-600
                 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 
                 text-lg font-bold text-gray-800 shadow-sm"
                            />
                        )}
                    />
                </div>



                {/* Verify Button */}
                <button
                    onClick={handleVerifyOtp}
                    disabled={otp.length !== 6 || loading}
                    className={`w-full rounded-full text-white font-medium py-2 mt-2 shadow-sm transition flex justify-center items-center ${otp.length === 6 && !loading
                        ? "bg-pink-600 hover:bg-pink-700"
                        : "bg-gray-400 cursor-not-allowed"
                        }`}
                >
                    {loading ? <Spinner size="w-6 h-6" color="white" /> : "Verify OTP"}
                </button>

                {/* Resend OTP */}
                <p className="text-center text-sm text-gray-500 mt-6">
                    Didn’t receive the code?{" "}
                    {resendCooldown > 0 ? (
                        <span className="text-gray-400">
                            Resend in {resendCooldown}s
                        </span>
                    ) : (
                        <span
                            onClick={handleResendOtp}
                            className="text-blue-600 hover:underline cursor-pointer"
                        >
                            Resend OTP
                        </span>
                    )}
                </p>
            </div>
        </div>
    );
}
