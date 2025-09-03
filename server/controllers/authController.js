
import bcrypt from "bcryptjs";
import db from "../db.js";
import jwt from 'jsonwebtoken'



export async function loginController(req, res) {
  try {
    const { email, password } = req.body;   


    console.log(email)

    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const [rows] = await db.query("SELECT * FROM users WHERE email = ?", [email]);

    
    if (rows.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    const user = rows[0];

    const isMatch = await bcrypt.compare(password, user.password);
 
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

  
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "30d" }
    );


  
    res.status(200).json({
      message: "Login successful",
      token,
      user: user.email,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
}




export async function signupController(req, res) {

  try {
    const { email, password } = req.body;



    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const [rows] = await db.query("SELECT * FROM users WHERE email = ?", [email]);
    if (rows.length > 0) {
      return res.status(409).json({ message: "User already exists" });
    }


    const hashedPassword = await bcrypt.hash(password, 10);


    const [result] = await db.query(
      "INSERT INTO users ( email, password) VALUES ( ?, ?)",
      [email, hashedPassword]
    );

    const token = jwt.sign({ id: result.insertId, email }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });

    res.status(201).json({ message: "User registered successfully", token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }



}