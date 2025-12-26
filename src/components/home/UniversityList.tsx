import { useEffect, useState } from "react";
import { api } from "../../api/api";
import {
  ChevronLeft,
  ChevronRight,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function UniversityList({ filters = {} }: any) {
  const [data, setData] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const navigate = useNavigate();

  /* Reset page when filters change */
  useEffect(() => {
    setPage(1);
  }, [filters]);

  useEffect(() => {
    api
      .get("/universities", {
        params: { ...filters, page },
      })
      .then((res) => setData(res.data))
      .catch(console.error);
  }, [filters, page]);

  const pages = [page - 1, page, page + 1].filter((p) => p > 0);
  const isLastPage = data.length === 0;

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="flex flex-col gap-4 min-h-[220px]">
        {data.length === 0 ? (
          <p className="text-center text-gray-500 py-10">
            No universities found
          </p>
        ) : (
          data.map((u) => (
            <div
              key={u.id}
              onClick={() => navigate(`/universities/${u.id}`)}
              className="border rounded-2xl p-5 bg-white cursor-pointer
                         hover:shadow-lg hover:border-green-500 transition"
            >
              <h3 className="text-xl font-semibold text-green-600 mb-2">
                {u.name}
              </h3>

              <div className="flex flex-col gap-1 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <Mail size={16} /> {u.email || "N/A"}
                </div>
                <div className="flex items-center gap-2">
                  <Phone size={16} /> {u.phone || "N/A"}
                </div>
                <div className="flex items-center gap-2">
                  <MapPin size={16} /> {u.address || "N/A"}
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center gap-3 mt-10">
        <button
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          disabled={page === 1}
          className="p-2 rounded-full border hover:bg-gray-100
                     disabled:opacity-40"
        >
          <ChevronLeft />
        </button>

        {pages.map((p) => (
          <button
            key={p}
            onClick={() => setPage(p)}
            className={`w-10 h-10 rounded-full text-sm font-medium
              ${
                p === page
                  ? "bg-green-600 text-white"
                  : "border hover:bg-gray-100"
              }`}
          >
            {p}
          </button>
        ))}

        <button
          onClick={() => setPage((p) => p + 1)}
          disabled={isLastPage}
          className="p-2 rounded-full border hover:bg-gray-100
                     disabled:opacity-40"
        >
          <ChevronRight />
        </button>
      </div>
    </div>
  );
}
