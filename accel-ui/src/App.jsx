import { createBrowserRouter, RouterProvider } from "react-router";
import Home from "./views/common/Home";
import AdminDashboard from "./views/admin/AdminDashboard";
import SalesDashboard from "./views/sales/SalesDashboard";
import AdminLayout from "./layouts/AdminLayout";
import SalesLayout from "./layouts/SalesLayout";
import ProtectedRoute from "./context/ProtectedRoute";
import { AuthProvider } from "./context/AuthContext";
import SignIn from "./views/auth/SignIn";
import AdminRoute from "./context/AdminRoute";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "login",
      element: <SignIn />,
    },
    {
      path: "forbidden",
      element: <p>Forbidden</p>,
    },
    {
      path: "admin",
      element: (
        <AdminRoute>
          <AdminLayout />
        </AdminRoute>
      ),
      children: [
        { index: true, element: <AdminDashboard /> },
        { path: "dashboard", element: <AdminDashboard /> },
      ],
    },
    {
      path: "sales",
      element: (
        <ProtectedRoute>
          <SalesLayout />
        </ProtectedRoute>
      ),
      children: [
        { index: true, element: <SalesDashboard /> },
        { path: "dashboard", element: <SalesDashboard /> },
      ],
    },
  ]);

  return (
    <>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </>
  );
}

export default App;
