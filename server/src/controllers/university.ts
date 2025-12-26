import { Request, Response } from "express";
import  db  from "../config/db";

export const getUniversities = async (req: Request, res: Response) => {
  try {
    const {
      search,
      course,
      minFee,
      maxFee,
      page = "1",
    } = req.query;

    const limit = 7;
    const offset = (Number(page) - 1) * limit;

    let query = `
      SELECT DISTINCT u.*
      FROM universities u
      LEFT JOIN courses c ON u.id = c.university_id
      WHERE 1=1
    `;

    const params: any[] = [];

    if (search) {
      query += " AND u.name LIKE ?";
      params.push(`%${search}%`);
    }

    if (course) {
      query += " AND c.degree_level = ?";
      params.push(course);
    }

    if (minFee && maxFee) {
      query += " AND c.total_tuition BETWEEN ? AND ?";
      params.push(Number(minFee), Number(maxFee));
    }

    query += " LIMIT ? OFFSET ?";
    params.push(limit, offset);

    const [rows] = await db.query(query, params);
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

export const getUniversityDetails = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const [universities]: any = await db.query(
      "SELECT * FROM universities WHERE id = ?",
      [id]
    );

    if (!universities.length) {
      return res.status(404).json({ message: "University not found" });
    }

    const [courses]: any = await db.query(
      "SELECT * FROM courses WHERE university_id = ?",
      [id]
    );

    res.json({
      university: universities[0],
      courses,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};


export const getCompareCourses = async (req: Request, res: Response) => {
  try {
    const { courseIds } = req.body;

    if (!courseIds || courseIds.length < 2) {
      return res.status(400).json({ message: "Select at least 2 courses" });
    }

    const query = `
      SELECT 
        c.*,
        u.name AS university_name,
        u.address AS university_address
      FROM courses c
      JOIN universities u ON u.id = c.university_id
      WHERE c.id IN (?)
    `;

    const [rows] = await db.query(query, [courseIds]);

    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
