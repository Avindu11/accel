import { Outlet } from "react-router"

function AdminLayout() {
  return (
    <>
      <div>AdminLayout</div>
      <hr />
      <Outlet />
    </>
  )
}

export default AdminLayout