import { useState, useMemo } from "react";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import UniversityList from "../components/home/UniversityList";

export default function University() {
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);

  const [course, setCourse] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [feeRange, setFeeRange] = useState<[number, number]>([0, 20000]);

  /* Build filters only when needed */
  const filters = useMemo(() => {
    const f: any = {};

    if (search.trim()) f.search = search.trim();
    if (course) f.course = course;
    if (country.trim()) f.country = country.trim();
    if (city.trim()) f.city = city.trim();
    if (feeRange[1] < 20000) f.maxFee = feeRange[1];

    return f;
  }, [search, course, country, city, feeRange]);

  const applyFilter = () => {
    setOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-gradient-to-br from-green-50 to-white overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="max-w-6xl mx-auto px-4 pt-10 pb-6 flex flex-col items-center"
        >
          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="text-3xl md:text-4xl font-bold text-green-600 text-center"
          >
            Explore Universities
          </motion.h1>

          {/* Search + Filter */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="mt-8 w-full max-w-3xl flex flex-col md:flex-row gap-3"
          >
            <div
              className="flex items-center bg-white rounded-full border-2
                         border-green-500 px-4 py-2 shadow-lg w-full"
            >
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
          </motion.div>
        </motion.div>
      </div>

      {/* University List */}
      <UniversityList filters={filters} />

      {/* Filter Modal */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 z-50
                       flex items-center justify-center px-4"
            onClick={() => setOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
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
