import React, { useState } from "react";
import { X, Mail, Lock, User } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function AuthModal({ isOpen, onClose }) {
  const navigate = useNavigate(); 

  const { login, register } = useAuth();
  const [isRegister, setIsRegister] = useState(false);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");

  if (!isOpen) return null;

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  function resetForm() {
    setError("");
    setForm({
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (isRegister) {
        if (!form.username || !form.email || !form.password) {
          setError("Please fill in all required fields.");
          setLoading(false);
          return;
        }

        if (form.password !== form.confirmPassword) {
          setError("Passwords do not match.");
          setLoading(false);
          return;
        }

        await register({
          username: form.username,
          email: form.email,
          password: form.password,
        });

        setIsRegister(false);
        resetForm();
      } else {
        if (!form.email || !form.password) {
          setError("Please fill in all fields.");
          setLoading(false);
          return;
        }

       const data = await login(form.email, form.password);

onClose();
resetForm();

if (data.user.role === "admin") {
  navigate("/admin");
} else {
  navigate("/dashboard");
}
      }
    } catch (err) {
      setError(err?.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <div className="relative w-full max-w-[400px] overflow-hidden rounded-[30px] bg-white shadow-[0_20px_60px_rgba(0,0,0,.18)]">
        
        {/* Background Pattern */}
        <div
          className="absolute inset-0 opacity-30 pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(circle,#F3E5D0 2px,transparent 2px)",
            backgroundSize: "45px 45px",
          }}
        />

        <div className="relative z-10 px-6 py-6">
          {/* Close Button */}
          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            className="absolute right-5 top-5 text-slate-400 transition hover:text-slate-600 focus:outline-none"
          >
            <X size={20} />
          </button>

          {/* Logo Header */}
          <div className="flex justify-center mb-2">
            <img src="/logo.png" alt="Logo" className="h-10 object-contain" />
          </div>

          {/* LOGIN VIEW */}
          {!isRegister ? (
            <form onSubmit={handleSubmit} className="flex flex-col">
              <h2 className="mt-2 text-center text-2xl font-bold text-slate-800">
                Welcome Back
              </h2>
              <p className="text-center text-sm text-slate-500">
                Login to continue
              </p>

              <div className="mt-4 space-y-3">
                <Input
                  icon={<Mail size={18} />}
                  placeholder="Email address"
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                />

                <Input
                  icon={<Lock size={18} />}
                  placeholder="Password"
                  type="password"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                />
              </div>

              <div className="mt-2 text-right">
                <button
                  type="button"
                  className="text-xs text-[#F97316] hover:underline focus:outline-none"
                >
                  Forgot password?
                </button>
              </div>

              {error && (
                <p className="mt-3 text-center text-sm text-red-500 font-medium">
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="mt-4 h-11 w-full rounded-xl bg-[#F97316] font-semibold text-white transition hover:bg-orange-600 disabled:opacity-50"
              >
                {loading ? "Logging in..." : "Login"}
              </button>

              <p className="mt-5 text-center text-sm text-slate-500">
                Don't have an account?
                <button
                  type="button"
                  onClick={() => {
                    resetForm();
                    setIsRegister(true);
                  }}
                  className="ml-1 font-semibold text-[#F97316] hover:underline"
                >
                  Register
                </button>
              </p>
            </form>
          ) : (
            /* REGISTER VIEW */
            <form onSubmit={handleSubmit} className="max-h-[80vh] overflow-y-auto pr-1">
              <h2 className="mt-2 text-center text-2xl font-bold text-slate-800">
                Create Account
              </h2>
              <p className="text-center text-sm text-slate-500">
                Join Campus Lost & Found today
              </p>

              <div className="mt-4 space-y-3">
                <Input
                  icon={<User size={18} />}
                  placeholder="Full name"
                  name="username"
                  value={form.username}
                  onChange={handleChange}
                />

                <Input
                  icon={<Mail size={18} />}
                  placeholder="Email address"
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                />

                <Input
                  icon={<Lock size={18} />}
                  placeholder="Password"
                  type="password"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                />

                <Input
                  icon={<Lock size={18} />}
                  placeholder="Confirm password"
                  type="password"
                  name="confirmPassword"
                  value={form.password ? form.confirmPassword : ""}
                  onChange={handleChange}
                />
              </div>

              {error && (
                <p className="mt-3 text-center text-sm text-red-500 font-medium">
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="mt-5 h-11 w-full rounded-xl bg-[#F97316] font-semibold text-white transition hover:bg-orange-600 disabled:opacity-50"
              >
                {loading ? "Registering..." : "Register"}
              </button>

              <p className="mt-4 text-center text-sm text-slate-500">
                Already have an account?
                <button
                  type="button"
                  onClick={() => {
                    resetForm();
                    setIsRegister(false);
                  }}
                  className="ml-1 font-semibold text-[#F97316] hover:underline"
                >
                  Login
                </button>
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

// Reusable Input Sub-Component
function Input({
  icon,
  placeholder,
  name,
  value,
  onChange,
  type = "text",
}) {
  return (
    <div className="flex h-11 items-center rounded-xl border border-[#E8DED2] bg-white px-3 transition-colors focus-within:border-[#F97316]">
      <span className="text-slate-400">{icon}</span>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="ml-2.5 w-full bg-transparent text-sm text-slate-800 outline-none placeholder:text-slate-400"
      />
    </div>
  );
}

export default AuthModal;