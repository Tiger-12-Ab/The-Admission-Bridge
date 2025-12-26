import { motion, AnimatePresence } from "framer-motion";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { useEffect, useState } from "react";

export default function Hero({ onFilter }: any) {
  const [search, setSearch] = useState("");
  const [course, setCourse] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [feeRange, setFeeRange] = useState<[number, number]>([0, 10000]);
  const [open, setOpen] = useState(false);

  /* 🔍 Debounced search — ALWAYS fires */
  useEffect(() => {
    const timer = setTimeout(() => {
      onFilter({
        search: search.trim(),
        course,
        country,
        city,
        minFee: feeRange[0],
        maxFee: feeRange[1],
      });
    }, 400);

    return () => clearTimeout(timer);
  }, [search]);

  const applyFilter = () => {
    onFilter({
      search: search.trim(),
      course,
      country,
      city,
      minFee: feeRange[0],
      maxFee: feeRange[1],
    });
    setOpen(false);
  };

  return (
    <div className="relative h-[70vh] flex items-center justify-center">
      <img
        src="/hero.jpeg"
        className="absolute w-full h-full object-cover opacity-60"
      />
      <div className="absolute inset-0 bg-black/50" />

      <div className="relative z-10 w-full px-4 flex flex-col items-center">
        <motion.h1
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-6xl font-bold text-green-400 text-center"
        >
          The Admission Bridge
        </motion.h1>

        <p className="text-gray-200 mt-4 text-center">
          Search by university, city, country, subject or course
        </p>

        {/* Search + Filter */}
        <div className="mt-8 w-full max-w-3xl flex flex-col md:flex-row gap-3">
          <div className="flex items-center bg-white rounded-full border-2 border-green-500 px-4 py-2 shadow-lg w-full">
            <Search className="text-green-600 shrink-0" />
            <input
              className="flex-1 px-3 py-2 outline-none min-w-0"
              placeholder="Search university, city, country, subject, course..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <button
            onClick={() => setOpen(true)}
            className="w-full md:w-auto bg-green-600 hover:bg-green-700 transition
                       text-white px-6 py-3 rounded-full flex items-center
                       justify-center gap-2"
          >
            <SlidersHorizontal size={18} />
            Filter
          </button>
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center px-4"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-white rounded-2xl w-full max-w-md p-6 relative"
            >
              <button
                onClick={() => setOpen(false)}
                className="absolute top-4 right-4 text-gray-500 hover:text-black"
              >
                <X />
              </button>

              <h2 className="text-xl font-semibold text-green-600 mb-4">
                Filter Universities
              </h2>

              <select
                value={course}
                onChange={(e) => setCourse(e.target.value)}
                className="w-full border p-2 rounded mb-3"
              >
                <option value="">Select Course</option>
                <option value="bsc">BSc</option>
                <option value="msc">MSc</option>
                <option value="phd">PhD</option>
              </select>

              <input
                placeholder="Country"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                className="w-full border p-2 rounded mb-3"
              />

              <input
                placeholder="City"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full border p-2 rounded mb-3"
              />

              <div className="mb-4">
                <label className="text-sm text-gray-600">
                  Tuition Fee (${feeRange[0]} – ${feeRange[1]})
                </label>
                <input
                  type="range"
                  min={0}
                  max={20000}
                  step={500}
                  value={feeRange[1]}
                  onChange={(e) =>
                    setFeeRange([0, Number(e.target.value)])
                  }
                  className="w-full accent-green-600"
                />
              </div>

              <button
                onClick={applyFilter}
                className="w-full bg-green-600 hover:bg-green-700 transition
                           text-white py-2 rounded-lg"
              >
                Apply Filters
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
