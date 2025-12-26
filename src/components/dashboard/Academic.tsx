import { useState } from "react";
import { Pencil } from "lucide-react";
import toast from "react-hot-toast";
import { api } from "../../api/api";

export default function Academic({ academics, refresh }: any) {
  const [edit, setEdit] = useState<any>(null);

  const saveAcademic = async () => {
    try {
      await api.put(`/dashboard/academic/${edit.id}`, edit);
      toast.success("Academic record updated");
      setEdit(null);
      refresh();
    } catch {
      toast.error("Academic update failed");
    }
  };

  return (
    <div className="border rounded-lg p-6">
      <h2 className="text-lg font-semibold mb-4 text-center">
        Academic Records
      </h2>

      <div className="overflow-x-auto">
        <table className="w-full text-center text-sm border">
          <thead className="bg-green-600 text-white">
            <tr>
              <th className="p-2">Type</th>
              <th className="p-2">Institution</th>
              <th className="p-2">Course / Test</th>
              <th className="p-2">GPA / Score</th>
              <th className="p-2">Edit</th>
            </tr>
          </thead>
          <tbody>
            {academics.map((a: any) => (
              <tr key={a.id} className="border-t">
                <td className="p-2">{a.record_type}</td>
                <td className="p-2">{a.institution || "-"}</td>
                <td className="p-2">{a.course || a.test_type}</td>
                <td className="p-2">{a.gpa || a.test_score}</td>
                <td className="p-2">
                  <Pencil
                    className="mx-auto text-green-600 cursor-pointer hover:scale-105"
                    onClick={() => setEdit(a)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {edit && (
        <Modal
          title="Edit Academic Record"
          onCancel={() => setEdit(null)}
          onSave={saveAcademic}
        >
          {/* Institution */}
          <input
            className="input-green border-green-600"
            placeholder="Institution"
            value={edit.institution || ""}
            onChange={(e) =>
              setEdit({ ...edit, institution: e.target.value })
            }
          />

          {/* EDUCATION LEVEL DROPDOWN */}
          {edit.record_type === "education" && (
            <select
              className="input-green border-green-600"
              value={edit.education_level || ""}
              onChange={(e) =>
                setEdit({ ...edit, education_level: e.target.value })
              }
            >
              <option value="">Select education level</option>
              <option value="college">College</option>
              <option value="bsc">BSc</option>
              <option value="msc">MSc</option>
              <option value="phd">PhD</option>
            </select>
          )}

          {/* TEST TYPE DROPDOWN */}
          {edit.record_type === "test" && (
            <select
              className="input-green border-green-600"
              value={edit.test_type || ""}
              onChange={(e) =>
                setEdit({ ...edit, test_type: e.target.value })
              }
            >
              <option value="">Select test type</option>
              <option value="IELTS">IELTS</option>
              <option value="SAT">SAT</option>
              <option value="TOEFL">TOEFL</option>
              <option value="GRE">GRE</option>
            </select>
          )}

          {/* Course name (education only) */}
          {edit.record_type === "education" && (
            <input
              className="input-green border-green-600"
              placeholder="Course"
              value={edit.course || ""}
              onChange={(e) =>
                setEdit({ ...edit, course: e.target.value })
              }
            />
          )}

          {/* GPA / SCORE */}
          <input
            className="input-green border-green-600"
            placeholder={
              edit.record_type === "education" ? "GPA" : "Test Score"
            }
            value={edit.gpa || edit.test_score || ""}
            onChange={(e) =>
              edit.record_type === "education"
                ? setEdit({ ...edit, gpa: e.target.value })
                : setEdit({ ...edit, test_score: e.target.value })
            }
          />
        </Modal>
      )}
    </div>
  );
}

const Modal = ({ title, children, onCancel, onSave }: any) => (
  <div className="fixed inset-0 bg-black/40 flex items-center justify-center px-4 z-50">
    <div className="bg-white w-full max-w-md rounded-lg p-6 space-y-4">
      <h3 className="text-lg font-semibold text-center">{title}</h3>

      <div className="space-y-3">{children}</div>

      <div className="flex justify-end gap-3 pt-4">
        <button
          onClick={onCancel}
          className="px-4 py-2 border rounded hover:bg-gray-100"
        >
          Cancel
        </button>
        <button
          onClick={onSave}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Save
        </button>
      </div>
    </div>
  </div>
);
