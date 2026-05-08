import { Eye, Pen, Plus, Search, Trash } from "lucide-react";
import { Link } from "react-router";
import { leadSources, leadStatuses } from "../../constants/constants";
import { useEffect, useState } from "react";
import { axiosInstance } from "../../api/axiosInstance";
import { useAuth } from "../../context/AuthContext";
import { toast } from "react-toastify";

function AdminLeads() {
  const [params, setParams] = useState({
    search: "",
    searchBy: "name",
    source: "",
    status: "",
    salesPerson: "",
  });

  const { accessToken } = useAuth();

  const [fetchedLeads, setFetchedLeads] = useState([]);
  const [fetchedSalesPersons, setFetchedSalesPersons] = useState([]);

  async function fetchLeads() {
    try {
      const api = axiosInstance(accessToken);
      const res = await api.get(
        `/v1/leads?search=${params.search}&searchBy=${params.searchBy}&source=${params.source}&status=${params.status}&salesPerson=${params.salesPerson}`,
      );

      if (res.status === 200) {
        setFetchedLeads(() => res.data);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function fetchSalesPersons() {
    try {
      
      const api = axiosInstance(accessToken);
      const res = await api.get("/v1/sales-person");

      if (res.status === 200) {
        setFetchedSalesPersons(() => res.data);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function deleteLead(id) {
    try {
      const confirm = window.confirm(`Are you sure to delete lead: ${id} ?`);

      if (confirm) {
        const api = await axiosInstance(accessToken);
        const res = await api.delete(`/v1/leads/${id}`);

        if (res.status === 204) {
          toast("Lead Deleted successfully");
          fetchLeads();
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchSalesPersons();
  }, []);

  useEffect(() => {
    fetchLeads();
  }, [
    params.search,
    params.searchBy,
    params.source,
    params.status,
    params.salesPerson,
  ]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-2xl font-bold text-gray-900">Manage Leads</h1>
        <Link
          to="add"
          className="flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-white bg-orange-500 hover:bg-orange-600 rounded-md transition-colors shadow-sm"
        >
          <Plus size={16} />
          Add Lead
        </Link>
      </div>

      <div className="bg-white p-4 rounded-lg border border-gray-200 flex flex-col xl:flex-row gap-4 justify-between">
        <div className="flex w-full xl:w-auto rounded-md">
          <select
            onChange={(e) =>
              setParams((p) => ({ ...p, searchBy: e.target.value }))
            }
            className="px-3 py-2 text-sm border border-gray-300 rounded-l-md bg-gray-50 text-gray-700 focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500 border-r-0 cursor-pointer"
          >
            <option value="name">Name</option>
            <option value="company">Company</option>
            <option value="email">Email</option>
          </select>
          <input
            type="text"
            onChange={(e) =>
              setParams((p) => ({ ...p, search: e.target.value }))
            }
            placeholder="Search leads..."
            className="w-full sm:w-64 px-3 py-2 text-sm border border-gray-300 focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500"
          />
          <button className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-r-md transition-colors flex items-center justify-center">
            <Search size={16} />
          </button>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 w-full xl:w-auto">
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <label
              htmlFor="source-filter"
              className="text-sm font-medium text-gray-700 whitespace-nowrap"
            >
              Source:
            </label>
            <select
              id="source-filter"
              onChange={(e) =>
                setParams((p) => ({ ...p, source: e.target.value }))
              }
              className="w-full sm:w-auto px-3 py-2 text-sm border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500"
            >
              <option value="">All Sources</option>

              {leadSources.map((source) => (
                <option key={source.value} value={source.value}>
                  {source.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <label
              htmlFor="status-filter"
              className="text-sm font-medium text-gray-700 whitespace-nowrap"
            >
              Status:
            </label>
            <select
              id="status-filter"
              onChange={(e) =>
                setParams((p) => ({ ...p, status: e.target.value }))
              }
              className="w-full sm:w-auto px-3 py-2 text-sm border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500"
            >
              <option value="">All Statuses</option>

              {leadStatuses.map((status) => (
                <option key={status.value} value={status.value}>
                  {status.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <label
              htmlFor="sales-person-filter"
              className="text-sm font-medium text-gray-700 whitespace-nowrap"
            >
              Sales Person:
            </label>
            <select
              id="sales-person-filter"
              onChange={(e) =>
                setParams((p) => ({ ...p, salesPerson: e.target.value }))
              }
              className="w-full sm:w-auto px-3 py-2 text-sm border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500"
            >
              <option value="">All</option>

              {fetchedSalesPersons.map((salesPerson, key) => (
                <option key={key} value={salesPerson.sales_person.id}>
                  {salesPerson.users.firstName} {salesPerson.users.lastName}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 ">
        <div className="overflow-scroll">
          <table className="text-left text-sm text-gray-600 table-auto w-full">
            <thead className="bg-gray-50 text-gray-700 text-xs uppercase font-semibold border-b border-gray-200">
              <tr>
                <th className="px-4 py-3">Lead Id</th>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Company Name</th>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">Phone Number</th>
                <th className="px-4 py-3">Est. Deal Value</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {fetchedLeads.map((lead) => (
                <tr
                  key={lead.id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-4 py-4 font-medium text-gray-900">
                    {lead.id}
                  </td>
                  <td className="px-4 py-4">{lead.name}</td>
                  <td className="px-4 py-4">{lead.companyName}</td>
                  <td className="px-4 py-4">{lead.email}</td>
                  <td className="px-4 py-4">{lead.phoneNumber}</td>
                  <td className="px-4 py-4 font-medium">
                    {Number(lead.estDealValue).toLocaleString()} LKR
                  </td>
                  <td className="px-4 py-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {lead.status.toUpperCase()}
                    </span>
                  </td>
                  <td className="px-4 py-4 flex gap-2 justify-end">
                    <Link
                      to={`edit/${lead.id}`}
                      className="p-1.5 text-gray-500 hover:text-orange-600 hover:bg-orange-50 rounded-md transition-colors"
                      title="Edit"
                    >
                      <Pen size={18} />
                    </Link>
                    <button
                      onClick={() => deleteLead(lead.id)}
                      className="p-1.5 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"
                      title="Delete"
                    >
                      <Trash size={18} />
                    </button>
                    <Link
                      to={`view/${lead.id}`}
                      className="p-1.5 text-gray-500 hover:text-orange-600 hover:bg-orange-50 rounded-md transition-colors"
                      title="Edit"
                    >
                      <Eye size={18} />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default AdminLeads;
