import express from 'express';
import { loginController, signupController } from '../controllers/authController.js';



const authRoute = express.Router();


authRoute.post("/login",loginController)
authRoute.post("/signup",signupController)





export default authRoute;