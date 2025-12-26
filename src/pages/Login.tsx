import { useState } from "react";
import { User, Eye, EyeOff } from "lucide-react";
import { api } from "../api/api";
import { motion } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const [show, setShow] = useState(false);
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  // login -----------------------------
  const handleLogin = async () => {
    if (!identifier || !password) {
      toast.error("Please fill in all fields");
      return;
    }

    try {
      const res = await api.post("/auth/login", {
        identifier,
        password,
      });

      localStorage.setItem("token", res.data.token);

      toast.success("Login successful 🎉");

      // redirect after short delay
      setTimeout(() => {
        navigate("/dashboard");
      }, 800);
    } catch (err) {
      toast.error("Invalid credentials or server error");
      console.error(err);
    }
  };

  // UI --------------------------------
  return (
    <div className="min-h-screen flex bg-green-600">
      {/* Toast container */}
      <Toaster position="top-right" />

      {/* Left side (icon with animation) */}
      <div className="hidden md:flex w-1/2 items-center justify-center">
        <motion.div
          initial={{ y: -120, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 80, damping: 12 }}
          className="bg-white/20 p-10 rounded-full"
        >
          <User size={80} className="text-white" />
        </motion.div>
      </div>

      {/* Right side (form) */}
      <div className="flex w-full md:w-1/2 items-center justify-center px-4">
        <div className="bg-white/20 backdrop-blur-lg p-8 rounded-xl w-full max-w-md">
          <h2 className="text-white text-2xl pb-6 text-center md:text-left">
            Login
          </h2>

          {/* Identifier */}
          <input
            className="w-full p-3 mb-4 rounded bg-transparent border border-white text-white placeholder-white/80 focus:outline-none focus:ring-2 focus:ring-white"
            placeholder="Email or Phone"
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
          />

          {/* Password */}
          <div className="relative">
            <input
              type={show ? "text" : "password"}
              className="w-full p-3 rounded bg-transparent border border-white text-white placeholder-white/80 focus:outline-none focus:ring-2 focus:ring-white"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button
              type="button"
              onClick={() => setShow(!show)}
              className="absolute right-3 top-3 text-white cursor-pointer"
            >
              {show ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          {/* Login button */}
          <button
            onClick={handleLogin}
            className="w-full mt-6 bg-white text-green-600 p-3 rounded font-semibold cursor-pointer transition hover:bg-green-100"
          >
            Login
          </button>

          {/* Register link */}
          <p className="text-white mt-4 text-sm text-center">
  Don’t have an account?{" "}
  <Link
    to="/register"
    className="hover:underline font-medium cursor-pointer"
  >
    Register
  </Link>
</p>

        </div>
      </div>
    </div>
  );
}
