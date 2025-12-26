import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { api } from "../../api/api";

const PAGE_SIZE = 5;

export default function Applications() {
  const [apps, setApps] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const res = await api.get("/applications/my");
      setApps(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const totalPages = Math.ceil(apps.length / PAGE_SIZE);

  const currentData = apps.slice(
    (page - 1) * PAGE_SIZE,
    page * PAGE_SIZE
  );

  if (loading) {
    return (
      <div className="border rounded-xl p-6 text-sm text-gray-500">
        Loading applications...
      </div>
    );
  }

  return (
    <div className="border rounded-xl p-4 sm:p-6 bg-white shadow-sm">
      <h2 className="text-lg font-semibold mb-4 text-center">
        My Applications
      </h2>

      {apps.length === 0 ? (
        <p className="text-center text-sm text-gray-500">
          You haven’t applied to any courses yet.
        </p>
      ) : (
        <>
          <div className="space-y-4">
            {currentData.map((a) => (
              <div
                key={a.id}
                className="border rounded-lg p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-sm"
              >
                <Info label="Course">{a.course_name}</Info>
                <Info label="University">{a.university_name}</Info>
                <Info label="Degree">{a.degree_level.toUpperCase()}</Info>
                <Info label="Duration">{a.duration_years} years</Info>
                <Info label="Tuition">${a.total_tuition}</Info>
                <Info label="Applied On">
                  {new Date(a.applied_at).toLocaleDateString()}
                </Info>
              </div>
            ))}
          </div>

          {/* PAGINATION */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-4 mt-6">
              {page > 1 && (
                <button
                  onClick={() => setPage(page - 1)}
                  className="p-2 border rounded hover:bg-gray-100"
                >
                  <ChevronLeft size={18} />
                </button>
              )}

              <span className="text-sm text-gray-600">
                Page {page} of {totalPages}
              </span>

              {page < totalPages && (
                <button
                  onClick={() => setPage(page + 1)}
                  className="p-2 border rounded hover:bg-gray-100"
                >
                  <ChevronRight size={18} />
                </button>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
}

/* SMALL HELPER */
const Info = ({ label, children }: any) => (
  <div>
    <p className="text-xs text-gray-500">{label}</p>
    <p className="font-medium break-words">{children}</p>
  </div>
);
