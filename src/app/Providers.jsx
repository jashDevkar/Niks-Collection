"use client";

import { Provider, useDispatch } from "react-redux";
import { store } from "../../store/store.js";
import { useEffect } from "react";
import { clearLocalStorage, loadFromStorage, logout } from "../../store/authSlice.js";
import { url } from "@/constants.js";

function LoadUser() {
  const dispatch = useDispatch();

  useEffect(() => {
    const checkUser = async () => {
      try {
        const jsonData = localStorage.getItem("auth");
        if (!jsonData) {
            dispatch(logout());
            return;
        }

        const parsed = await JSON.parse(jsonData);


        const user = parsed.user;

       

        const response = await fetch(`${url}/verify-user`, {
          headers: {
            "Content-Type": "application/json",
            "token": parsed.token,
          },
        });

        

        if (response.ok) {
          dispatch(loadFromStorage());
        } else {
          dispatch(logout());
        }
      } catch (err) {
        console.error("Error verifying user:", err);
      }
    };

    checkUser();
  }, [dispatch]);

  return null;
}


export default function Providers({ children }) {
    return (
        <Provider store={store}>
            <LoadUser />
            {children}
        </Provider>
    );
}
