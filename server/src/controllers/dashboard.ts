import { Request, Response } from "express";
import  db  from "../config/db";

/* =========================
   GET DASHBOARD DATA
========================= */
export const getDashboard = async (req: any, res: Response) => {
  try {
    const userId = req.user.id;

    const [userRows]: any = await db.query(
      "SELECT id, full_name, email, phone, address FROM users WHERE id = ?",
      [userId]
    );

    const [academicRows]: any = await db.query(
      "SELECT * FROM user_academics WHERE user_id = ? ORDER BY id DESC",
      [userId]
    );

    res.json({
      user: userRows[0],
      academics: academicRows,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to load dashboard" });
  }
};

/* =========================
   UPDATE PROFILE
========================= */
export const updateProfile = async (req: any, res: Response) => {
  try {
    const userId = req.user.id;
    const { full_name, email, phone, address } = req.body;

    await db.query(
      `UPDATE users 
       SET full_name = ?, email = ?, phone = ?, address = ?
       WHERE id = ?`,
      [full_name, email, phone, address, userId]
    );

    res.json({ message: "Profile updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Profile update failed" });
  }
};

/* =========================
   UPDATE ACADEMIC RECORD
========================= */
export const updateAcademic = async (req: any, res: Response) => {
  try {
    const userId = req.user.id;
    const academicId = req.params.id;

    await db.query(
      `UPDATE user_academics 
       SET institution = ?, 
           course = ?, 
           subject = ?, 
           gpa = ?, 
           test_score = ?, 
           test_type = ?
       WHERE id = ? AND user_id = ?`,
      [
        req.body.institution,
        req.body.course,
        req.body.subject,
        req.body.gpa,
        req.body.test_score,
        req.body.test_type,   
        academicId,
        userId,
      ]
    );

    res.json({ message: "Academic record updated" });
  } catch {
    res.status(500).json({ message: "Academic update failed" });
  }
};
