"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { login } from "../../../../store/authSlice.js";
import { Bounce, ToastContainer, toast } from "react-toastify";
import { url } from "../../../constants.js";
import Spinner from "@/app/components/Spinner.jsx";

export default function SignupPage() {
    const router = useRouter();
    const dispatch = useDispatch();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [acceptedTerms, setAcceptedTerms] = useState(false);
    const [loading, setLoading] = useState(false);

    // Inside component
    const isFormValid =
        name &&
        isValidEmail(email) &&
        isStrongPassword(password) &&
        password === confirmPassword &&
        acceptedTerms;





    function isValidEmail(email) {
        const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return regex.test(email);
    }

    function isStrongPassword(password) {
        // Minimum 8 chars, 1 uppercase, 1 number, 1 special char
        const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        return regex.test(password);
    }

    const handleSignup = async () => {
        if (!name || !email || !password || !confirmPassword) {
            toast.error("All fields are required", { transition: Bounce });
            return;
        }

        if (!isValidEmail(email)) {
            toast.error("Invalid email address", { transition: Bounce });
            return;
        }

        if (!isStrongPassword(password)) {
            toast.error(
                "Password must be at least 8 chars long, include 1 uppercase, 1 number & 1 special character",
                { transition: Bounce }
            );
            return;
        }

        if (password !== confirmPassword) {
            toast.error("Passwords do not match", { transition: Bounce });
            return;
        }

        if (!acceptedTerms) {
            toast.error("You must accept the Terms & Privacy Policy", {
                transition: Bounce,
            });
            return;
        }

        try {
            setLoading(true);

            const res = await fetch(`${url}/signup`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, password }),
            });

            const data = await res.json();

            if (res.ok) {
                toast.success("We've sent an OTP to your email.", { transition: Bounce });
          
                router.push(`/verify-user?userId=${data.userId}`);
            } else {
                toast.error(data.message || "Registration failed", {
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
                {/* Brand */}
                <h1 className="text-center font-semibold text-2xl">Signup</h1>
                <p className="text-sm text-gray-700 text-center mb-6">
                    Welcome to niks family 🎉
                </p>

                {/* Signup Form */}
                <form className="space-y-4">
                    {/* Full Name */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Full Name
                        </label>
                        <input
                            type="text"
                            placeholder="John Doe"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="mt-1 w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-pink-600 focus:border-pink-600"
                        />
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Email Address
                        </label>
                        <input
                            type="email"
                            placeholder="you@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="mt-1 w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-pink-600 focus:border-pink-600"
                        />
                    </div>

                    {/* Password */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Password
                        </label>
                        <input
                            type="password"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="mt-1 w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-pink-600 focus:border-pink-600"
                        />
                        <p className="text-xs text-gray-500 mt-1">
                            Min 8 chars, 1 uppercase, 1 number, 1 special character
                        </p>
                    </div>

                    {/* Confirm Password */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Confirm Password
                        </label>
                        <input
                            type="password"
                            placeholder="••••••••"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className={`mt-1 w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 ${confirmPassword && password !== confirmPassword
                                ? "border-red-500 focus:ring-red-500"
                                : "focus:ring-pink-600 focus:border-pink-600"
                                }`}
                        />
                        {confirmPassword && password !== confirmPassword && (
                            <p className="text-xs text-red-500 mt-1">Passwords do not match</p>
                        )}
                    </div>

                    {/* Terms */}
                    <div className="flex items-center">
                        <input
                            type="checkbox"
                            checked={acceptedTerms}
                            onChange={(e) => setAcceptedTerms(e.target.checked)}
                            className="h-4 w-4 text-pink-600 border-gray-300 rounded"
                        />
                        <label className="ml-2 text-sm text-gray-600">
                            I agree to the{" "}
                            <a href="/terms" className="text-pink-600 hover:underline">
                                Terms of Service
                            </a>{" "}
                            &{" "}
                            <a href="/privacy" className="text-pink-600 hover:underline">
                                Privacy Policy
                            </a>
                        </label>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="button"
                        onClick={handleSignup}
                        disabled={!isFormValid || loading}
                        className={`w-full rounded-full text-white font-medium py-2 mt-2 shadow-sm transition flex justify-center items-center 
                        ${isFormValid && !loading ? "bg-pink-600 hover:bg-pink-700" : "bg-gray-400 cursor-not-allowed"}
                        `}
                    >
                        {loading ? <Spinner size="w-6 h-6" color="white" /> : "Sign Up"}
                    </button>

                </form>

                {/* Login Link */}
                <p className="text-center text-sm text-gray-500 mt-6">
                    Already have an account?{" "}
                    <a
                        onClick={() => {
                            router.back();
                        }}
                        className="text-blue-600 hover:underline cursor-pointer"
                    >
                        Log in
                    </a>
                </p>
            </div>
        </div>
    );
}
