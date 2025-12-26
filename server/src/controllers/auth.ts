import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import db from "../config/db";

// =====================
// REGISTER
// =====================
export const register = async (req: Request, res: Response) => {
  try {
    const {
      full_name,
      email,
      phone,
      password,
      address,
      education,
      test,
    } = req.body;

    if (!full_name || !email || !phone || !password) {
      return res.status(400).json({ message: "Required fields missing" });
    }

    const hashed = await bcrypt.hash(password, 10);

    const [userResult]: any = await db.query(
      `INSERT INTO users (full_name, email, phone, password_hash, address)
       VALUES (?, ?, ?, ?, ?)`,
      [full_name, email, phone, hashed, address]
    );

    const userId = userResult.insertId;

    // EDUCATION
    if (education?.education_level) {
      await db.query(
        `INSERT INTO user_academics
         (user_id, record_type, education_level, institution, course, subject, graduation_date, gpa)
         VALUES (?, 'education', ?, ?, ?, ?, ?, ?)`,
        [
          userId,
          education.education_level,
          education.institution,
          education.course,
          education.subject,
          education.graduation_date,
          education.gpa,
        ]
      );
    }

    // TEST
    if (test?.test_type) {
      await db.query(
        `INSERT INTO user_academics
         (user_id, record_type, test_type, test_score)
         VALUES (?, 'test', ?, ?)`,
        [userId, test.test_type, test.test_score]
      );
    }

    return res.status(201).json({ message: "Registration successful" });
  } catch (error) {
    console.error("Register error:", error);
    return res.status(500).json({ message: "Registration failed" });
  }
};

// =====================
// LOGIN
// =====================
export const login = async (req: Request, res: Response) => {
  try {
    const { identifier, password } = req.body;

    if (!identifier || !password) {
      return res.status(400).json({ message: "Missing credentials" });
    }

    const [rows]: any = await db.query(
      `SELECT * FROM users WHERE email = ? OR phone = ?`,
      [identifier, identifier]
    );

    if (!rows.length) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const user = rows[0];
    const isMatch = await bcrypt.compare(password, user.password_hash);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // ---- ENV SAFE JWT SETUP ----
    const JWT_SECRET = process.env.JWT_SECRET as string;
    const JWT_EXPIRES_IN: string = process.env.JWT_EXPIRES_IN ?? "7d";

    if (!JWT_SECRET) {
      throw new Error("JWT_SECRET is not defined");
    }

    const token = jwt.sign(
      { id: user.id },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
    );

    return res.json({
      token,
      user: {
        id: user.id,
        name: user.full_name,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ message: "Login failed" });
  }
};
