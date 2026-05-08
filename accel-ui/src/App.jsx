import { createBrowserRouter, RouterProvider } from "react-router";
import Home from "./views/common/Home";
import AdminDashboard from "./views/admin/AdminDashboard";
import SalesDashboard from "./views/sales/SalesDashboard";
import AdminLayout from "./layouts/AdminLayout";
import SalesLayout from "./layouts/SalesLayout";
import ProtectedRoute from "./context/ProtectedRoute";
import { useAuth } from "./context/AuthContext";
import SignIn from "./views/auth/SignIn";
import AdminRoute from "./context/AdminRoute";
import Leads from "./views/sales/Leads";
import AddLead from "./views/sales/AddLead";
import ViewLead from "./views/sales/ViewLead";
import EditLead from "./views/sales/EditLead";
import AddNote from "./views/sales/AddNote";
import EditNote from "./views/sales/EditNote";
import AdminLeads from "./views/admin/AdminLeads";

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
        { path: "leads", element: <AdminLeads/> }
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
        {
          path: "leads",
          element: <Leads />,
        },
        {
          path: "leads/add",
          element: <AddLead />,
        },
        {
          path: "leads/view/:id",
          element: <ViewLead />,
        },
        {
          path: "leads/edit/:id",
          element: <EditLead />,
        },
        {
          path: "add-note",
          element: <AddNote />,
        },
        {
          path: "edit-note/:id",
          element: <EditNote />,
        },
      ],
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
