import { useEffect, useState } from "react";
import { useCompare } from "../context/CompareContext";
import { api } from "../api/api";
import { Trash2 } from "lucide-react";

/* ---------------- TYPES ---------------- */

interface CompareCourse {
  id: number;
}

interface ComparedCourseData {
  id: number;
  university_name: string;
  university_address?: string;
  subject?: string;
  degree_level?: string;
  duration_years?: number;
  total_tuition?: number;
  min_gpa?: number;
  min_ielts?: number;
  student_type?: string;
}

/* ---------------- COMPONENT ---------------- */

export default function Compare() {
  const { compareCourses, clearCompare } = useCompare() as {
    compareCourses: CompareCourse[];
    clearCompare: () => void;
  };

  const [data, setData] = useState<ComparedCourseData[]>([]);

  useEffect(() => {
    const fetchCompare = async () => {
      const res = await api.post<ComparedCourseData[]>("/compare", {
        courseIds: compareCourses.map((c: CompareCourse) => c.id),
      });
      setData(res.data);
    };

    if (compareCourses.length >= 2) {
      fetchCompare();
    }
  }, [compareCourses]);

  if (compareCourses.length < 2) {
    return (
      <p className="text-center mt-10 min-h-screen">
        Select at least 2 courses
      </p>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold text-center text-green-600 mb-8">
        Course Comparison
      </h1>

      <div className="overflow-x-auto">
        <table className="w-full border text-sm">
          <thead className="bg-green-50">
            <tr>
              <th className="p-3 border">Feature</th>
              {data.map((c) => (
                <th key={c.id} className="p-3 border">
                  {c.university_name}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {[
              ["Address", "university_address"],
              ["Course", "subject"],
              ["Degree", "degree_level"],
              ["Duration (Years)", "duration_years"],
              ["Total Tuition", "total_tuition"],
              ["Min GPA", "min_gpa"],
              ["IELTS", "min_ielts"],
              ["Student Type", "student_type"],
            ].map(([label, key]) => (
              <tr key={label}>
                <td className="p-3 border font-medium">{label}</td>
                {data.map((c) => (
                  <td key={c.id} className="p-3 border text-center">
                    {(c as any)[key] ?? "N/A"}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* CLEAR COMPARISON BUTTON */}
      <div className="flex justify-center mt-6">
        <button
          onClick={clearCompare}
          className="
            flex items-center gap-2
            px-4 py-2
            rounded-xl
            border border-red-500
            text-red-500
            hover:bg-red-50
            transition
            text-sm cursor-pointer
          "
        >
          <Trash2 size={16} />
          Clear Comparison
        </button>
      </div>
    </div>
  );
}
