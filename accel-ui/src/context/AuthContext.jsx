import { createContext, useContext, useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { axiosInstance } from "../api/axiosInstance";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {

  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem("accel-auth");
    if (stored) {
      const parsed = JSON.parse(stored);
      return parsed;
    } else {
      return null;
    }
  });

  const [accessToken, setAccessToken] = useState(() => {
    const stored = localStorage.getItem("accel-auth");
    if (stored) {
      const parsed = JSON.parse(stored);
      return parsed?.accessToken;
    } else {
      return null;
    }
  });

  async function login(email, password) {
    try {

      const axios = axiosInstance();

      const res = await axios.post("/v1/auth/sign-in", {
        email,
        password,
      });

      if (res.status == 200) {

        setUser(res.data.user)
        setAccessToken(res.data.accessToken)

        const authObject = {
          user: res.data.user.users,
          admin: res.data.user.admin,
          salesPerson: res.data.user.sales_person,
          accessToken: res.data.accessToken,
          refreshToken: res.data.refreshToken
        }

        const stringify = JSON.stringify(authObject);
        localStorage.setItem("accel-auth", stringify);
        toast("Signed in successfully");

        if(res.data.user.admin.status == 1) {
          return 'admin'
        } else if (res.data.user.sales_person.status == 1) {
          return 'sales'
        } else {
          return 'forbidden'
        }

      }

    } catch (error) {

      console.log(error);

      if (error.status == 400) {
        toast("Invalid credentials");
        return false;
      }

      if (error.status == 404) {
        toast("No user found");
        return false;
      }

    }
  }

  async function logout() {
    localStorage.removeItem("accel-auth");
    setUser(null);
    setAccessToken(null);
  }

  useEffect(() => {



  }, [])

  return (
    <AuthContext.Provider value={{ user, accessToken, login, logout }}>
      <ToastContainer />
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("AuthContext not found");
  return ctx;
};
