import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../api/api";
import CourseCard from "../components/CourseCard";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin } from "lucide-react";

export default function UniversityDetails() {
  const { id } = useParams();
  const [university, setUniversity] = useState<any>(null);
  const [courses, setCourses] = useState<any[]>([]);

  useEffect(() => {
    api.get(`/universities/${id}`).then((res) => {
      setUniversity(res.data.university);
      setCourses(res.data.courses);
    });
  }, [id]);

  if (!university) return null;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
      {/* UNIVERSITY HEADER */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="bg-white rounded-2xl shadow-md p-6 sm:p-8"
      >
        <h1 className="text-2xl sm:text-3xl font-bold text-green-600">
          {university.name}
        </h1>

        <div className="mt-4 space-y-3 text-gray-700 text-sm sm:text-base">
          {university.address && (
            <div className="flex items-start gap-2">
              <MapPin className="w-5 h-5 text-green-600 mt-0.5" />
              <span>{university.address}</span>
            </div>
          )}

          {university.email && (
            <div className="flex items-center gap-2">
              <Mail className="w-5 h-5 text-green-600" />
              <span>{university.email}</span>
            </div>
          )}

          {university.phone && (
            <div className="flex items-center gap-2">
              <Phone className="w-5 h-5 text-green-600" />
              <span>{university.phone}</span>
            </div>
          )}
        </div>
      </motion.div>

      {/* COURSES SECTION */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="mt-10"
      >
        <h2 className="text-xl sm:text-2xl font-semibold mb-4 text-green-600">
          Available Courses
        </h2>

        {courses.length === 0 ? (
          <p className="text-gray-500 text-sm">
            No courses available at the moment.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {courses.map((course) => (
              <CourseCard
                key={course.id}
                course={course}
                universityId={university.id}
              />
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
}
