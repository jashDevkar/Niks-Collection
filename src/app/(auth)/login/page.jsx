"use client";

import { useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc";
import { url } from '../../../constants.js'
import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../../../../store/authSlice.js";
import { Bounce, toast, ToastContainer } from "react-toastify";
import { ScaleLoader } from "react-spinners";

export default function LoginPage() {
  const router = useRouter();


  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();



  function isValid(email) {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
  }




  const handleLogin = async () => {
    try {

      if (email && password && !loading) {


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

        setLoading(true);
        const response = await fetch(`${url}/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email
            , password
          })
        })



        const responseBody = await response.json();

        if (response.ok) {
          dispatch(login({ email, token: responseBody.token }));
          router.push("/");
        } else {
          toast.error(responseBody.message, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: "light",
            transition: Bounce,
          });
        }

        setLoading(false);


      }
      else {
        
      }


    } catch (err) {

    }
    finally{
      setLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    // Handle Google login logic here
    console.log("Google login clicked");
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
      <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-8">

        {/* Brand */}
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-2">
          Niks Collection
        </h1>
        <p className="text-sm text-gray-500 text-center mb-6">
          Welcome back! Please log in to continue.
        </p>


        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
              autoComplete="email"
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="you@example.com"
              className="mt-1 w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-pink-600 focus:border-pink-600"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="••••••••"
              className="mt-1 w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-pink-600 focus:border-pink-600"
            />
          </div>

          <button
            type="button"
            onClick={handleLogin}
            className="w-full bg-pink-600 hover:bg-pink-700 rounded-full text-white font-medium py-2 mt-2  shadow-sm transition"
          >
            {
              loading ?
              <div className="text-sm"> 
                <ScaleLoader size={5} color="#ffffff" />
              </div>:
                <p>Login</p> 
            }
          </button>
        </form>




        {/* Divider */}
        <div className="flex items-center my-6">
          <div className="flex-grow h-px bg-gray-200"></div>
          <span className="px-3 text-sm text-gray-500">or</span>
          <div className="flex-grow h-px bg-gray-200"></div>
        </div>

        {/* Google Sign-In */}
        <button
          onClick={handleGoogleLogin}
          className="w-full flex items-center justify-center border border-gray-300 rounded-lg py-2 hover:bg-gray-50 transition"
        >
          <FcGoogle className="text-xl mr-2" />
          <span className="text-gray-700 font-medium">Continue with Google</span>
        </button>

        {/* Signup Link */}
        <p className="text-center text-sm text-gray-500 mt-6">
          Don't have an account?{" "}
          <a onClick={() => {
            router.push('/signup')
          }} className="text-blue-600 hover:underline">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
}
