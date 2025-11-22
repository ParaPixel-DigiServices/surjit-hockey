import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Lock, User, Eye, EyeOff, LogIn } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const result = await login(username, password);

    if (result.success) {
      navigate('/admin');
    } else {
      setError(result.error || 'Invalid credentials');
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0b152d] via-[#1b2b4a] to-[#0b152d] flex items-center justify-center px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        {/* Logo/Header */}
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.1 }}
            className="inline-block"
          >
            <div className="w-20 h-20 bg-gradient-to-br from-[#ffd700] to-[#ffa500] rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
              <Lock className="w-10 h-10 text-[#0b152d]" />
            </div>
          </motion.div>
          <h1 className="text-3xl font-bold text-white mb-2">
            Admin <span className="text-[#ffd700]">Login</span>
          </h1>
          <p className="text-white/60">Surjit Hockey Tournament</p>
        </div>

        {/* Login Form */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-[#1b2b4a]/50 backdrop-blur-sm rounded-2xl p-8 shadow-2xl border border-white/10"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Username Field */}
            <div>
              <label htmlFor="username" className="block text-white/80 mb-2 font-medium">
                Username
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <User className="w-5 h-5 text-white/40" />
                </div>
                <input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  className="w-full bg-[#0b152d]/50 border border-white/10 rounded-lg pl-12 pr-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-[#ffd700] focus:ring-2 focus:ring-[#ffd700]/20 transition"
                  placeholder="Enter your username"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-white/80 mb-2 font-medium">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className="w-5 h-5 text-white/40" />
                </div>
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full bg-[#0b152d]/50 border border-white/10 rounded-lg pl-12 pr-12 py-3 text-white placeholder-white/30 focus:outline-none focus:border-[#ffd700] focus:ring-2 focus:ring-[#ffd700]/20 transition"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-white/40 hover:text-white/60 transition"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-red-500/10 border border-red-500/30 rounded-lg p-3 text-red-400 text-sm"
              >
                {error}
              </motion.div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-[#ffd700] to-[#ffa500] text-[#0b152d] font-bold py-3 px-6 rounded-lg hover:shadow-lg hover:shadow-[#ffd700]/20 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-[#0b152d]/30 border-t-[#0b152d] rounded-full animate-spin"></div>
                  <span>Logging in...</span>
                </>
              ) : (
                <>
                  <LogIn className="w-5 h-5" />
                  <span>Login</span>
                </>
              )}
            </button>
          </form>

          {/* Footer Note */}
          <div className="mt-6 text-center text-white/40 text-sm">
            <p>For admin access only</p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
