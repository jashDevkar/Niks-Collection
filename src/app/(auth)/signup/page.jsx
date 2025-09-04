"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc";
import { useDispatch } from "react-redux";
import { login, setToken } from "../../../../store/authSlice.js"
import { Bounce, ToastContainer,toast } from "react-toastify";

export default function SignupPage() {
    const router = useRouter();
    const dispatch = useDispatch();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);




    function isValid(email) {
        const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return regex.test(email);
    }


    const handleSignup = async () => {


        if (!email || !password || password !== confirmPassword) {
            toast.error('All fields are required', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: "light",
                transition: Bounce,
            });
            return;
        }

        try {


            setLoading(true);

            if (!isValid(email)) {
                toast.error('In valid email', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    theme: "light",
                    transition: Bounce,
                });

                return;
            }


            const res = await fetch("http://localhost:8000/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password })
            })

            const data = await res.json();

            if (res.ok) {

                dispatch(login({ email, token: data.token }));

                router.replace("/");





            } else {
                alert(data.message || "Registration failed");


            }
        } catch (err) {
            console.error(err);
            alert("Something went wrong!");
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleSignup = () => {
        console.log("Google signup clicked");
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">

            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                transition={Bounce}
            />
            <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-8 mt-20">
                {/* Brand */}
                <h1 className="text-center font-semibold text-2xl">Signup</h1>
                <p className="text-sm text-gray-700 text-center mb-6">
                    Welcome to niks family 🎉
                </p>

                {/* Signup Form */}
                <form className="space-y-4">
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
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Confirm Password
                        </label>
                        <input
                            type="password"
                            placeholder="••••••••"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="mt-1 w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-pink-600 focus:border-pink-600"
                        />
                    </div>

                    <button
                        type="button"
                        onClick={() => handleSignup()}
                        disabled={loading}
                        className="w-full bg-pink-600 hover:bg-pink-700 rounded-full text-white font-medium py-2 mt-2 shadow-sm transition"
                    >
                        {loading ? "Signing up..." : "Sign Up"}
                    </button>
                </form>

                {/* Divider */}
                <div className="flex items-center my-3">
                    <div className="flex-grow h-px bg-gray-200"></div>
                    <span className="px-3 text-sm text-gray-500">or</span>
                    <div className="flex-grow h-px bg-gray-200"></div>
                </div>

                {/* Google Signup */}
                <button
                    onClick={handleGoogleSignup}
                    className="w-full flex items-center justify-center border border-gray-300 rounded-lg py-2 hover:bg-gray-50 transition"
                >
                    <FcGoogle className="text-xl mr-2" />
                    <span className="text-gray-700 font-medium">Sign up with Google</span>
                </button>

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
