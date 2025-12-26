import { useState } from "react";
import { User, Eye, EyeOff, ArrowLeft } from "lucide-react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { api } from "../api/api";
import { motion } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";

export default function Register() {
  const [step, setStep] = useState(1);
  const [showPass, setShowPass] = useState(false);

  const [form, setForm] = useState<any>({
    education: {},
    test: {},
  });

  const input =
    "w-full p-3 rounded bg-transparent border border-white text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white";

  // ---------------- REGISTER ----------------
  const handleRegister = async () => {
    try {
      if (!form.full_name || !form.email || !form.phone || !form.password) {
        toast.error("Please fill all required fields");
        return;
      }

      const address = `${form.house}, ${form.street}, ${form.city}, ${form.country}`;

      await api.post("/auth/register", {
        full_name: form.full_name,
        email: form.email,
        phone: `+${form.phone}`,
        password: form.password,
        address,
        education: form.education,
        test: form.test,
      });

      toast.success("Registration successful 🎉");
    } catch {
      toast.error("Registration failed");
    }
  };

  // ---------------- UI ----------------
  return (
    <div className="min-h-screen flex bg-green-600">
      <Toaster position="top-right" />

      {/* LEFT ICON */}
      <div className="hidden md:flex w-1/2 items-center justify-center">
        <motion.div
          initial={{ y: -120, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 80 }}
          className="bg-white/20 p-10 rounded-full"
        >
          <User size={80} className="text-white" />
        </motion.div>
      </div>

      {/* FORM */}
      <div className="flex w-full md:w-1/2 items-center justify-center px-4">
        <div className="bg-white/20 backdrop-blur-lg p-6 rounded-xl w-full max-w-lg">
          <h2 className="text-white text-2xl mb-4 text-center">
            Register
          </h2>

          {/* STEP 1 – BASIC INFO */}
          {step === 1 && (
            <>
              <input
                className={input}
                placeholder="Full Name"
                onChange={e => setForm({ ...form, full_name: e.target.value })}
              />

              <input
                className={`${input} mt-3`}
                placeholder="Email"
                onChange={e => setForm({ ...form, email: e.target.value })}
              />

              <div className="mt-3">
                <PhoneInput
                  country="bd"
                  value={form.phone}
                  onChange={phone => setForm({ ...form, phone })}
                  inputStyle={{ width: "100%" }}
                  containerStyle={{ color: "black" }}
                />
              </div>

              {/* Address */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-4">
                <input className={input} placeholder="House" onChange={e => setForm({ ...form, house: e.target.value })} />
                <input className={input} placeholder="Street" onChange={e => setForm({ ...form, street: e.target.value })} />
                <input className={input} placeholder="City" onChange={e => setForm({ ...form, city: e.target.value })} />
                <input className={input} placeholder="Country" onChange={e => setForm({ ...form, country: e.target.value })} />
              </div>

              <button
                onClick={() => setStep(2)}
                className="w-full mt-5 bg-white text-green-600 p-3 rounded font-semibold hover:bg-green-100 cursor-pointer"
              >
                Next
              </button>
            </>
          )}

          {/* STEP 2 – EDUCATION */}
          {step === 2 && (
            <>
              <button
                onClick={() => setStep(1)}
                className="flex items-center text-white mb-3 gap-1"
              >
                <ArrowLeft size={18} /> Back
              </button>

              <select
                className={`${input} text-black`}
                onChange={e =>
                  setForm({
                    ...form,
                    education: { ...form.education, education_level: e.target.value },
                  })
                }
              >
                <option value="" className="text-black">Education Level</option>
                <option className="text-black">college</option>
                <option className="text-black">bsc</option>
                <option className="text-black">msc</option>
                <option className="text-black">phd</option>
              </select>

              <input className={`${input} mt-3`} placeholder="Institution" onChange={e => setForm({ ...form, education: { ...form.education, institution: e.target.value } })} />
              <input className={`${input} mt-3`} placeholder="Course" onChange={e => setForm({ ...form, education: { ...form.education, course: e.target.value } })} />
              <input className={`${input} mt-3`} placeholder="Subject" onChange={e => setForm({ ...form, education: { ...form.education, subject: e.target.value } })} />

              <label className="text-white text-sm mt-3 block">
                Graduation Date
              </label>
              <input
                type="date"
                className={`${input} mt-1`}
                onChange={e =>
                  setForm({
                    ...form,
                    education: { ...form.education, graduation_date: e.target.value },
                  })
                }
              />

              <input className={`${input} mt-3`} placeholder="GPA" onChange={e => setForm({ ...form, education: { ...form.education, gpa: e.target.value } })} />

              <button
                onClick={() => setStep(3)}
                className="w-full mt-5 bg-white text-green-600 p-3 rounded font-semibold hover:bg-green-100 cursor-pointer"
              >
                Next
              </button>
            </>
          )}

          {/* STEP 3 – TEST + PASSWORD */}
          {step === 3 && (
            <>
              <button
                onClick={() => setStep(2)}
                className="flex items-center text-white mb-3 gap-1"
              >
                <ArrowLeft size={18} /> Back
              </button>

              <select
                className={`${input} text-black`}
                onChange={e =>
                  setForm({ ...form, test: { test_type: e.target.value } })
                }
              >
                <option value="" className="text-black">Test Type</option>
                <option className="text-black">IELTS</option>
                <option className="text-black">TOEFL</option>
                <option className="text-black">SAT</option>
                <option className="text-black">GRE</option>
              </select>

              <input
                className={`${input} mt-3`}
                placeholder="Score"
                onChange={e =>
                  setForm({
                    ...form,
                    test: { ...form.test, test_score: e.target.value },
                  })
                }
              />

              <div className="relative mt-4">
                <input
                  type={showPass ? "text" : "password"}
                  className={input}
                  placeholder="Password"
                  onChange={e => setForm({ ...form, password: e.target.value })}
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-3 top-3 text-white cursor-pointer"
                >
                  {showPass ? <EyeOff /> : <Eye />}
                </button>
              </div>

              <button
                onClick={handleRegister}
                className="w-full mt-5 bg-white text-green-600 p-3 rounded font-semibold hover:bg-green-100 cursor-pointer"
              >
                Register
              </button>
            </>
          )}

          {/* LOGIN LINK */}
          <p className="text-white mt-4 text-sm text-center">
            Already have an account?{" "}
            <a
              href="/login"
              className="hover:underline cursor-pointer font-medium"
            >
              Login
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
