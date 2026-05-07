import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router";

function SignIn() {
  const navigate = useNavigate();

  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const { login } = useAuth();

  async function handleLogin(e) {
    e.preventDefault();
    
    const response = await login(credentials.email, credentials.password);

    if (response === "admin") navigate("/admin");
    if (response === "sales") navigate("/sales");
    if (response === "forbidden") navigate("/forbidden");

  }

  return (
    <>
      <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-6 rounded-2xl bg-white p-6 shadow-xl sm:p-10">
          <div className="text-center">
            <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
              Accel
            </h2>
            <p className="mt-2 text-sm text-gray-500">
              Sign in to your account
            </p>
          </div>

          <form className="space-y-5" onSubmit={(e) => handleLogin(e)}>
            <div>
              <label
                htmlFor="sign-in-email"
                className="block text-sm font-medium text-gray-700"
              >
                Email address
              </label>
              <div className="mt-1">
                <input
                  id="sign-in-email"
                  type="email"
                  name="email"
                  autoComplete="email"
                  required
                  placeholder="you@example.com"
                  onChange={(e) =>
                    setCredentials((c) => ({ ...c, email: e.target.value }))
                  }
                  className="block w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-400 shadow-sm transition-colors focus:border-orange-600 focus:outline-none focus:ring-1 focus:ring-orange-600 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="sign-in-password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <div className="mt-1">
                <input
                  id="sign-in-password"
                  type="password"
                  name="password"
                  autoComplete="current-password"
                  required
                  placeholder="••••••••"
                  onChange={(e) =>
                    setCredentials((c) => ({ ...c, password: e.target.value }))
                  }
                  className="block w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-400 shadow-sm transition-colors focus:border-orange-600 focus:outline-none focus:ring-1 focus:ring-orange-600 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-lg bg-orange-600 px-4 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-600 focus:ring-offset-2"
              >
                Sign In
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default SignIn;
