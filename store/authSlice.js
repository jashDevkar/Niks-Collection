import { createSlice } from "@reduxjs/toolkit";



const initialState = {
  isAuthenticated: false,
  user: null,
  token: null,
  loading:true,

}



const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {

    login: (state, action) => {
      state.isAuthenticated = true;
      state.token = action.payload.token;
      state.user = action.payload.email;
      state.loading = false;



      localStorage.setItem("auth", JSON.stringify(action.payload));
    },



    logout: (state) => {

      state.isAuthenticated = false;
      state.user = null;
      state.token = null;
      state.loading = false;


      localStorage.clear();

    },



    loadFromStorage: (state) => {

      const userData = JSON.parse(localStorage.getItem("auth"));

      if (userData) {
        state.isAuthenticated = true;
        state.user = userData.email;
        state.token = userData.token;
      }
      
      state.loading = false;









    }




  }


})





export const { login, logout, loadFromStorage } = authSlice.actions;


export default authSlice.reducer;