import { Request, Response } from "express";
import  db  from "../config/db";

export const applyForCourse = async (
  req: Request & { user?: { id: number } },
  res: Response
) => {
  try {
    const userId = req.user!.id; 
    const { universityId, courseId } = req.body;

    /* Fetch course */
    const [courseRows]: any = await db.query(
      "SELECT * FROM courses WHERE id = ?",
      [courseId]
    );

    if (!courseRows.length) {
      return res.status(404).json({ message: "Course not found" });
    }

    const course = courseRows[0];

    /* Fetch user academics */
    const [academics]: any = await db.query(
      "SELECT * FROM user_academics WHERE user_id = ?",
      [userId]
    );

    /* Academic eligibility */
    const education = academics.find(
      (a: any) =>
        a.record_type === "education" &&
        a.education_level === course.required_previous_level &&
        a.gpa >= course.min_gpa
    );

    if (!education) {
      return res.status(400).json({
        message: "You do not meet the academic requirements",
      });
    }

    /* IELTS check */
    if (course.min_ielts) {
      const ielts = academics.find(
        (a: any) =>
          a.record_type === "test" &&
          a.test_type === "IELTS" &&
          a.test_score >= course.min_ielts
      );

      if (!ielts) {
        return res.status(400).json({
          message: "IELTS score requirement not met",
        });
      }
    }

    /* Prevent duplicate application */
    const [existing]: any = await db.query(
      "SELECT id FROM applications WHERE user_id=? AND course_id=?",
      [userId, courseId]
    );

    if (existing.length) {
      return res.status(400).json({
        message: "You have already applied for this course",
      });
    }

    /* Insert application */
    await db.query(
      `INSERT INTO applications (user_id, university_id, course_id)
       VALUES (?, ?, ?)`,
      [userId, universityId, courseId]
    );

    res.json({ message: "Application submitted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};


export const getUserApplications = async (
  req: Request & { user?: { id: number } },
  res: Response
) => {
  try {
    const userId = req.user!.id;

    const [rows]: any = await db.query(
      `
      SELECT 
        a.id,
        a.applied_at,
        a.status,

        c.subject AS course_name,
        c.degree_level,
        c.duration_years,
        c.total_tuition,

        u.name AS university_name
      FROM applications a
      JOIN courses c ON a.course_id = c.id
      JOIN universities u ON a.university_id = u.id
      WHERE a.user_id = ?
      ORDER BY a.applied_at DESC
      `,
      [userId]
    );

    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch applications" });
  }
};
