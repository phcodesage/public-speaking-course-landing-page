"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Crown } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await signIn("credentials", {
      redirect: false,
      username,
      password,
    });

    setLoading(false);

    if (res?.error) {
      setError(res.error);
    } else {
      router.push("/admin");
    }
  };

  return (
    <div className="min-h-screen bg-[#fcf8f8] flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-6 mx-auto" style={{ backgroundColor: '#0e1f3e' }}>
          <Crown className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-center text-3xl font-extrabold text-[#0e1f3e]" style={{ fontFamily: 'Montserrat, sans-serif' }}>
          Admin Login
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Sign in to manage the Exceed Learning Center dashboard.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-2xl sm:px-10 border border-gray-100">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-bold text-gray-700">Username</label>
              <div className="mt-1">
                <input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="appearance-none block w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#ca3433] focus:border-[#ca3433] sm:text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700">Password</label>
              <div className="mt-1">
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="appearance-none block w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#ca3433] focus:border-[#ca3433] sm:text-sm"
                />
              </div>
            </div>

            {error && (
              <div className="text-[#ca3433] text-sm text-center font-medium bg-red-50 p-3 rounded-lg border border-red-100">
                {error}
              </div>
            )}

            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-3.5 px-4 border border-transparent rounded-full shadow-sm text-sm font-bold text-white bg-[#0e1f3e] hover:bg-[#1a3363] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0e1f3e] disabled:opacity-70 transition-colors"
                style={{ fontFamily: 'Montserrat, sans-serif' }}
              >
                {loading ? "Signing in..." : "Sign in"}
              </button>
            </div>
            
            <div className="text-center mt-4">
              <a href="/" className="text-sm text-gray-500 hover:text-gray-900 underline">Return to main site</a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
