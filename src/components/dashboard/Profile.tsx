import { useEffect, useState } from "react";
import { Pencil } from "lucide-react";
import toast from "react-hot-toast";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { api } from "../../api/api";

export default function Profile({ user, refresh }: any) {
  const [edit, setEdit] = useState(false);
  const [profile, setProfile] = useState<any>(null);

  /* 🚨 HARD GUARD — STOP RENDER */
  if (!user) {
    return (
      <div className="border rounded-xl p-6 text-sm text-gray-500">
        Loading profile...
      </div>
    );
  }

  useEffect(() => {
    const [house = "", street = "", city = "", country = ""] =
      user.address?.split(",").map((p: string) => p.trim()) || [];

    setProfile({
      ...user,
      house,
      street,
      city,
      country,
    });
  }, [user]);

  const saveProfile = async () => {
    try {
      const fullAddress = [
        profile.house,
        profile.street,
        profile.city,
        profile.country,
      ]
        .filter(Boolean)
        .join(", ");

      await api.put("/dashboard/profile", {
        ...profile,
        address: fullAddress,
      });

      toast.success("Profile updated");
      setEdit(false);
      refresh();
    } catch {
      toast.error("Profile update failed");
    }
  };

  return (
    <div className="border rounded-xl p-4 sm:p-6 bg-white shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Profile</h2>
        <Pencil
          className="text-green-600 cursor-pointer hover:scale-105 transition"
          onClick={() => setEdit(true)}
        />
      </div>

      {/* PROFILE INFO */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
        <Item label="Name" value={user.full_name} />
        <Item label="Email" value={user.email} />
        <Item label="Phone" value={user.phone} />
        <Item label="Address" value={user.address} />
      </div>

      {/* EDIT MODAL */}
      {edit && profile && (
        <Modal
          title="Edit Profile"
          onCancel={() => setEdit(false)}
          onSave={saveProfile}
        >
          <input
            className="input-green border-green-600"
            placeholder="Full Name"
            value={profile.full_name ?? ""}
            onChange={(e) =>
              setProfile({ ...profile, full_name: e.target.value })
            }
          />

          <input
            className="input-green border-green-600"
            placeholder="Email"
            value={profile.email ?? ""}
            onChange={(e) =>
              setProfile({ ...profile, email: e.target.value })
            }
          />

          <PhoneInput
            country="bd"
            value={profile.phone ?? ""}
            onChange={(phone) =>
              setProfile({ ...profile, phone })
            }
            inputStyle={{
              width: "100%",
              borderColor: "#16a34a",
            }}
            placeholder="Phone Number"
          />

          <input
            className="input-green border-green-600"
            placeholder="House"
            value={profile.house ?? ""}
            onChange={(e) =>
              setProfile({ ...profile, house: e.target.value })
            }
          />

          <input
            className="input-green border-green-600"
            placeholder="Street"
            value={profile.street ?? ""}
            onChange={(e) =>
              setProfile({ ...profile, street: e.target.value })
            }
          />

          <input
            className="input-green border-green-600"
            placeholder="City"
            value={profile.city ?? ""}
            onChange={(e) =>
              setProfile({ ...profile, city: e.target.value })
            }
          />

          <input
            className="input-green border-green-600"
            placeholder="Country"
            value={profile.country ?? ""}
            onChange={(e) =>
              setProfile({ ...profile, country: e.target.value })
            }
          />
        </Modal>
      )}
    </div>
  );
}

/* HELPERS */
const Item = ({ label, value }: any) => (
  <div>
    <p className="text-xs text-gray-500">{label}</p>
    <p className="font-medium break-words">{value || "-"}</p>
  </div>
);

const Modal = ({ title, children, onCancel, onSave }: any) => (
  <div className="fixed inset-0 bg-black/40 flex items-center justify-center px-4 z-50">
    <div className="bg-white w-full max-w-md rounded-xl p-5 space-y-4 max-h-[90vh] overflow-y-auto">
      <h3 className="text-lg font-semibold text-center">{title}</h3>

      <div className="space-y-3">{children}</div>

      <div className="flex flex-col sm:flex-row justify-end gap-3 pt-4">
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
