import { X, Mail, Lock, User } from 'lucide-react';
import { useState } from 'react';

function AuthModal({ isOpen, onClose }) {
  const [isRegister, setIsRegister] = useState(false);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="relative w-[400px] h-[520px] overflow-hidden rounded-[30px] bg-white shadow-[0_20px_60px_rgba(0,0,0,.18)]">
        {/* Premium background */}
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `
              radial-gradient(circle,#F3E5D0 2px,transparent 2px)
            `,
            backgroundSize: '45px 45px',
          }}
        />

        <div className="relative z-10 h-full px-6 py-5">
          {/* Close */}
          <button
            onClick={onClose}
            className="absolute right-5 top-5 text-slate-400 hover:text-slate-600"
          >
            <X size={20} />
          </button>

          <div className="h-full flex flex-col justify-center">
            {/* Logo */}
            <div className="flex justify-center mb-2">
              <img src="/logo.svg" className="h-10" />
            </div>

            {isRegister ? (
              /* REGISTER */
              <div className="max-h-[430px] overflow-y-auto pr-1">
                <h2 className="mt-3 text-center text-2xl font-bold text-slate-800">
                  Create Account
                </h2>

                <p className="text-center text-sm text-slate-500">Join Campus Lost & Found today</p>

                <div className="mt-4 space-y-3">
                  <Input icon={<User size={18} />} placeholder="Full name" />

                  <Input icon={<Mail size={18} />} placeholder="Email address" />

                  <Input icon={<Lock size={18} />} placeholder="Password" type="password" />

                  <Input icon={<Lock size={18} />} placeholder="Confirm password" type="password" />
                </div>

                <button className="mt-5 h-11 w-full rounded-xl bg-[#F97316] font-semibold text-white">
                  Register
                </button>

                <p className="mt-4 text-center text-sm text-slate-500">
                  Already have an account?
                  <button
                    onClick={() => setIsRegister(false)}
                    className="ml-1 font-semibold text-[#F97316]"
                  >
                    Login
                  </button>
                </p>
              </div>
            ) : (
              /* LOGIN */
              <div>
                <h2 className="mt-3 text-center text-2xl font-bold text-slate-800">Welcome Back</h2>

                <p className="text-center text-sm text-slate-500">Login to continue</p>

                <div className="mt-4 space-y-3">
                  <Input icon={<Mail size={18} />} placeholder="Email address" />

                  <Input icon={<Lock size={18} />} placeholder="Password" type="password" />
                </div>

                <div className="mt-2 text-right">
                  <button className="text-xs text-[#F97316]">Forgot password?</button>
                </div>

                <button className="mt-4 h-11 w-full rounded-xl bg-[#F97316] font-semibold text-white">
                  Login
                </button>

                <p className="mt-5 text-center text-sm text-slate-500">
                  Don't have an account?
                  <button
                    onClick={() => setIsRegister(true)}
                    className="ml-1 font-semibold text-[#F97316]"
                  >
                    Register
                  </button>
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function Input({ icon, placeholder, type = 'text' }) {
  return (
    <div className="flex h-11 items-center rounded-xl border border-[#E8DED2] bg-white px-3">
      <span className="text-slate-400">{icon}</span>

      <input
        type={type}
        placeholder={placeholder}
        className="ml-2.5 w-full bg-transparent text-sm outline-none"
      />
    </div>
  );
}

export default AuthModal;
