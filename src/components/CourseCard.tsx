import { api } from "../api/api";
import toast, { Toaster } from "react-hot-toast";
import { motion } from "framer-motion";
import { Scale } from "lucide-react";
import { useCompare } from "../context/CompareContext";

export default function CourseCard({ course, universityId }: any) {
  const { addToCompare, compareCourses } = useCompare();

  const isAlreadyCompared = compareCourses.some(
    (c: any) => c.id === course.id
  );

  const isCompareLimitReached = compareCourses.length >= 3;

  const handleCompare = () => {
    if (isAlreadyCompared) {
      toast("Already added to comparison", { icon: "ℹ️" });
      return;
    }

    if (isCompareLimitReached) {
      toast.error("You can compare up to 3 courses only");
      return;
    }

    addToCompare({ ...course, universityId });
    toast.success("Added to comparison");
  };

  //  APPLY LOGIC 
  const applyNow = async () => {
    try {
      await api.post("/applications/apply", {
        universityId,
        courseId: course.id,
      });

      toast.success("Application submitted successfully 🎉");
    } catch (err: any) {
      if (err.response?.status === 401) {
        toast.error("Please login to apply for this course");
        return;
      }

      toast.error(err.response?.data?.message || "Application failed");
    }
  };

  return (
    <>
      <Toaster position="top-right" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        whileHover={{ scale: 1.01 }}
        className="
          w-full max-w-6xl mx-auto
          border rounded-2xl
          p-4 sm:p-5
          bg-white
          shadow-sm hover:shadow-md
          transition
        "
      >
        {/* HEADER */}
        <h3 className="font-semibold text-base sm:text-lg text-green-600">
          {course.subject} ({course.degree_level.toUpperCase()})
        </h3>

        {/* DETAILS */}
        <div className="mt-2 space-y-1 text-sm text-gray-600">
          <p>Duration: {course.duration_years} years</p>
          <p>Tuition: ${course.total_tuition}</p>
          <p>
            Min GPA: {course.min_gpa} | IELTS:{" "}
            {course.min_ielts || "N/A"}
          </p>
        </div>

        {/* ACTIONS */}
        <div className="mt-4 flex flex-col sm:flex-row gap-3">
          {/* COMPARE BUTTON */}
          <button
            onClick={handleCompare}
            disabled={isAlreadyCompared}
            className={`
              flex-1 flex items-center justify-center gap-2
              rounded-xl py-2.5 text-sm font-medium
              border transition
              ${
                isAlreadyCompared
                  ? "border-gray-300 text-gray-400 cursor-not-allowed"
                  : "border-green-600 text-green-600 hover:bg-green-50"
              }
            `}
          >
            <Scale size={16} />
            {isAlreadyCompared ? "Added to Compare" : "Add to Compare"}
          </button>

          {/* APPLY BUTTON */}
          <button
            type="button"
            onClick={applyNow}
            className="
              flex-1
              rounded-xl
              px-4 py-2.5
              text-sm font-medium
              bg-green-600 hover:bg-green-700
              active:scale-[0.98]
              text-white
              transition
            "
          >
            Apply Now
          </button>
        </div>
      </motion.div>
    </>
  );
}
