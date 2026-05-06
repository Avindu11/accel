import { createBrowserRouter, RouterProvider } from "react-router"
import SignIn from "./views/auth/SignIn"
import SalesLayout from "./layouts/SalesLayout"
import AdminLayout from "./layouts/AdminLayout"
import SalesDashboard from "./views/salesperson/SalesDashboard"
import AdminDashboard from "./views/admin/AdminDashboard"

function App() {

  const router = createBrowserRouter([
    {
      path: 'login',
      element: <SignIn />
    },
    {
      path: 'sales',
      element: <SalesLayout />,
      children: [
        { index: true, element: <SalesDashboard /> },
        { path: 'dashboard', element: <SalesDashboard /> }
      ]
    },
    {
      path: 'admin',
      element: <AdminLayout />,
      children: [
        { index: true, element: <AdminDashboard /> },
        { path: 'dashboard', element: <AdminDashboard /> }
      ]
    }
  ])

  return (
    <>
      <RouterProvider router={router} />
    </>
  )

}

export default App