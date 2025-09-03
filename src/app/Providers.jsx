"use client";

import { Provider, useDispatch } from "react-redux";
import { store } from "../../store/store.js";
import { useEffect } from "react";
import { loadFromStorage } from "../../store/authSlice.js";

function LoadUser() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(loadFromStorage());
        
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
