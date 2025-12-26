import { motion } from "framer-motion";

export default function About() {
  return (
    <div className="min-h-screen bg-white">
      {/* Banner Section */}
      <div className="relative w-full h-[60vh] md:h-[70vh] overflow-hidden">
        {/* Background Image */}
        <img
          src="/hero.jpeg"
          alt="About Admission Bridge"
          className="w-full h-full object-cover"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/50" />

        {/* Text Content */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="absolute inset-0 flex flex-col items-center justify-center
                     text-center px-4"
        >
          <h1 className="text-3xl md:text-5xl font-bold text-green-400 mb-4">
            About Admission Bridge
          </h1>

          <p className="text-white text-base md:text-lg max-w-2xl">
            Connecting students to the right universities, courses, and
            opportunities worldwide.
          </p>
        </motion.div>
      </div>

      {/* Content Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto px-4 py-16 text-center"
      >
        <h2 className="text-2xl md:text-3xl font-semibold text-green-600 mb-6">
          Who We Are
        </h2>

        <p className="text-gray-600 text-base md:text-lg leading-relaxed">
          Admission Bridge is built to simplify the university discovery and
          admission process for students around the world. We help you compare
          universities, explore courses, and make informed decisions based on
          your goals, budget, and preferences.
        </p>

        <p className="text-gray-600 text-base md:text-lg leading-relaxed mt-4">
          Our mission is to bridge the gap between students and global education
          opportunities through transparency, technology, and guidance.
        </p>
      </motion.div>
    </div>
  );
}
